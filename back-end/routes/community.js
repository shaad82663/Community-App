const express = require('express');
const router = express.Router();
 
const {createCommunity, getCommunities, getAllMembers, getOwnedCommunity, getJoinedCommunity} = require('../controllers/communityController');

const {isAuthenticatedUser} = require('../middlewares/auth');

router.route('/').post(isAuthenticatedUser, createCommunity);
router.route('/').get(isAuthenticatedUser, getCommunities);
router.route('/:slug/members').get(getAllMembers);
router.route('/me/owner').get(isAuthenticatedUser, getOwnedCommunity);
router.route('/member/me').get(isAuthenticatedUser, getJoinedCommunity);

 
module.exports = router;