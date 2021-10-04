const express = require('express');
const router = express.Router();
const { Pitches, Favourites } = require('../models');
const { validateToken } = require('../middlewares/Auth');
const { Op } = require('sequelize');

// Get Pitches
router.get('/', async (req, res) => {
  let country = req.query.country;
  let industry;
  // decodeURI of industry
  if (req.query.industry) {
    industry = decodeURI(req.query.industry);
  }
  // Sort Queries
  if (country && industry) {
    const pitchList = await Pitches.findAll({
      include: [Favourites], // Include Favourites model for Pitches
      where: {
        country: country,
        // Search for queried industry in industry or industry2 field
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
    // Else If there is no sort then return all Pitches
  } else if (!country && !industry) {
    const pitchList = await Pitches.findAll({
      include: [Favourites],
    });
    res.json({ pitchList: pitchList });
  }
});

// Get pitch by id
router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const pitch = await Pitches.findByPk(id);
  res.json(pitch);
});

// Get all pitches where user id is = to id in params
router.get('/byuserId/:id', async (req, res) => {
  const id = req.params.id;
  const pitchList = await Pitches.findAll({
    where: { UserId: id },
    include: [Favourites],
  });
  res.json(pitchList);
});

// Create pitch
router.post('/', validateToken, async (req, res) => {
  const pitch = req.body;
  pitch.displayName = req.user.displayName;
  pitch.UserId = req.user.id;
  await Pitches.create(pitch);
  res.json(pitch);
});

// Delete pitch
router.delete('/:pitchId', validateToken, async (req, res) => {
  const pitchId = req.params.pitchId;
  await Pitches.destroy({
    where: {
      id: pitchId,
    },
  });
  res.json('DELETED SUCCESSFULLY');
});

// Get users pitches
router.get('/userspitches', validateToken, async (req, res, next) => {
  const usersPitches = await Pitches.findAll({
    where: { UserId: req.res.locals.userLoggedIn.id },
  });
  res.json(usersPitches);
});

module.exports = router;
