const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import UserModal from '../models';
const User = require('../models/user');
const { v4 } = require('uuid');

const changePassword = async (req, res, next) => {
  const { email, oldPassword, newPassword, confirmedPassword } = req?.body || {};
  const { id } = req.params || {};

  try {
    const user = await User.findOne({
      _id: id
    });

    if (user) {
      if (newPassword === confirmedPassword) {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        return res.json({ success: true, msg: 'Password changed successfully!' });
      }
    }

    return req.json({ msg: `Password doesn't match!` });
  } catch {
    return req.json({ msg: 'Error while changing password, please try again!' });
  }
};

const forgetPassword = async (req, res, next) => {
  const { email, newPassword, confirmedPassword } = req?.body || {};

  // if (email && newPassword && confirmedPassword && bcrypt.compareSync(newPassword === confirmedPassword)) {
  try {
    let existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      if (newPassword === confirmedPassword) {
        const salt = await bcrypt.genSalt(10); // generate salt

        existingUser.password = await bcrypt.hash(newPassword, salt);
        await existingUser.save();
        return res.json({ success: true, msg: 'Password reset successfully!' });
      }
      return res.json({ success: true, msg: `Password doesn't match!` });
    }

    // return res.json({ success: true, msg: `User doesn't exist!` });
  } catch (err) {
    return res.json({ success: false, err: err });
  }
};

const signIn = async (req, res, next) => {
  const { username, password, email } = req?.body || {};

  try {
    let user = await User.findOne({
      email
    });

    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        // encrypt
        res.json({ msg: 'Signed in successfully!', result: result });
      });

      return;
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error in signing in');
    return;
  }
};

const signUp = async (req, res, next) => {
  const { username, password, email } = req?.body || {};

  if (!email || !password) {
    res.json({ success: false, msg: 'Send needed params' });
    return;
  }

  try {
    let user = await User.findOne({
      email
    });

    if (user) {
      res.status(400).json({
        msg: 'User Exists'
      });
      return;
    }

    user = new User({
      email,
      password
    });

    const salt = await bcrypt.genSalt(10); // generate salt
    user.password = await bcrypt.hash(password, salt);

    await user.save(); // save in db

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
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error in Saving');
    return;
  }

  //   UserModal.User.create({
  //     username: req.body.username
  //     // password: Bcrypt.hashSync(req.body.password)
  //   });
};

module.exports = { signUp, forgetPassword, signIn, changePassword };
