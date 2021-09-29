const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');

  if (!accessToken) return res.json({ error: 'User not logged in!' });

  try {
    const validToken = verify(accessToken, '3VDFC4bgaG');
    req.user = validToken;
    if (validToken) {
      res.locals.userLoggedIn = req.user;
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const authUser = (permissions) => {
  return (req, res, next) => {
    const userRole = req;
    if (permissions.includes(userRole)) {
      next();
    } else {
      console.log(userRole);
      return res.status(401).json('You do not have permission');
    }
  };
};

module.exports = { validateToken, authUser };
