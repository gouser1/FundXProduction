import { verify } from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  // get accessToken through headers
  const accessToken = req.header('accessToken');

  if (!accessToken) return res.sendStatus(401);

  const verifiedToken = verify(accessToken, '3VDFC4bgaG');
  req.user = verifiedToken;
  if (verifiedToken) {
    res.locals.userLoggedIn = req.user;
    return next();
  }
};

export default { validateToken };
