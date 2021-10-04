const express = require('express');
const router = express.Router();
const { Favourites, Pitches } = require('../models');
const { validateToken } = require('../middlewares/Auth');

// Favourite Pitch
router.post('/', validateToken, async (req, res) => {
  const { PitchId } = req.body;
  const UserId = req.user.id;

  const pitchExists = await Pitches.findOne({
    where: { id: PitchId },
  });

  // Check if user has favourited the Pitch
  if (pitchExists) {
    const foundPitch = await Favourites.findOne({
      where: { PitchId: PitchId, UserId: UserId },
    });

    if (!foundPitch) {
      // If the user has no favourited then add favourite to favourites table
      await Favourites.create({ PitchId: PitchId, UserId: UserId });
    } else {
      // If the user has favourited, then delete favourite from favourites table
      await Favourites.destroy({
        where: {
          PitchId: PitchId,
          UserId: UserId,
        },
      });
    }
  } else {
    res.json({ error: 'Pitch does not exist' });
  }
});

// Get all of logged in users favourites
router.get('/userfavourites', validateToken, async (req, res, next) => {
  const usersFavourites = await Favourites.findAll({
    include: [
      {
        model: Pitches,
        required: true,
      },
    ],
    where: { UserId: req.res.locals.userLoggedIn.id },
  });
  res.json(usersFavourites);
});

module.exports = router;
