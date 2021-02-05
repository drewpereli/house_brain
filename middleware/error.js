module.exports = (err, req, res, next) => {
  if (!err) return next();

  if (err.message && err.status) {
    return res.status(err.status).send(err.message);
  }

  return res.status(500).send('There was an error');
};
