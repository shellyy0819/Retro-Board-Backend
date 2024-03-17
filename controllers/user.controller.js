const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { fetchToken } = require('../helpers/auth.helper');

const changePassword = async (req, res) => {
  const { new_password, confirmed_password } = req?.body || {};
  const { id } = req.params || {};

  try {
    const user = await User.findOne({
      where: { id }
    });

    if (user) {
      if (new_password === confirmed_password) {
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(new_password, salt);
        await user.save();
        return res.json({ success: true, message: 'Password changed successfully!' });
      }
      return req.json({ success: false, message: "Password doesn't match!" });
    }
    return res.json({ success: false, message: "Can't find user!" });
  } catch {
    return res.json({ success: false, message: 'Error while changing password, please try again!', status: 500 });
  }
};

const forgetPassword = async (req, res) => {
  const { email_id, new_password, confirmed_password } = req?.body || {};

  try {
    const existingUser = await User.findOne({
      where: { email_id }
    });

    if (existingUser) {
      if (new_password === confirmed_password) {
        const salt = await bcrypt.genSalt(10); // generate salt

        const password = await bcrypt.hash(new_password, salt);
        await existingUser.update({ password });

        return res.json({ status: 200, success: true, message: 'Password reset successfully!' });
      }
      return res.json({ status: 400, success: false, message: "Password doesn't match!" });
    }
    return res.json({ status: 404, success: false, message: "Can't find user!" });
  } catch (err) {
    return res.json({ status: 500, success: false, err });
  }
};

const signIn = async (req, res) => {
  const { password, email_id } = req?.body || {};

  try {
    const user = await User.findOne({
      where: { email_id }
    });

    if (user) {
      const payload = {
        user: {
          id: user.id,
          email_id: user?.email_id,
          name: user?.name
        }
      };

      bcrypt.compare(password, user.password, async (error, result) => {
        const token = await fetchToken(payload);

        if (!result) {
          res.status(401).json({ success: false, message: 'Authentication failed' });
        } else {
          // If passwords match, sign in successful
          res.status(200).json({
            message: 'Signed in successfully!',
            success: true,
            token
          });
        }
      });

      return;
    }
    return res.status(404).json({ success: false, message: 'User not found!', status: 404 });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error in signing in');
  }
};

const signUp = async (req, res) => {
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

    const token = await fetchToken(payload);
    if (!token) {
      res.status(500).send('Something went wrong');
      return;
    }

    res.status(200).json({
      message: 'Registered successfully!',
      success: true,
      token
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Error in Saving User');
  }
};

module.exports = { signUp, forgetPassword, signIn, changePassword };
