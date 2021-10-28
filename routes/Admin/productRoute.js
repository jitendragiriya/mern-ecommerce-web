const express = require('express')
const { isAuthenticatedUser, authorizeRoles} = require('../../middleware/userAuth')
const { createProduct, getAllProduct, updateProudct, deleteProduct, getProductDetails, createProductReviews, getProductReviews, deleteProductReviews, getAllAdminProduct } = require('../../controller/Admin/prouctController');
const router = express.Router();

router.get('/product', getAllProduct);
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAllAdminProduct );
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.put('/admin/product/update/:id', isAuthenticatedUser, authorizeRoles('admin'), updateProudct);
router.delete('/admin/product/update/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.get('/products/:id', getProductDetails);


router.put('/product/review', isAuthenticatedUser, createProductReviews);
router.get('/product/reviews', getProductReviews);
router.delete('/product/reviews', isAuthenticatedUser, deleteProductReviews);

module.exports = router