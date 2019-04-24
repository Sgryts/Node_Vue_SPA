import {Request, Response} from 'express';
import logger from "../../helpers/logger";

const {Genre, validate} = require('../genres/genre.model');

export default class GenreController {
    private errorMessage: string = '';

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const genres = await Genre.find();

            res.status(200).send({
                success: true,
                message: '',
                data: genres
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
            logger.error(err.message, err);
        }
    };

    public findOne = async (req: Request, res: Response): Promise<any> => {
        try {
            const genre = await Genre.findById(req.params.id);

            if (!genre) {
                return res.status(400).send({
                    success: false,
                    message: 'The genre with the given ID was not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                message: '',
                data: genre
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
            logger.error(err.message, err);
        }
    };

    public create = async (req: Request, res: Response): Promise<any> => {
        try {
            const {error} = validate(req.body);
            if (error) {
                switch (error.details[0].context.key) {
                    case 'name':
                        this.errorMessage = 'Invalid name';
                        break
                    case 'photos':
                        this.errorMessage = 'Invalid photos';
                        break
                    default:
                        this.errorMessage = 'Invalid credentials';
                }

                return res.status(400).send({
                    success: false,
                    message: this.errorMessage,
                    data: null
                });
            }

            const {name} = req.body;

            const checkGenre = await Genre.findOne({name: name});

            if (checkGenre) {
                return res.status(400).send({
                    success: false,
                    message: 'Genre already exists',
                    data: null
                });
            }

            const genre = new Genre({
                name: name,
            });

            const newGenre = await genre.save();

            res.status(201).send({
                success: true,
                message: 'Genre added',
                data: newGenre
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...' + err,
                data: null
            });
            logger.error(err.message, err);
        }

    };

    public update = async (req: Request, res: Response): Promise<any> => {
        try {
            const {error} = validate(req.body);
            if (error) {
                switch (error.details[0].context.key) {
                    case 'name':
                        this.errorMessage = 'Invalid name';
                        break
                    default:
                        this.errorMessage = 'Invalid credentials';
                }

                return res.status(400).send({
                    success: false,
                    message: this.errorMessage,
                    data: null
                });
            }

            const {name} = req.body;

            const genreUpdated = await Genre.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        name: name
                    }
                },
                {new: true}
            );

            res.status(200).send({
                success: true,
                message: 'Genre updated',
                data: genreUpdated
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
            logger.error(err.message, err);
        }
    };

    public remove = async (req: Request, res: Response): Promise<any> => {
        try {
            // TODO: remove if photo(s) has assigned genre ?
            const genre = await Genre.findByIdAndRemove(req.params.id);

            if (!genre) {
                return res.status(400).send({
                    success: false,
                    message: 'The genre with the given ID was not found',
                    data: null
                });
            }

            console.log('2', genre);

            res.status(204).send({
                success: true,
                message: 'Genre deleted',
                data: null
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
            logger.error(err.message, err);
        }
    };
}
