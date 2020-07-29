require('../models/postModel')
var mongoose = require('mongoose')
const { model } = require('../models/postModel')
var Post = mongoose.model('Post')
var User = mongoose.model('User')

module.exports = {
    getUser: function (req, res) {
        User.findOne({ _id: req.params.id })
            .select('-password')
            .then(user => {
                Post.find({ postedBy: req.params.id })
                    .populate('postedBy', "_id name")
                    .exec((err, posts) => {
                        if (err) {
                            return res.status(422).json({ error: err })
                        }
                        res.json({ user, posts })
                    })
            }).catch(err => {
                return res.status(404).json({ error: "User not found" })
            })
    },
    follow: function (req, res) {
        User.findByIdAndUpdate(req.body.followId, {
            $push: { followers: req.user.id }
        }, {
            new: true
        }, (err, result) => {
            if (err) {
                return res.catch(422).json({ errer: err })
            }
            User.findByIdAndUpdate(req.user._id, {
                $push: { following: req.body.followId }
            }, { new: true }).select('-password').then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({ error: err })
            })
        })
    },
    unfollow: function (req, res) {
        User.findByIdAndUpdate(req.body.unfollowId, {
            $pull: { followers: req.user.id }
        }, { new: true }
            , (err, result) => {
                if (err) {
                    return res.catch(422).json({ errer: err })
                }
                User.findByIdAndUpdate(req.user._id, {
                    $pull: { following: req.body.followId }
                }, { new: true }).select('-password').then(result => {
                    res.json(result)
                }).catch(err => {
                    return res.status(422).json({ error: err })
                })
            })
    }
}