const express = require('express');
const router = express.Router();
const { Pitches, Favourites } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');
const { Op } = require('sequelize');
// router.get('/', validateToken, async (req, res) => {
//   const pitchList = await Pitches.findAll({ include: [Favourites] });
//   // get all the favourites that includes the user id = to user id logged in
//   const favouritedPitches = await Favourites.findAll({
//     where: { UserId: req.user.id },
//   });
//   res.json({ pitchList: pitchList, favouritedPitches: favouritedPitches });
// });

router.get('/', async (req, res) => {
  let country = req.query.country;
  let industry;
  if (req.query.industry) {
    industry = decodeURI(req.query.industry);
  }

  if (country && industry) {
    const pitchList = await Pitches.findAll({
      include: [Favourites],
      where: {
        country: country,
        [Op.or]: [{ industry: industry }, { industry2: industry }],
      },
    });
    res.json({ pitchList: pitchList });
  } else if (country && !industry) {
    const pitchList = await Pitches.findAll({
      include: [Favourites],
      where: { country: country },
    });
    res.json({ pitchList: pitchList });
  } else if (industry && !country) {
    const pitchList = await Pitches.findAll({
      include: [Favourites],
      where: { [Op.or]: [{ industry: industry }, { industry2: industry }] },
    });
    res.json({ pitchList: pitchList });
  } else if (!country && !industry) {
    const pitchList = await Pitches.findAll({
      include: [Favourites],
    });
    res.json({ pitchList: pitchList });
  }
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const pitch = await Pitches.findByPk(id);
  res.json(pitch);
});

// get all posts where user id is === to id in params
router.get('/byuserId/:id', async (req, res) => {
  const id = req.params.id;
  const pitchList = await Pitches.findAll({
    where: { UserId: id },
    include: [Favourites],
  });
  res.json(pitchList);
});

// send Pitches post request - async and await to wait for data to be inserted before moving on
router.post('/', validateToken, async (req, res) => {
  const pitch = req.body;
  pitch.displayName = req.user.displayName;
  pitch.UserId = req.user.id;
  await Pitches.create(pitch);
  res.json(pitch);
});

// Delete a pitch
router.delete('/:pitchId', validateToken, async (req, res) => {
  const pitchId = req.params.pitchId;
  await Pitches.destroy({
    where: {
      id: pitchId,
    },
  });
  res.json('DELETED SUCCESSFULLY');
});

// Get User Pitches

router.get('/userspitches', validateToken, async (req, res, next) => {
  const usersPitches = await Pitches.findAll({
    where: { UserId: req.res.locals.userLoggedIn.id },
  });
  res.json(usersPitches);
});

module.exports = router;
