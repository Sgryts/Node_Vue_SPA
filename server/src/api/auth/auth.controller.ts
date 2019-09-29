import * as bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import logger from '../../middleware/logger';
// import User from '../users/user.model';
const {User, validateUser, validateLogin} = require('../users/user.model');

export default class UserController {

    private errorMessage: string = '';

    public authenticate = async (req: Request, res: Response): Promise<any> => {
        try {
            const {error} = validateLogin(req.body);
            if (error) {
                this.errorMessage = 'Invalid input'
                return res.status(400).send({
                    success: false,
                    message: this.errorMessage,
                    data: {
                        email: null,
                        token: null,
                        isAuthenticated: false
                    }
                });
            }

            const {email, password} = req.body;
            const user = await User.findOne({email: email});
            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: this.errorMessage,
                    data: {
                        email: null,
                        token: null,
                        isAuthenticated: false
                    }
                });
            }

            const matchPasswords = await bcrypt.compare(password, user.password);
            if (!matchPasswords) {
                return res.status(400).send({
                    success: false,
                    message: this.errorMessage,
                    data: {
                        email: null,
                        token: null,
                        isAuthenticated: false
                    }
                });
            }

            const token = await jwt.sign({email}, config.JWT_ENCRYPTION, {
                expiresIn: config.JWT_EXPIRATION
            });

            res.status(200).send({
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
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
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
            const {error} = validateUser(req.body);
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
                        break
                    case 'password':
                        this.errorMessage = 'Password has to be letters and numbers and least 8 characters long';
                        break
                    default:
                        this.errorMessage = 'Invalid input';
                }

                return res.status(400).send({
                    success: false,
                    message: this.errorMessage,
                    data: null
                });
            }

            // const {name, lastName, email, password} = req.body;
            const {email, password} = req.body;

            const checkEmail = await User.findOne({email: email});

            if (checkEmail) {
                return res.status(400).send({
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

            res.status(201).send({
                success: true,
                message: 'Successfully registered',
                // data: null
                data: newUser // TODO: null in prod
            });
        } catch (err) {
            logger.error(err.message, err);
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
        }
    };
}
