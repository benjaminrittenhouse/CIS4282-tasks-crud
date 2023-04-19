// FILE WRITING
// "multer" used as middle man to write files

const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // gets type of file user chose, writes to "/uploads" in post request
    const fileName = file.originalname
    cb(null, `${fileName}`);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

module.exports = router;