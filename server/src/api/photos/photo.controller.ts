import {Request, Response} from 'express';

const {Photo, validate} = require('../photos/photo.model');

export default class PhotoController {
    private errorMessage: string = '';

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const photos = await Photo.find();

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
            const photo = await Photo.findById(req.params.id, {password: 0});
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

    public create = async (req: Request, res: Response): Promise<any> => {
        try {
                //TODO : add logic

            res.status(201).send({
                success: true,
                message: 'Photo was created',
                data: null
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Something went wrong...' + err,
                data: null
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
            const photo = await Photo.findByIdAndRemove(req.params.id);

            if (!photo) {
                return res.status(400).send({
                    success: false,
                    message: 'Photo not found',
                    data: null
                });
            }

            //TODO : add logic

            res.status(204).send({
                success: false,
                message: 'Photo deleted',
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
}
