const mongoose = require('mongoose');
const Member = require('../models/member');
const Communtiy = require('../models/community');

//Error Handler for catching async errors separately.
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const ErrorHandler = require('../utils/errorHandler');


exports.addMember = catchAsyncErrors( async (req, res, next) => {

    const {community, user, role} = req.body;
    const member = await Member.create({
        community,
        user, 
        role
    })


    res.status(200).json({
        success : true,
        member
    })

})

// delete => /:id
exports.deleteMember = catchAsyncErrors(async (req, res, next) => {
    const memberId = req.params.id;
    console.log(memberId);
      const member = await Member.findById(memberId);
  
      if (!member) {
        return next(new ErrorHandler('Member not found', 404));
      }
  
      await member.remove();
  
      res.status(200).json({
        success: true,
        message: 'Member deleted successfully',
      });

  });







