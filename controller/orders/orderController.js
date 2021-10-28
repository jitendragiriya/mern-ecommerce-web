const Order = require('../../models/orderModel');

const Product = require('../../models/Admin/productModel');

const ErrorHandler = require('../../utils/errorhander');

const catchAsyncErrors = require('../../middleware/catchAsyncErrors');


// 1. create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })
    res.status(200).json({
        sucess: true,
        order
    })
})

// 2. get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// 3. get logged in user  Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    const orders = order
    res.status(200).json({
        success: true,
        orders,
    });
});

//=========================Admin======================//

// 1. get all Orders 
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();   
    res.status(200).json({
        success: true,
        orders,
    });
});

// 2. update Order Status
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// 3. delete Order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});


// 4. get single user orders
exports.oneUserOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({ user: req.params.id});

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    const orders = order
    res.status(200).json({
        success: true,
        orders,
    });
});
