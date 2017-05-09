exports.withError = (req, res, next) => {
  res.error = (orgErr, status) => {
    Promise
      .resolve(orgErr).then((err) => {
        res.status(status || 500).json({
          type: 'error',
          error: process.env.NODE_ENV === 'production' ? undefined : err,
        });
      });
    throw orgErr;
  };
  return next();
};
