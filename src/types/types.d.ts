import 'express';
import { IUser } from '../models/user';  // Assurez-vous que le chemin est correct

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}