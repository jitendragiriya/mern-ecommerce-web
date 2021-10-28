const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
    optionSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(fileupload());
app.use(express.static('public'))
app.use(express.static('files'))
//user api 
app.use('/api', require('./routes/User/UserRoute'))     //user route
app.use('/api', require('./routes/orderRoute'))         //order route
app.use('/api', require('./routes/StripePayment'))         //payment route
app.use('/api', require('./routes/Admin/productRoute'))     // product route

app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
})

module.exports = app;