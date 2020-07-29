const express = require('express');
const otherRoutes = express.Router();
const otherController = require('../controllers/other.controller');
const requireLogin = require('../middlewares/requireLogin')

otherRoutes.get('/user/:id', requireLogin, otherController.getUser)
otherRoutes.put('/follow', requireLogin, otherController.follow)
otherRoutes.put('/unfollow', requireLogin, otherController.unfollow)
module.exports = otherRoutes