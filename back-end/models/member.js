const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    role : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    community : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },    
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Member', memberSchema);