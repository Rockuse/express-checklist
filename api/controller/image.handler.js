const { resolve } = require('path');

module.exports = {
  getImage: async (req, res) => {
    try {
      const { img } = req.params;
      res.sendFile(resolve('Images/profile/', img));
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
};
