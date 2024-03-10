const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js');
const userValidator = require('../validators/user.validator.js');

router.post('/register', userValidator.userSignUp, userController.signUp);
router.post('/password/reset', userValidator.userForgetPassword, userController.forgetPassword);
router.get('/login', userValidator.userSignIn, userController.signIn);
router.put('/change-password/:id', userValidator.userChangePasswordId, userValidator.userChangePassword, userController.changePassword);

module.exports = router;
