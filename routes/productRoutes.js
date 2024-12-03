const express = require('express');
const multer = require('multer');
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post('/', upload.single('image'), validateProduct, addProduct);
router.get('/', getProducts);
router.put('/:id', upload.single('image'), validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
