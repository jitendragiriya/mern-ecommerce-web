const Product = require('../../models/Admin/productModel');
const ErrorHandler = require('../../utils/errorhander');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors')
const ApiFeatures = require('../../utils/SearchFeatures')
const cloudinary = require('cloudinary').v2
// 1. create product

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }
    const imagesLinks = [];

    for (let i = 0;i < images.length;i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: 'avatars',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})

// 2. render all products 
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 9;
    const productsCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(), req.query).search().filter();

    let products = await apifeature.query;

    let filteredProductsCount = products.length;
    apifeature.pagination(resultPerPage);

    products = await apifeature.query
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    })


})

// 3. get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Internal server error", 500))
    }
    res.status(200).json({
        success: true,
        product,
    });
})

// 4. update prouduct details

exports.updateProudct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "product not found!"
        })
    }

    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    }
    else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0;i < product.images.length;i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0;i < images.length;i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product,
    })
})

// 5. delete product 

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0;i < product.images.length;i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "product deleted successfully!"
    })

})

// 6. create Product reviews and update
exports.createProductReviews = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numofReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "User review save successfully!"
    });
})

// 7. get all product reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("product not found!", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
})

// 7. delete product reviews
exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("product not found!", 404))
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() != req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    })

    const ratings = avg / reviews.length;

    const numofReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numofReviews
    })
    res.status(200).json({
        success: true
    });
})

//===============================Admin=================================//
// 2. render all admin products 
exports.getAllAdminProduct = catchAsyncErrors(async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
})