import { Router } from "express";
import passport from '../config/passportConfig';
import { ProductController } from '../controllers/ProductController';

const router = Router();

router.post('/', passport.authenticate('jwt-user', { session: false }), ProductController.createProduct);
router.get('/', passport.authenticate('jwt-user', { session: false }), ProductController.getProductsByUser);
router.put('/:productId', passport.authenticate('jwt-user', { session: false }), ProductController.updateProduct);
router.delete('/:productId', passport.authenticate('jwt-user', { session: false }), ProductController.deleteProduct);

export default router;