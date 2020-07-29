require('../models/postModel')
var mongoose = require('mongoose')
const { model } = require('../models/postModel')
var Post = mongoose.model('Post')

module.exports = {
    createPost: function (req, res) {
        const { title, body, pic } = req.body
        if (!title || !body || !pic) {
            return res.status(422).json({ error: "Please add all the fields" })
        }
        req.body.password = undefined
        const post = new Post({
            title,
            body,
            photo: pic,
            postedBy: req.user
        })
        post.save().then(result => { res.json({ post: result }) })
            .catch(err => { console.log(err) })
    },
    getAllPost: function (req, res) {
        Post.find().populate('postedBy', '_id name')
            .populate("comments.postedBy", "_id name").then(posts => {
                res.json({ posts })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getSubPost: function (req, res) {
        Post.find({ postedBy: { $in: req.user.following } }).populate('postedBy', '_id name')
            .populate("comments.postedBy", "_id name").then(posts => {
                res.json({ posts })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getMyPost: function (req, res) {
        Post.find({ postedBy: req.user._id })
            .populate('postedBy', '_id name')
            .then(mypost => {
                res.json({ mypost })
            })
            .catch(err => {
                console.log(err)
            })
    },
    like: function (req, res) {
        Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
    },
    unlike: function (req, res) {
        Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
    },
    comment: function (req, res) {
        const comment = {
            text: req.body.text,
            postedBy: req.user
        }
        Post.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, {
            new: true
        }).populate('comments.postedBy', "_id name")
            .populate('postedBy', "_id name")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                } else {
                    res.json(result)
                }
            })
    },
    deletePost: function (req, res) {
        Post.findOne({ _id: req.params.postId })
            .populate('postedBy', '_id')
            .exec((err, post) => {
                if (err || !post) {
                    return res.status(422).json({ error: err })
                }
                if (post.postedBy._id.toString() === req.user._id.toString()) {
                    post.remove()
                        .then(result => {
                            res.json({ message: "successfully deleted" })
                        }).catch(err => {
                            console.log(err)
                        })
                }
            })
    }
}