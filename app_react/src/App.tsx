// App.tsx
import React from 'react';
import "./styles.css";
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieList from './components/MovieList';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/movies">Movies</Link></li>
              <li><LogoutButton /></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<PrivateRoute component={MovieList} />} />
            <Route path="/" element={<Navigate to="/movies" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

// PrivateRoute component to protect routes that require authentication
const PrivateRoute: React.FC<{ component: React.ComponentType<any> }> = ({ component: Component }) => {
  const { token } = useAuth();  // Using the useAuth hook to get the current authentication token

  return token ? <Component /> : <Navigate to="/login" replace />;
};

// LogoutButton component
const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default App;
