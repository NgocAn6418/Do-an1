const express = require('express');
const authRoutes = express.Router();
const userController = require('../controllers/user.controller');
const requireLogin = require('../middlewares/requireLogin')
authRoutes.post('/signup', userController.signup)
authRoutes.post('/signin', userController.signin)
authRoutes.put('/updatepic', requireLogin, userController.updatePic)
module.exports = authRoutes