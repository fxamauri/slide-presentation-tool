module.exports = (secretToken) => (req, res, next) => {
  const tokenIsNotPresent = (token) => !token;
  const isNotAuthorized = (tokenProvided) => tokenProvided !== secretToken;

  const tokenProvided = req.headers.token;
  if (tokenIsNotPresent(tokenProvided)) {
    return res.sendStatus(403);
  } 
  if (isNotAuthorized(tokenProvided)) {
    return res.sendStatus(401);
  }
next();
}