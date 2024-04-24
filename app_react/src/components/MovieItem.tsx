// src/components/MovieItem.tsx
import React from 'react';
import axios from 'axios';
import { Movie } from '../types/movie';

interface MovieItemProps {
  movie: Movie;

  onUpdate: () => void;
  onDelete: () => void;
  onToggleStatus: () => void
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, onUpdate, onDelete, onToggleStatus }) => {

  return (
    <li>
      {movie.title} - {movie.status}
      <button onClick={onToggleStatus}>Toggle Status</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default MovieItem;
