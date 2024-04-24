import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
// import global from "./src/types/types";
import mongoose from "mongoose";
import routes from './src/routes/indexRoutes';

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(express.json());

const mongodbUri = process.env.MONGODB_URI;
console.log(mongodbUri);

mongoose
  .connect(
    `${mongodbUri}`,
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: Error) => {
    // Ajoutez le type Error pour le paramètre err
    console.error("Could not connect to MongoDB...", err);
  });

const port = process.env.PORT || 3000; // Assurez-vous d'avoir un fichier .env avec la variable PORT

app.use(
  cors({
    origin: "*", // Permet à toutes les origines d'accéder à votre serveur
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

app.use('/api/users', routes.userRoutes);
app.use('/api/movies', routes.movieRoutes);

app.use((req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
