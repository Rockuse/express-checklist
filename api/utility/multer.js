const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = (field, dest) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destination = `Images/${dest}`;
      fs.mkdirSync(destination, { recursive: true });
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  return upload.single(field);
};
