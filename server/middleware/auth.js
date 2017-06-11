const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('config')['redis'];
const redisClient = require('redis').createClient(config.store.port, config.store.host);

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: config.store.host,
    port: config.store.port
  }),
  secret: config.secret,
  resave: config.resave,
  saveUninitialized: config.saveUninitialized
});
