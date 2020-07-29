const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')

const mongoose = require('mongoose')
const { json } = require('body-parser')
const User = mongoose.model("User")
module.exports = function(req,res,next){
    const {authorization} = req.headers

    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace('Bearer','')
    jwt.verify(token,JWT_SECRET,function(err,payload){
        if(err){
         return res.status(401).json({error:"you must be logged in"})
        }
        // const {_id} = payload;
        // User.findById(_id).then(userData=>{
        //     req.user = userData
        // })
        // next()
        userId = payload._id
        User.findOne({_id:userId}).then(function(user){
            req.user = user
            next()
        })             
    })
}