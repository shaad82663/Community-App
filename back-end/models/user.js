const validator = require("validator");
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
 
function validateMaxlength(value, maxlength) {
    if (value && value.length > maxlength) {
        return next(new ErrorHandler('No membership found for given user', 404));
     }
  }


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return validateMaxlength(v, 4);
          }
        }
      },
   email : {
    type : String,
    required : [true, "Please enter your email"],
    unique : true,
    validate : [validator.isEmail, "Please enter valid email address."]
  },
   password : {
    type : String,
    required : [true, "Please enter password"],
    minLength : [6, "Password must be longer than 6 characters."],
    select : false  // Whenever user is displayed do not display password.
   },
  createdAt : {
      type : Date,
      default : Date.now
  }
})

//Encrypting password before saving user.
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {//if password is not modifeid then we do not need to encrypt it again.
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})

//Return JWT token
userSchema.methods.getJwtToken = function() {  //paylod = _id + secret key.
    return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    }) 
}

//Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);