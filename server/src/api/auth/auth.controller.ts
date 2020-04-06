import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import logger from '../../middleware/logger';
import { get } from 'lodash';

const { User, LoginAttempts, validateUser, validateLogin } = require('../users/user.model');

export default class UserController {

  private errorMessage: string = '';
  private clientIp: string = '';

  private delayResponse = (response: any) => {
    setTimeout(() => response(), +config.RESPONSE_DELAY_MS);
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

      if (!await this.canAuthenticate(this.clientIp)) {
        return res.status(429).send({
          success: false,
          message: 'Your are temporary locked',
          data: {
            email: null,
            token: null,
            isAuthenticated: false
          }
        });
      }

      const { error } = validateLogin(req.body);
      if (error) {
        this.failedLoginAttempt(this.clientIp);
        this.errorMessage = 'Invalid input';
        return res.status(422).send({
          success: false,
          message: this.errorMessage,
          data: {
            email: null,
            token: null,
            isAuthenticated: false
          }
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        this.failedLoginAttempt(this.clientIp);
        return res.status(422).send({
          success: false,
          message: 'Invalid username or password',
          data: {
            email: null,
            token: null,
            isAuthenticated: false
          }
        });
      }

      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        this.failedLoginAttempt(this.clientIp);
        return res.status(422).send({
          success: false,
          message: 'Invalid username or password',
          data: {
            email: null,
            token: null,
            isAuthenticated: false
          }
        });
      }

      const token = await jwt.sign({ email }, config.JWT_ENCRYPTION, {
        expiresIn: config.JWT_EXPIRATION
      });

      await this.successfulLoginAttempt(this.clientIp);

      return res.status(200).send({
        success: true,
        message: 'Successfully logged in',
        data: {
          email,
          token,
          isAuthenticated: true
        }
      });

    } catch (err) {
      logger.error(err.message, err);

      return res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again',
        data: {
          email: null,
          token: null,
          isAuthenticated: false
        }
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

      const checkEmail = await User.findOne({ email: email });

      if (checkEmail) {
        return res.status(422).send({
          success: false,
          message: 'Email is already taken',
          data: null
        });
      }

      const hash = await bcrypt.hash(password, config.SALT_ROUNDS);

      const user = new User({
        // name,
        // lastName,
        email,
        password: hash
      });

      const newUser = await user.save();

      return res.status(201).send({
        success: true,
        message: 'Successfully registered',
        // data: null
        data: newUser // TODO: null in prod
      })

    } catch (err) {
      logger.error(err.message, err);

      return res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again',
        data: null
      });
    }
  };
}
