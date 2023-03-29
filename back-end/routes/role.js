const express = require('express');
const router = express.Router();

const {createRole, getAllRoles, test} =  require('../controllers/roleController');

const {isAuthenticatedUser} = require('../middlewares/auth');
console.log(isAuthenticatedUser);
router.route('/').post(createRole);
router.route('/').get(getAllRoles);
router.route('/test').get(isAuthenticatedUser, test);


module.exports = router; 