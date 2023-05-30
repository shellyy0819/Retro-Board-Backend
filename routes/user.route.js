const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js');
const userValidator = require('../validators/user.validator.js');

router.post('/sign-up', userValidator.userSignUp, userController.signUp);
router.post('/forget-password', userValidator.userForgetPassword, userController.forgetPassword);
router.get('/sign-in', userValidator.userSignIn, userController.signIn);
router.put('/change-password/:id', userValidator.userChangePasswordId, userValidator.userChangePassword, userController.changePassword);

module.exports = router;
