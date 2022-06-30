const mongoose = require('mongoose');
const uuid = require('uuid');
const crypto = require('crypto');

//user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: false
    },
    hashedPassword: {
        type: String,
        required: true,
        select: false 
    },
    salt:{
        type: String,
        required: true,
        select: false 
    },
    isAdmin:{
        type: Boolean,
        default: false,
       
    },
    deleted:{
        type: Boolean,
        default: false
    },
    status:{
        type: String,
        default: "pending"
    }
},{timestamps:true});

userSchema.virtual('password').get(function(){  
    return this._password;
}).set(function(value){
    this._password = value;
    this.salt = uuid.v1();
    this.hashedPassword = this.encryptPassword(value);
});

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    encryptPassword: function(password){
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (error) {
            return "";
        }
    }
};

module.exports = mongoose.model('User', userSchema);