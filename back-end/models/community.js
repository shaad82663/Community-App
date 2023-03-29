const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');


mongoose.plugin(slug);


const communitySchema = new mongoose.Schema({
    name : {
        type : String,
    },
    slug: {
         type: String, 
         slug: "name"
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Community', communitySchema);