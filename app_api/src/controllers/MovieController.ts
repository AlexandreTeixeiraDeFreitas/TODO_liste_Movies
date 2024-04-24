// controllers/MovieController.ts
import { Request, Response } from "express";
import Models from '../models/indexModels';
import { IUser } from "../models/user";

export class MovieController {
    static async createMovie(req: Request, res: Response) {
        try {
            const { title, description } = req.body;
            if (!req.user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            console.log(req.user);

            const userId = req.user;
            const status = "To Watch";  // Statut par défaut lors de la création

            const movie = new Models.Movie({ title, description, userId, status });
            await movie.save();

            res.status(201).send(movie);
        } catch (error: any) {
            res.status(500).send({ message: error.message || "An unknown error occurred" });
        }
    }

    static async getMoviesByUser(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            const userId = req.user;
            const movies = await Models.Movie.find({ userId });
            res.send(movies);
        } catch (error: any) {
            res.status(500).send({ message: error.message || "An unknown error occurred" });
        }
    }

    static async getMoviesById(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            console.log(req.user);
            
            const { movieId } = req.params;

            const movie = await Models.Movie.findById(movieId);
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }
            const user: IUser = req.user as IUser;
            
            if (!user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            const userId = req.user;
            const requesterRole = user.role;

            // Vérifier si l'utilisateur est le propriétaire ou un admin
            if (movie.userId.toString() !== userId && requesterRole !== 'admin') {
                return res.status(403).send({ message: "Unauthorized: You can only update your own movies or you must be an admin." });
            }

            res.send(movie);
        } catch (error: any) {
            res.status(500).send({ message: error.message || "An unknown error occurred" });
        }
    }
    
    static async updateMovie(req: Request, res: Response) {
        try {
            const { movieId } = req.params;
            const updates = req.body;
            if (!req.user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            const user: IUser = req.user as IUser;
            // const user = await Models.User.findById(req.user);
            if (!user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            const userId = req.user;
            // const userId = user.id;
            const requesterRole = user.role;

            const movie = await Models.Movie.findById(movieId);
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }

            // Vérifier si l'utilisateur est le propriétaire ou un admin
            if (movie.userId.toString() !== userId && requesterRole !== 'admin') {
                return res.status(403).send({ message: "Unauthorized: You can only update your own movies or you must be an admin." });
            }

            const updatedMovie = await Models.Movie.findByIdAndUpdate(movieId, updates, { new: true });
            res.send(updatedMovie);
        } catch (error: any) {
            res.status(500).send({ message: error.message || "An unknown error occurred" });
        }
    }

    static async deleteMovie(req: Request, res: Response) {
        try {
            const { movieId } = req.params;
            const user: IUser = req.user as IUser;
            // const user = await Models.User.findById(req.user);
            if (!user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            const userId = req.user;
            const requesterRole = user.role;

            const movie = await Models.Movie.findById(movieId);
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }

            // Vérification similaire pour la suppression
            if (movie.userId.toString() !== userId && requesterRole !== 'admin') {
                return res.status(403).send({ message: "Unauthorized: You can only delete your own movies or you must be an admin." });
            }

            await Models.Movie.findByIdAndDelete(movieId);
            res.send({ message: "Movie deleted successfully" });
        } catch (error: any) {
            res.status(500).send({ message: error.message || "An unknown error occurred" });
        }
    }
    
    static async updateMovieStatus(req: Request, res: Response) {
        try {
            const { movieId } = req.params;
            const { status } = req.body;
            const user: IUser = req.user as IUser;
            // const user = await Models.User.findById(req.user);
            if (!user) {
                return res.status(404).send({ success: false, message: "The user with the given ID was not found." });
            }
            const userId = req.user;
            const requesterRole = user.role;

            const movie = await Models.Movie.findById(movieId);
            if (!movie) {
                return res.status(404).send({ message: "Movie not found" });
            }

            // Vérification pour la mise à jour du statut
            if (movie.userId.toString() !== userId && requesterRole !== 'admin') {
                return res.status(403).send({ message: "Unauthorized: You can only update status of your own movies or you must be an admin." });
            }

            const updatedMovie = await Models.Movie.findByIdAndUpdate(movieId, { status }, { new: true });
            res.send(updatedMovie);
        } catch (error: any) {
            res.status(500).send({ message: error.message || "An unknown error occurred" });
        }
    }
}
