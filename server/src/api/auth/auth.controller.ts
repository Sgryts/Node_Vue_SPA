import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';
import { logger } from '../../middleware/logger';
import { get } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const { User, LoginAttempts, validateUser, validateLogin } = require('../users/user.model');
const { RefreshToken } = require('../users/refreshToken.model');

export default class UserController {

  private errorMessage: string = '';
  private clientIp: string = '';

  private delayResponse = (response: any): any => {
    setTimeout(() => response, +config.RESPONSE_DELAY_MS);
  };

  private canAuthenticate = async (key: string): Promise<boolean> => {
    const login = await LoginAttempts.findOne({ identityKey: key });
    if (!login || login.failedAttempts < 5) {
      return Promise.resolve<boolean>(true);
    }
    const timeout = (new Date().getTime() - (new Date(login.timeout).getTime() + (1 * 60 * 1000)));
    if (timeout >= 0) {
      await login.remove();
      return Promise.resolve<boolean>(true);
    }
    return Promise.resolve<boolean>(false);
  };

  private failedLoginAttempt = async (key: string): Promise<void> => {
    const update = { $inc: { failedAttempts: 1 }, timeout: new Date(), inProgress: false };
    const options = { setDefaultsOnInsert: true, upsert: true };
    await LoginAttempts.findOneAndUpdate({ identityKey: key }, update, options).exec();
  };

  private successfulLoginAttempt = async (key: string): Promise<void> => {
    const login = await LoginAttempts.findOne({ identityKey: key });
    if (login) {
      return await login.remove();
    }
  };

  private isInProgress = async (key: string): Promise<boolean> => {
    const login = await LoginAttempts.findOne({ identityKey: key });
    const options = { setDefaultsOnInsert: true, upsert: true };
    await LoginAttempts.findOneAndUpdate({ identityKey: key }, { inProgress: true }, options).exec();
    return (login && login.inProgress);
  };

  public authenticate = async (req: Request, res: Response): Promise<any> => {
    try {
      this.clientIp = get(req, 'ipInfo.ip', '');
      // const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // TODO: parallel brute force attack protection
      // if (await this.isInProgress(clientIp)) {
      //   return res.status(400).send({
      //     success: false,
      //     message: 'Please wait, your login request is in progress',
      //     data: {
      //       email: null,
      //       token: null,
      //       isAuthenticated: false
      //     }
      //   });
      // }

      // if (!await this.canAuthenticate(this.clientIp)) {
      //   const response = res.status(429).send({
      //     success: false,
      //     message: 'Your are temporary locked',
      //     data: {
      //       email: null,
      //       token: null,
      //       isAuthenticated: false
      //     }
      //   });
      //   return this.delayResponse(response)
      // }

      const { error } = validateLogin(req.body);
      if (error) {
        // this.failedLoginAttempt(this.clientIp);
        this.errorMessage = 'Invalid email or password';
        return res.status(422).send({
          success: false,
          message: this.errorMessage,
          data: null
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        // this.failedLoginAttempt(this.clientIp);
        return res.status(422).send({
          success: false,
          message: 'Invalid email or password',
          data: null
        });
      }

      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        // this.failedLoginAttempt(this.clientIp);
        return res.status(422).send({
          success: false,
          message: 'Invalid email or password',
          data: null
        });
      }

      const token = await jwt.sign({ email }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION
      });
      const refreshToken = await RefreshToken.findOne({ user_id: user._id })
      console.log('TT', refreshToken);
      if (!refreshToken?.token) {
        console.log('HERE');
        const newRefreshToken = uuidv4();
        const refreshToken = new RefreshToken({
          user_id: user._id,
          token: newRefreshToken,
          expiration: Math.floor(Date.now() + 1 * 24 * 3600 * 1000),
        });

        await refreshToken.save();

        return res.status(200).send({
          success: true,
          message: 'Successfully logged in',
          data: {
            email,
            token,
            refreshToken: newRefreshToken,
            isAuthenticated: true
          }
        });


      } else if (!!refreshToken?.token && refreshToken?.expiration <= Date.now()) {
        const newRefreshToken = uuidv4();
        await refreshToken.update(
          {
            $set: {
              token: newRefreshToken,
              expiration: Math.floor(Date.now() + 1 * 24 * 3600 * 1000)
            }
          },
          { new: true }
        )

        return res.status(200).send({
          success: true,
          message: 'Successfully logged in',
          data: {
            email,
            token,
            refreshToken: newRefreshToken,
            isAuthenticated: true
          }
        });

      } else if (!!refreshToken?.token && refreshToken?.expiration > Date.now()) {
        return res.status(200).send({
          success: true,
          message: 'Successfully logged in',
          data: {
            email: user.email,
            token: token,
            refreshToken: refreshToken.token,
            isAuthenticated: true
          }
        });
      } else {
        throw new Error('Something went wrong, please try again');
      }

      // await this.successfulLoginAttempt(this.clientIp);

    } catch (err) {
      logger.error(err.message, err);

      return res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again',
        data: null
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    try {
      const { error } = validateUser(req.body);
      if (error) {
        switch (error.details[0].context.key) {
          // case 'name':
          //     this.errorMessage = 'Invalid name';
          //     break
          // case 'lastName':
          //     this.errorMessage = 'Invalid last name';
          //     break
          case 'email':
            this.errorMessage = 'Invalid email';
            break;
          case 'password':
            this.errorMessage = 'Password has to be letters and numbers and least 8 characters long';
            break;
          default:
            this.errorMessage = 'Invalid input';
        }

        return res.status(422).send({
          success: false,
          message: this.errorMessage,
          data: null
        });
      }

      // const {name, lastName, email, password} = req.body;
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (user) {
        return res.status(422).send({
          success: false,
          message: 'Email is already taken',
          data: null
        });
      }

      const hash = bcrypt.hash(password, config.SALT_ROUNDS);

      const newUser = new User({
        // name,
        // lastName,
        email,
        password: hash
      });

      await newUser.save();
      return this.delayResponse(res.status(201).send({
        success: true,
        message: 'Successfully registered',
        data: null
      }));

    } catch (err) {
      logger.error(err.message, err);

      return res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again',
        data: null
      });
    }
  };

  public refreshToken = async (req: Request, res: Response): Promise<any> => {
    try {
      const refreshToken = await RefreshToken.findOne({ token: req.body.refreshToken });

      if (!refreshToken) {
        return res.status(401).send({
          success: false,
          message: 'Access denied.',
          data: null
        });
      }

      const user = await User.findById(refreshToken?.user_id);

      if (!user) {
        return res.status(401).send({
          success: false,
          message: 'Access denied.',
          data: null
        });
      }

      const token = await jwt.sign({ email: user.email }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION
      });
      const newRefreshToken = uuidv4();

      await refreshToken.update(
        {
          $set: {
            token: newRefreshToken,
            expiration: Math.floor(Date.now() + 1 * 24 * 3600 * 1000)
          }
        },
        { new: true }
      )

      return res.status(200).send({
        success: true,
        message: 'Token has been refreshed.',
        data: {
          email: req.body.email,
          token,
          refreshToken: newRefreshToken,
          isAuthenticated: true
        }
      });
    } catch (err) {
      return res.status(401).send({
        success: false,
        message: 'Access denied.',
        data: null
      });
    }
  }
}
