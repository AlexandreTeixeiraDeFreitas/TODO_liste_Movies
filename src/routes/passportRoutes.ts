import express from 'express';
import passport from '../config/passportConfig';

const router = express.Router();

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Success! Access to protected route.');
});

export default router;
