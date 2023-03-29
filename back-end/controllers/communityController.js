const mongoose = require('mongoose');
const Community = require('../models/community');
const Member = require('../models/member');

//Error Handler for catching async errors separately.
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const ErrorHandler = require('../utils/errorHandler');


exports.createCommunity = catchAsyncErrors( async (req, res, next) => {

    const user = req.user._id;
    const {name}  = req.body;
    const community = await Community.create({
        name : name,
        owner : user
    })
    res.status(200).json({
        success : true,
        community
    })

})

exports.getCommunities = catchAsyncErrors( async (req, res, next)  => {
     const id = req.user._id;
     const communities = await Community.find({});
    
    res.status(200).json({
        success : true,
        count : communities.length,
        communities
    }) 

})
//    get => /:slug/members
exports.getAllMembers = catchAsyncErrors( async (req, res, next) => {
    const slug = req.params.slug;
    const community = await Community.findOne({ slug: slug }).populate('owner', 'name _id');
    if (!community) {
      return res.status(404).json({ success: false, message: 'Community not found' });
    }
    res.status(200).json({
        success : true,
        community
    }) 
})

// get => /me/owner
exports.getOwnedCommunity = catchAsyncErrors( async (req, res, next) => {
   const id = req.user._id;
   const communities = await Community.find({owner : id});

   res.status(200).json({
    success : true,
    count : communities.length,
    communities
    }) 
})


  // get => /me/member
  exports.getJoinedCommunity = catchAsyncErrors (async (req, res, next) => {

    const user_id = req.user._id;
    console.log(user_id);
    const memberships = await Member.find({user : user_id}).exec();
    console.log(memberships);
    if(!memberships) {
        return next(new ErrorHandler('No membership found for given user', 404));
    }
    let communities = [];
    for(let i=0; i<memberships.length; i++){
        let community_id = memberships[i].community;
        let community = await Community.findById(community_id).lean(); // Use the lean() method here
        communities.push(community);
    }

    res.status(200).json({
        success : true,
        count : communities.length,
        communities
    })

  })


