const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: 'src/uploads/img',
  filename: (req, files, cb) => {
    cb(null, `${files.fieldname}-${Date.now()}${path.extname(files.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { filesize: 10000000 },
  fileFilter: (req, files, cb) => {
    checkFileType(files, cb)
  }
}).any()

const checkFileType = (files, cb) => {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(path.extname(files.originalname).toLowerCase())
  const mimetype = filetypes.test(files.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    const error = 'Error: Please upload images only'
    cb(error)
  }
}

module.exports = upload
