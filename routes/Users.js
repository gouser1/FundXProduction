const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const { validateToken, authUser } = require('../middlewares/AuthMiddleware');
const { sign } = require('jsonwebtoken');

router.get('/users', validateToken, async (req, res) => {
  const userList = await Users.findAll();
  if (req.res.locals.userLoggedIn.role === 'Admin') {
    res.json(userList);
  } else {
    res.json('You are not authorized to do this. ');
  }
});

// send users post request - async and await to wait for data to be inserted before moving on
router.post('/', async (req, res) => {
  const {
    email,
    displayName,
    firstName,
    lastName,
    password,
    location,
    profession,
    age,
    bio,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      email: email,
      displayName: displayName,
      firstName: firstName,
      lastName: lastName,
      password: hash,
      location: location,
      profession: profession,
      age: age,
      bio: bio,
    });
    res.json('SUCCESS');
  });
});

// update profile section

router.put('/updateprofile', validateToken, function (req, res, next) {
  Users.update(
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      profession: req.body.profession,
      location: req.body.location,
      age: req.body.age,
      bio: req.body.bio,
    },
    {
      where: { displayName: req.res.locals.userLoggedIn.displayName },
    }
  )
    .then(function (rowsUpdated) {
      res.json('Number of rows updated: ' + rowsUpdated);
    })
    .catch(next);
});

// admin update user
router.put('/updateuser', validateToken, function (req, res, next) {
  console.log('HERE... ', req.res.locals.userLoggedIn);
  Users.update(
    {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
      profession: req.body.profession,
      password: req.body.password,
      location: req.body.location,
      age: req.body.age,
      bio: req.body.bio,
    },
    {
      where: { id: req.body.id },
    }
  )
    .then(function (rowsUpdated) {
      res.json('Number of rows updated: ' + rowsUpdated);
    })
    .catch(next);
});

// delete user

router.delete('/delete/:Id', async (req, res) => {
  const Id = req.params.Id;
  await Users.destroy({
    where: {
      id: Id,
    },
  });
  res.json('DELETED SUCCESSFULLY');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // tell sequelize to go to users table to find one user whos username matches the inputed username
  const user = await Users.findOne({ where: { email: email } });

  if (!user) res.json({ error: 'User does not exist' });
  // compare inputed password to password user has stored in database
  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.json({ error: 'Wrong Username and Password Combination' });
    const accessToken = sign(
      { displayName: user.displayName, id: user.id, role: user.role },
      '3VDFC4bgaG'
    );
    return res.json(accessToken);
  });
});

// valid token check

router.get('/auth', validateToken, (req, res) => {
  res.json(req.user);
});

router.get('/userinfo/', validateToken, async (req, res) => {
  const id = req.res.locals.userLoggedIn.id;
  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  res.json(userInfo);
});

// change password

router.put('/changepassword', validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({
    where: { displayName: req.user.displayName },
  });
  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) return res.json({ error: 'Incorrect Password Entered!' });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { displayName: req.user.displayName } }
      );
      res.json('SUCCESS');
    });
  });
});

module.exports = router;
