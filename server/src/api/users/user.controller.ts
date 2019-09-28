import * as bcrypt from 'bcrypt';
import {Request, Response} from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import logger from "../../middleware/logger";
// import User from './user.model';
const {User, validateUser} = require('../users/user.model');
// TODO: for now this controller not needed
export default class UserController {
    private errorMessage: string = '';

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const users = await User.find();

            res.status(200).send({
                success: true,
                message: '',
                data: users
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

    public findOne = async (req: Request, res: Response): Promise<any> => {
        try {
            const user = await User.findById(req.params.id, {password: 0});

            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: 'The user with the given ID was not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                message: '',
                data: user
            });

        } catch (err) {
            logger.error(err.message, err);
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public update = async (req: Request, res: Response): Promise<any> => {

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
            const userUpdated = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        // name,
                        // lastName,
                        email,
                        password
                    }
                },
                {new: true}
            );
            if (!userUpdated) {
                return res.status(400).send({
                    success: false,
                    message: 'The user with the given ID was not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                message: 'User updated',
                data: userUpdated
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

    public remove = async (req: Request, res: Response): Promise<any> => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);

            if (!user) {
                return res.status(400).send({
                    success: false,
                    message: 'The user with the given ID was not found',
                    data: null
                });
            }

            res.status(204).send({
                success: true,
                message: 'User deleted',
                data: null
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
