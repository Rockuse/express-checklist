const sharp = require('sharp');
const pathjs = require('path');

module.exports = async (req, res, next) => {
  try {
    const { path, filename, destination } = req.file;
    const name = filename.split('.');
    await sharp(pathjs.join(path))
      .resize(500, 500, { fit: sharp.fit.contain })
      .toFile(`${destination}/${name[0]}-500.${name[1]}`);
    await sharp(pathjs.join(path))
      .resize(1000, 1000, { fit: sharp.fit.contain })
      .toFile(`${destination}/${name[0]}-1000.${name[1]}`);
    next();
  } catch (error) {
    res.json(error);
  }
};
