const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: 'src/uploads/img',
  filename: (req, file, cb) => {
    console.log('FFF', file)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  }
}).any()

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    const error = 'Please upload images only'
    cb(error)
  }
}

module.exports = upload
