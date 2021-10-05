const express = require('express');
const router = express.Router();
const { Favourites, Pitches } = require('../models');
const { validateToken } = require('../middlewares/Auth');

router.post('/', validateToken, async (req, res) => {
  const { PitchId } = req.body;
  const UserId = req.user.id;

  const pitchExists = await Pitches.findOne({
    where: { id: PitchId },
  });

  if (pitchExists) {
    const found = await Favourites.findOne({
      where: { PitchId: PitchId, UserId: UserId },
    });

    //    Check if user has liked Pitch. If found no like then add favourite to favourites table, if not destroy the favourite from favourites table
    if (!found) {
      await Favourites.create({ PitchId: PitchId, UserId: UserId });
      res.json({ favourited: true });
    } else {
      await Favourites.destroy({
        where: {
          PitchId: PitchId,
          UserId: UserId,
        },
      });
      res.json({ favourited: false });
    }
  } else {
    res.json({ error: 'Pitch does not exist' });
  }
});

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
