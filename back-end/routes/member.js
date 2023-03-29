const express = require('express');

const router = express.Router();

const {addMember, deleteMember} = require('../controllers/memberController');
const {isAuthenticatedUser} = require('../middlewares/auth');


router.route('/').post(isAuthenticatedUser, addMember);
router.route('/:id').delete(isAuthenticatedUser, deleteMember);


module.exports = router;