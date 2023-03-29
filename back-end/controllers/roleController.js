const mongoose = require('mongoose');
const Role = require('../models/role');

//Error Handler for catching async errors separately.
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const ErrorHandler = require('../utils/errorHandler');

exports.createRole = catchAsyncErrors( async (req, res, next) => {
     const {name} = req.body;

     const role = await Role.create({name : name});
 
     res.status(200).json({
        success : true,
        data : role
     })
})

exports.test = catchAsyncErrors( async (req, res, next) => {
    //  console.log(req.user._id);
     res.status(200).json({
        success : true
    })
})

exports.getAllRoles = catchAsyncErrors( async (req, res, next) => {
    const roles = await Role.find({});
    if(!roles) {
        return next(new ErrorHandler("No role found",401));
    }

    res.status(200).json({
        success : true,
        roles
    })

})