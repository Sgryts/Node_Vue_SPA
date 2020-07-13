import { Request, Response } from 'express';
import * as fs from 'fs';
import { logger } from '../../middleware/logger';
import upload from '../../utils/photo.upload';
import { MulterFile } from './imulter.file';

const { Photo, validate } = require('../photos/photo.model');

export default class PhotoController {
  private errorMessage: string;

  public findMany = async (req: Request, res: Response): Promise<any> => {
    return req.headers.accept === 'application/vnd.photosforgenre+json' ?
      this.findPhotosByGenre(req, res) : this.findAll(req, res);
  };

  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const photos = await Photo.find()
        .sort({ created_at: 'descending' })
        .populate({ path: 'genres' });

      res.status(200).send({
        success: true,
        message: '',
        data: photos
      });

    } catch (err) {
      logger.error(err.message, err);
      res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again.',
        data: null
      });
    }
  };

  public findPhotosByGenre = async (req: Request, res: Response): Promise<any> => {
    try {
      if (req.headers.accept !== 'application/vnd.photosforgenre+json') {
        res.status(415).send({
          success: false,
          message: 'Unsupported Media Type.',
          data: null
        });
      }
      if (!req.query.genre || req.query.genre.length !== 24) {
        res.status(400).send({
          success: false,
          message: 'Invalid genre, please try again.',
          data: null
        });
      }
      const photos = await Photo.find({ 'genres': { '$in': [req.query.genre] } })
        .sort({ created_at: 'descending' })
        .populate({ path: 'genres' });

      res.status(200).send({
        success: true,
        message: '',
        data: photos
      });

    } catch (err) {
      logger.error(err.message, err);
      res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again.' + err.toString(),
        data: null
      });
    }
  };

  public findPhotosByGenrePaginate = async (req: Request, res: Response): Promise<any> => {
    try {
      if (req.headers.accept !== 'application/vnd.photosforgenrepaginate+json') {
        res.status(415).send({
          success: false,
          message: 'Unsupported Media Type.',
          data: null
        });
      }
      if (!req.query.genre || req.query.genre.length !== 24) {
        res.status(400).send({
          success: false,
          message: 'Invalid genre, please try again.',
          data: null
        });
      }
      const perPage = 10;
      // const page = +req.params.page >= 1 ? +req.params.page : 1;
      const page = +req.query.page >= 1 ? +req.query.page : 1;
      const photos = await Photo.find()
        .sort({ created_at: 'descending' })
        .limit(perPage)
        .skip(perPage * page)
        .populate({ path: 'genres' });
      const count = await Photo.find().count();
      const totalPages = ~~(count / perPage) + (Number.isInteger(count / perPage) ? 0 : 1);
      res.status(200).send({
        success: true,
        message: '',
        data: {
          photos,
          page,
          totalPages
        }
      });

    } catch (err) {
      logger.error(err.message, err);
      res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again.' + err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const photo = await Photo.findById(req.params.id, { password: 0 })
        .populate({ path: 'genres' });
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
      logger.error(err.message, err);
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
            const genres = JSON.parse(req.body.genres);
            Photo.create({
              name: req.body.name,
              file: req.files[0].filename,
              path: req.files[0].path,
              genres: genres
            })
              .then(photo => {
                res.status(201).send({
                  success: true,
                  message: 'Photo added',
                  data: photo
                });
              })
              .catch(err => {
                // TODO if error  - find and remove stored photo?
                logger.error(err.message, err);
                res.status(500).send({
                  success: false,
                  message: 'Something went wrong, please try again.',
                  data: null
                });
              });
          }
        }
      })
    } catch (err) {
      logger.error(err.message, err);
      res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again.',
        data: null
      });
    }
  };


  public update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { error } = validate(req.body);
      if (error) {
        switch (error.details[0].context.key) {
          case 'name':
            this.errorMessage = 'Invalid name';
            break;
          case 'genres':
            this.errorMessage = 'Invalid genre(s)';
            break;
          default:
            this.errorMessage = 'Invalid input';
          // error.details[0].message
        }

        return res.status(400).send({
          success: false,
          message: this.errorMessage,
          data: null
        });
      }

      const { name, genres } = req.body;

      const photoUpdated = await Photo.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: name,
            genres: genres
          }
        },
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: 'Photo updated',
        data: photoUpdated
      });
    } catch (err) {
      logger.error(err.message, err);
      res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again.',
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const photo = await Photo.findById(req.params.id);

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
              photo.remove();
              res.status(204).send({
                success: true,
                message: 'Photo deleted',
                data: null
              });
            } else {
              logger.error(err.message, err);
              res.status(500).send({
                success: false,
                message: 'Something went wrong, please try again.',
                data: null
              });
            }
          })
        } else {
          logger.error(err.message, err);
          res.status(500).send({
            success: false,
            message: 'Something went wrong, please try again.',
            data: null
          });
        }
      })
    } catch (err) {
      logger.error(err.message, err);
      res.status(500).send({
        success: false,
        message: 'Something went wrong, please try again.',
        data: null
      });
    }
  }
}
