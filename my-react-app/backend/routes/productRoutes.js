import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createProduct);
router.get('/display', getAllProducts);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;