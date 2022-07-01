const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}_${file.originalname}`);
  },
});

// Initialize upload variable
const upload = multer({
  storage,
});

module.exports = upload;
