const mongoose = require('mongoose');
const User = require('../models/user');

const jwt = require("jsonwebtoken");

//Error Handler for catching async errors separately.
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//To get token from the back-end for logged in and registering user
const sendToken = require("../utils/jwttoken");

const ErrorHandler = require('../utils/errorHandler');

//Register user   POST => /api/v1/user/register
exports.registerUser = catchAsyncErrors (async (req, res, next) => {
  const {name, email, password} = req.body;

  const user = await User.create(req.body);
   sendToken(user ,200 ,res); 
})

//Login user   => /api/v1/user/login
exports.logInUser = catchAsyncErrors( async (req, res, next) => {
    const {email, password} = req.body;
 
    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }  

    const user = await User.findOne({email}).select('+password');
    
    if(!user) {
       return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    // console.log(isPasswordMatched)

    if(!isPasswordMatched){
        console.log("password not matched");
        return next(new ErrorHandler("Invalid email or password"), 401);
    }
    sendToken(user ,200 ,res); 
})

//Logout user => /api/v1/logout
exports.logout = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })
 
    res.status(200).json({
        success : true,
        message : "Logged out"
    })
})

// GET => /me
exports.getUser = catchAsyncErrors( async (req, res, next) => {
    const { token } = req.cookies; 
    console.log('it ' , req.headers.authorization)
    if(!token) {
        return next(new ErrorHandler("Login first to access resourses.", 401));
    }
 
     //Verifying token using jsonwebtoken (jwt)
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     //Assigning id to the user.
     const user = await User.findById(decoded.id);
     
    res.status(200).json({
        success : true,
        user
    })
})