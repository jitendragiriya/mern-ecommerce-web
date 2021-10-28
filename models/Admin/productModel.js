const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
    },
    description: {
        type: String,
        required: [true, 'Please Enter product description'],
    },
    price: {
        type: String,
        required: [true, 'Please enter product price'],
        maxLength: [8, 'price cannot exceed 8 characters']
    },
    sellPrice:{
        type:String,
        required:[true,"Please enter selling price" ],
        maxLength:[8, 'selling price can not be 8 character long'],
    }
    ,
    category: {
        type: String,
        requierd: [true, 'Please enter product category']
    },
    Stock: {
        type: Number,
        required: [true, "please enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    numofReviews: {
        type: String,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    ratings: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('product', productSchema);