import * as multer from 'multer';
import * as path from 'path';

const { validate } = require('../api/photos/photo.model');

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname || req.body.name || 'img'}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    const err = 'Please upload images only (jpeg, jpg, png)';
    cb(err);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000, files: 1 },
  fileFilter: (req, file, cb) => {
    let err = '';
    const { error } = validate(req.body);
    if (!error) {
      switch (error.details[0].context.key) {
        case 'name':
          err = 'Invalid name';
          break;
        case 'genres':
          err = 'Invalid genre/genres';
          break;
        default:
          err = 'Invalid input';
      }
      cb(err);
    } else {
      checkFileType(file, cb);
    }
  }
}).any();

export default upload;
