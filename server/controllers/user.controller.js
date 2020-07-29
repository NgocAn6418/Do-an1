const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
module.exports = {
    signup: function (req, res) {
        const { name, email, password, pic } = req.body
        if (!email || !password || !name) {
            return res.status(422).json({ error: "please add all the fields" })
        }
        User.findOne({ email: email })
            .then((saveUser) => {
                if (saveUser) {
                    return res.status(422).json({ error: "User already exists with that email" })
                }
                bcrypt.hash(password, 12)
                    .then(hashedpassword => {
                        const user = new User({
                            email,
                            password: hashedpassword,
                            name,
                            pic: pic
                        })
                        console.log(user)
                        user.save()
                            .then(user => {
                                res.json({ message: "save successfully!" })
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    },
    signin: function (req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(422).json({ error: "please add email or password" })
        }
        User.findOne({ email: email })
            .then(saveUser => {
                if (!saveUser) {
                    res.status(422).json({ error: "invalid email or password" })
                }
                bcrypt.compare(password, saveUser.password)
                    .then(doMatch => {
                        if (doMatch) {
                            const token = jwt.sign({ _id: saveUser._id, }, JWT_SECRET)
                            const { _id, name, email, followers, following,pic } = saveUser
                            res.json({ token, user: { _id, name, email, followers, following,pic } })
                        } else {
                            return res.status(422).json({ error: 'Invalid email or password' })
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    },
    updatePic: function(req,res){
        User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
            (err,result)=>{
             if(err){
                 return res.status(422).json({error:"pic canot post"})
             }
             res.json(result)
        })
    }
}