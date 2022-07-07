const User = require("../DB/models/User");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/keys");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    const passwordsMatch = user
      ? bcrypt.compareSync(password, user.password)
      : false;
    if (passwordsMatch) {
      console.log(passwordsMatch);
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (jwtpayload, done) => {
    if (Date.now() > jwtpayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtpayload._id);

      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
