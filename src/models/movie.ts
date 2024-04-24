// models/Movie.ts
import mongoose, { Schema, Document } from "mongoose";

interface IMovie extends Document {
  title: string;
  description: string;
  userId: mongoose.Schema.Types.ObjectId;
  status: 'To Watch' | 'Watched';  // Statuts possibles pour les films
}

const movieSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, enum: ['To Watch', 'Watched'] }
});

const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
