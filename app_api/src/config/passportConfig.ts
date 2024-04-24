import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import Models from '../models/indexModels';
import User from '../models/indexModels';

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',  // Identifier l'utilisateur par l'email
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await Models.User.findOne({ email }).exec();
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

// JWT Strategy
passport.use('jwt-user', new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.KEY || 'dhdzaKBFBQSJKFB/LQRNEKIL'
}, async (jwtPayload, done) => {
  try {
    const user = await Models.User.findOne({ email: jwtPayload.email });
    console.log(jwtPayload);
    if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      if (user.role !== 'user' && user.role !== 'admin' ) {
        return done(null, false, { message: 'Not authorized.' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
}));

// JWT Strategy
passport.use('jwt-user?', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.KEY || 'dhdzaKBFBQSJKFB/LQRNEKIL'
  }, async (jwtPayload, done) => {
    try {
      console.log('jwtPayload: '+jwtPayload);
      const user = await Models.User.findOne({ email: jwtPayload.email });
      console.log('user:'+user);
      if (!user) {  
          return done(null, 'false');
        }
        if (user.role !== 'user' && user.role !== 'admin' ) {
          return done(null, 'false');
        }
        return done(null, user);
      } catch (error) {
        return done(null, 'false');
      }
  }));

passport.use('jwt-admin', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.KEY || 'dhdzaKBFBQSJKFB/LQRNEKIL'
  }, async (jwtPayload, done) => {
    try {
      const user = await Models.User.findOne({ email: jwtPayload.email });
      console.log('jwtPayload: '+jwtPayload);
      if (!user) {
          return done(null, false, { message: 'User not found.' });
        }
        if (user.role !== 'admin' ) {
          return done(null, false, { message: 'Not authorized.' });
        } 
        return done(null, user);
      } catch (error) {
        return done(error);
      }
  }));

export default passport;
