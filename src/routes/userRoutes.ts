import { Router } from "express";
import passport from '../config/passportConfig';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), UserController.login);
router.post("/", passport.authenticate('jwt-user?', { session: false }), UserController.createUser);
router.get("/", passport.authenticate('jwt-admin', { session: false }), UserController.getAllUsers);
router.get("/:id", passport.authenticate('jwt-user', { session: false }), UserController.getUserById);
router.put("/:id", passport.authenticate('jwt-user', { session: false }), UserController.updateUser);
router.delete("/:id", passport.authenticate('jwt-user', { session: false }), UserController.deleteUser);

export default router;
