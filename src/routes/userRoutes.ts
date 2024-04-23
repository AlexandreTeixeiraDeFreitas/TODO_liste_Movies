import { Router } from "express";
import User from "../models/user";
import Models from '../models/indexModels';
import passport from '../config/passportConfig';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  if (req.body) {
    // Génération du JWT
    const token = jwt.sign({ usernameField: req.body.email, passwordField: req.body.password }, process.env.KEY || 'dhdzaKBFBQSJKFB/LQRNEKIL', {
      expiresIn: '1h'  // Expiration du token dans 1 heure
    });
    res.send({ success: true, token: token });
  } else {
    res.status(401).send({ success: false, message: "Authentication failed" });
  }
});

// Créer un nouvel utilisateur
router.post("/", passport.authenticate('jwt-user', { session: false }), async (req, res) => {
  try {
    const { email } = req.body;
    // Vérifier si l'email est déjà utilisé
    const existingUser = await Models.User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "An account with this email already exists." });
    }

    let user = new Models.User(req.body);
    user = await user.save();
    res.status(201).send(user);  // Envoyer une réponse avec le statut 201 Created
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});


// Obtenir tous les utilisateurs
router.get("/", passport.authenticate('jwt-user', { session: false }), async (req, res) => {
  try {
    const users = await Models.User.find().exec();
    res.send(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

// Obtenir un utilisateur par son ID
router.get("/:id", passport.authenticate('jwt-user', { session: false }), async (req, res) => {
  try {
    const user = await Models.User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("The user with the given ID was not found.");
    }
    res.send(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

// Mettre à jour un utilisateur
router.put("/:id", passport.authenticate('jwt-user', { session: false }), async (req, res) => {
  try {
    const user = await Models.User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    res.send(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

// Supprimer un utilisateur
router.delete("/:id", passport.authenticate('jwt-user', { session: false }), async (req, res) => {
  try {
    const user = await Models.User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
    res.send(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

export default router;
