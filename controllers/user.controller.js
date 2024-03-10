const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { v4 } = require('uuid');

const changePassword = async (req, res, next) => {
  const { newPassword, confirmedPassword } = req?.body || {};
  const { id } = req.params || {};

  try {
    const user = await User.findOne({
      where: { id }
    });

    if (user) {
      if (newPassword === confirmedPassword) {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        return res.json({ success: true, message: 'Password changed successfully!' });
      }
      return req.json({ success: false, message: `Password doesn't match!` });
    }
    return res.json({ success: false, message: `Can't find user!` });
  } catch {
    return res.json({ success: false, message: 'Error while changing password, please try again!', status: 500 });
  }
};

const forgetPassword = async (req, res, next) => {
  const { email_id, newPassword, confirmedPassword } = req?.body || {};

  try {
    let existingUser = await User.findOne({
      where: { email_id }
    });

    if (existingUser) {
      if (newPassword === confirmedPassword) {
        const salt = await bcrypt.genSalt(10); // generate salt

        const password = await bcrypt.hash(newPassword, salt);
        await existingUser.update({ password });

        return res.json({ status: 200, success: true, message: 'Password reset successfully!' });
      }
      return res.json({ status: 400, success: false, message: `Password doesn't match!` });
    }
    return res.json({ status: 404, success: false, message: `Can't find user!` });
  } catch (err) {
    return res.json({ status: 500, success: false, err: err });
  }
};

const signIn = async (req, res, next) => {
  const { password, email_id } = req?.body || {};

  try {
    let user = await User.findOne({
      where: { email_id }
    });

    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        // encrypt
        if (result) {
          // If passwords match, sign in successful
          res.json({ success: true, message: 'Signed in successfully!', token: result });
        } else {
          // If passwords don't match, return authentication failed
          res.status(401).json({ success: false, message: 'Authentication failed' });
        }
      });

      return;
    }
    return res.status(404).json({ success: false, message: `User not found!`, status: 404 });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error in signing in');
    return;
  }
};

const signUp = async (req, res, next) => {
  const { name, password, email_id } = req?.body || {};

  if (!email_id || !password) {
    res.json({ success: false, message: 'Send needed params' });
    return;
  }

  try {
    let user = await User.findOne({
      where: {
        email_id
      }
    });

    if (user) {
      res.status(400).json({
        success: false,
        message: 'User already exists, try logging in',
        status: 400
      });
      return;
    }

    const salt = await bcrypt.genSalt(10); // generate salt
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email_id,
      password: hashedPassword
    });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      v4(),
      {
        expiresIn: 10000
      },
      (err, token) => {
        console.log('err, token', err, token);
        if (err) {
          console.log(err.message);
          res.status(500).send('Error in JWT Signing');
          return;
        }
        res.status(200).json({
          success: true,
          token
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error in Saving User');
    return;
  }
};

module.exports = { signUp, forgetPassword, signIn, changePassword };
