function isLoggedIn(req, res, next) {
  if (req.user && req.user.phoneNumber) {
    next(req, res);
  } else {
    res.json({
      error: true,
      description: "The user is not logged in",
      redirect: true,
      redirectLocation: "/",
    });
  }
}

module.exports = isLoggedIn;
