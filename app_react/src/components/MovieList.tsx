// src/components/MovieList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Movie } from '../types/movie';
import MovieItem from './MovieItem';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieDescription, setNewMovieDescription] = useState('');
  const { token } = useAuth();
  console.log(process.env.URI);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/movies', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    if (token) {
      fetchMovies();
    }
  }, [token]);

  const handleCreateMovie = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/movies',
        { title: newMovieTitle, description: newMovieDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMovies([...movies, response.data]);
      setNewMovieTitle('');
      setNewMovieDescription('');
    } catch (error) {
      console.error('Failed to create movie:', error);
    }
  };

  const handleDelete = async (movieId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMovies(movies.filter(movie => movie._id !== movieId));
      handleUpdate(); // Met à jour la liste après la suppression
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const handleToggleStatus = async (movie: Movie) => {
    try {
      if (movie.status) {
        const updatedStatus = movie.status === 'To Watch' ? 'Watched' : 'To Watch';
        await axios.patch(
          `http://localhost:3000/api/movies/${movie._id}/status`,
          { status: updatedStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        handleUpdate();
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      
      const response = await axios.get('http://localhost:3000/api/movies', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Movie List</h2> {/* Utilisation de la classe "heading" pour le titre */}
      <div className="movie-form"> {/* Utilisation de la classe "movie-form" pour le formulaire */}
        <input
          type="text"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          placeholder="Enter movie title"
        />
        <input
          type="text"
          value={newMovieDescription}
          onChange={(e) => setNewMovieDescription(e.target.value)}
          placeholder="Enter movie description"
        />
        <button onClick={handleCreateMovie} className="add-button">Add Movie</button> {/* Utilisation de la classe "add-button" pour le bouton d'ajout de film */}
      </div>
      <ul className="movie-list"> {/* Utilisation de la classe "movie-list" pour la liste de films */}
        {movies.map((movie) => (
          <MovieItem
            key={movie._id}
            movie={movie}
            onDelete={() => handleDelete(movie._id)}
            onUpdate={() => handleToggleStatus(movie)}
            onToggleStatus={() => handleToggleStatus(movie)}
          />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
