// routes/movieRoutes.ts
import { Router } from "express";
import { MovieController } from '../controllers/MovieController';
import passport from '../config/passportConfig';

const router = Router();

router.post('/', passport.authenticate('jwt-user', { session: false }), MovieController.createMovie);
router.get('/', passport.authenticate('jwt-user', { session: false }), MovieController.getMoviesByUser);
router.get('/:movieId', passport.authenticate('jwt-user', { session: false }), MovieController.getMoviesById);
router.put('/:movieId', passport.authenticate('jwt-user', { session: false }), MovieController.updateMovie);
router.delete('/:movieId', passport.authenticate('jwt-user', { session: false }), MovieController.deleteMovie);
router.patch('/:movieId/status', passport.authenticate('jwt-user', { session: false }), MovieController.updateMovieStatus);

export default router;
