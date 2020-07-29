var express = require('express');
var postRoutes = express.Router()
var postController = require('../controllers/post.controller')
const requireLogin = require('../middlewares/requireLogin')


postRoutes.post('/createpost', requireLogin, postController.createPost)
postRoutes.get('/allpost', requireLogin, postController.getAllPost)
postRoutes.get('/mypost', requireLogin, postController.getMyPost)
postRoutes.put('/like', requireLogin, postController.like)
postRoutes.put('/unlike', requireLogin, postController.unlike)
postRoutes.put('/comment', requireLogin, postController.comment)
postRoutes.delete('/deletepost/:postId', requireLogin, postController.deletePost)
postRoutes.get('/getsubpost', requireLogin, postController.getSubPost)
module.exports = postRoutes