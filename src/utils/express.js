exports.withError = (req, res, next) => {
  res.error = (err, status) => {
    Promise
      .resolve(err).then((err) => {
        res.status(status || 500).json({
          type: 'error',
          error: process.env.NODE_ENV === 'production' ? undefined : err,
        });
      });
    throw err;
  }
  return next();
}
