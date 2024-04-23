import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import Models from '../models/indexModels';

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
    const user = await Models.User.findOne({ email: jwtPayload.usernameField });
    console.log(user);
    if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      
      // jwtPayload.password devrait être le mot de passe en clair pour comparaison
      const isMatch = await user.comparePassword(jwtPayload.passwordField);
      if (!isMatch) {
        return done(null, false, { message: 'Password is incorrect.' });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
}));

export default passport;
