const express = require('express')

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/userAuth');
const { newOrder, getSingleOrder, getAllOrders, updateOrder, deleteOrder, myOrders, oneUserOrders } = require('../controller/orders/orderController');


router.post('/order/new', isAuthenticatedUser, newOrder)

router.get('/order/:id', isAuthenticatedUser, getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser, myOrders)

//=============================Admin============================//
router.get("/admin/orders", isAuthenticatedUser, authorizeRoles('admin'), getAllOrders)

router.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrder)

router.delete('/admin/order/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

router.get('/admin/u/orders/:id', isAuthenticatedUser, authorizeRoles('admin'), oneUserOrders)


module.exports = router;