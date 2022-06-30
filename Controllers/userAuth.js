const express = require('express');
const router = express.Router();
const {apiResponse,genrateToken} = require("../Helpers")
const User = require('../Models/user');

exports.login = function (req, res) {
    try {
        const { email, password } = req.body;
        Restaurant.findOne({ email }, function (err, restaurant) {
            if (err) {
                return res.status(200).json(apiResponse({}, err.message, false));
            }
        User.findOne({ email,password }).select('+hashedPassword +salt').exec((err, user) => {
            if (err) {
                return res.status(400).json(apiResponse({}, err.message, false))
            }
            if (!user) {
                return res.status(400).json(apiResponse({}, "User Not Found", false))
            }
            if(!user.authenticate(password)){
               return res.status(400).json(apiResponse({}, "Invalid Password", false));
            }

            user.hashedPassword = undefined;
            user.salt = undefined;
            return res.status(200).json(apiResponse({user,restaurant, token: genrateToken(user)}, "Login Successful", true))
         })})

    } catch (error) {
        res.status(500).json(apiResponse({}, error.message, false));
    }
}


//signup controller
exports.signup = function(req,res){
    try {
        const {firstName,lastName,phone,email,password} = req.body;
        User.create({ firstName, lastName, phone, email, password }, function (err, user) {
            if (err){
                return res.status(400).json(apiResponse({},err.message,false));
            }
            user.hashedPassword = undefined;
            user.salt = undefined;

            res.status(200).json(apiResponse(user,"User Created Successfully",true));

        }
        )
    } catch (error) {
        res.status(500).json(apiResponse({},error.message,false));
    }
}
