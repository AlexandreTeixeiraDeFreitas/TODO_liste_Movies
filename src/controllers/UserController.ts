import { Request, Response } from "express";
import Models from '../models/indexModels';
import jwt from 'jsonwebtoken';

export class UserController {
  static async login(req: Request, res: Response) {
    if (req.body) {
        const user = await Models.User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ success: false, message: "Authentication failed: User not found" });
        }

        // Vérification du mot de passe
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).send({ success: false, message: "Authentication failed: Incorrect password" });
        }
        const payload = {
            id: user._id, // Utilisez l'ID de l'utilisateur pour l'identification
            email: user.email, // Vous pouvez ajouter d'autres propriétés utiles
            role: user.role // Ajoutez le rôle si nécessaire
          };
      
        const token = jwt.sign(payload, process.env.KEY || 'dhdzaKBFBQSJKFB/LQRNEKIL', {
            expiresIn: '1h'
        });
        res.send({ success: true, token: token });
    } else {
        res.status(401).send({ success: false, message: "Authentication failed" });
    }
  }

static async createUser(req: Request, res: Response) {
    try {
        const { email, role } = req.body;
        console.log(req.user);
        
        if (req.user !== 'false') {
        const requester = req.user;
        const requesterRole = req.user?.role;

        // Vérifier si l'utilisateur existant veut créer un admin
            if (role === 'admin' && requesterRole !== 'admin') {
                return res.status(403).send({ message: "Unauthorized: Only admins can create admin accounts." });
            }
        }else{
            if (role === 'admin') {
                return res.status(403).send({ message: "Unauthorized: Only admins can create admin accounts." });
            }
        }
        const existingUser = await Models.User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "An account with this email already exists." });
        }

        let user = new Models.User(req.body);
        user = await user.save();
        res.status(201).send(user);
    } catch (error: any) {
        res.status(500).send({ success: false, message: error.message || "An unknown error occurred" });
    }
}

  static async getUser(req: Request, res: Response) {
    try {
      const user = req.user;
      res.send(user);
    } catch (error: any) {
      res.status(500).send({ success: false, message: error.message || "An unknown error occurred" });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    console.log(req.user);
    
    try {
      const users = await Models.User.find();
      res.send(users);
    } catch (error: any) {
      res.status(500).send({ success: false, message: error.message || "An unknown error occurred" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const user = await Models.User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
      }
      res.send(user);
    } catch (error: any) {
      res.status(500).send({ success: false, message: error.message || "An unknown error occurred" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = await Models.User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
      }
      res.send(user);
    } catch (error: any) {
      res.status(500).send({ success: false, message: error.message || "An unknown error occurred" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await Models.User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
      }
      res.send({ success: true, message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).send({ success: false, message: error.message || "An unknown error occurred" });
    }
  }
}
