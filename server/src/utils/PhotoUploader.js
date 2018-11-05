const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: '../uploads/img',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { filesize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).single('myImage')

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    const error = 'Error: Please upload images only'
    cb(error)
  }
}

module.exports = upload
