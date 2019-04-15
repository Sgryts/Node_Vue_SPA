import {Request, Response} from 'express';
import * as fs from 'fs';
import upload from '../../utils/photo.upload';
import {MulterFile} from "./imulter.file";

const {Photo, validate} = require('../photos/photo.model');
const {Genre} = require('../genres/genre.model');

export default class PhotoController {
    private errorMessage: string = '';

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const photos = await Photo.find().populate({path: 'genres'});

            res.status(200).send({
                success: true,
                message: '',
                data: photos
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
        }
    };

    public findOne = async (req: Request, res: Response): Promise<any> => {
        try {
            const photo = await Photo.findById(req.params.id, {password: 0})
                .populate({path: 'genres'});
            if (!photo) {
                return res.status(400).send({
                    success: false,
                    message: 'Photo not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                message: '',
                data: photo
            });

        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public create = async (req: Request & { files: MulterFile[] }, res: Response): Promise<any> => {
        try {
            await upload(req, res, err => {
                if (err) {
                    console.log('err', err);
                    res.status(400).send({
                        success: false,
                        message: err,
                        data: null
                    })
                } else {
                    if (req.files === undefined || req.files.length === 0) {
                        res.status(400).send({
                            success: false,
                            message: 'Image required',
                            data: null
                        })
                    } else {
                        const genres = JSON.parse(req.body.genres)

                        Photo.create({
                            name: req.body.name,
                            file: req.files[0].filename,
                            path: req.files[0].path,
                            genres: genres
                        })
                            .then(photo => {
                                for (let genre of JSON.parse(req.body.genres)) {
                                    Genre.findById(genre)
                                        .then(genre => {
                                            genre.photos.push(photo)
                                            genre.save()
                                        })
                                        .catch(err => {
                                            // TODO if error  - find and remove stored photo?
                                            res.status(500).send({
                                                success: false,
                                                message: 'Something went wrong...',
                                                data: null
                                            });
                                        });
                                }
                                console.log('SAVED PHOTO', photo)
                                res.status(201).send({
                                    success: true,
                                    message: 'Photo added',
                                    data: photo
                                });
                            })
                            .catch(err => {
                                // TODO if error  - find and remove stored photo?
                                res.status(500).send({
                                    success: false,
                                    message: 'Something went wrong...',
                                    data: null
                                });
                            });
                    }
                }
            })
        } catch (err) {
            res.status(500).send({
                error: 'Something went wrong5...' + err
            });
        }
    };


    public update = async (req: Request, res: Response): Promise<any> => {
        try {
            //TODO : add logic
            const {name} = req.body;
            res.status(200).send({
                success: true,
                message: 'Photo updated',
                data: null
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
        }
    };

    public remove = async (req: Request, res: Response): Promise<any> => {
        try {
            const id = await req.params.id;
            const photo = await Photo.findById(id);
            if (!photo) {
                return res.status(400).send({
                    success: false,
                    message: 'The photo with the given ID was not found',
                    data: null
                });
            }
            await fs.access(photo.path, err => {
                if (!err) {
                    fs.unlink(photo.path, err => {
                        if (!err) {
                            const genres = photo.genres;
                            for (let genre of genres) {
                                Genre.findById(genre)
                                    .then(genre => {
                                        genre.photos = genre.photos.filter(ph => ph.toString() !== photo._id.toString());
                                        genre.save();
                                    });
                            }
                            photo.remove();
                            res.status(204).send({
                                success: true,
                                message: 'Photo updated',
                                data: null
                            });
                        } else {
                            res.status(500).send({
                                success: false,
                                message: 'Something went wrong...',
                                data: null
                            });
                        }
                    })
                } else {
                    res.status(500).send({
                        success: false,
                        message: 'Something went wrong...',
                        data: null
                    });
                }
            })
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...',
                data: null
            });
        }
    }
}
