import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Conversations from './pages/Conversations';
import Reminders from './pages/Reminders';
import Profile from './pages/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://via.placeholder.com/150',
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'light' ? false : true;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to update user profile
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    // Optionally save this updated user to localStorage or send it to the backend.
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Router>
        <Navbar token={token} handleLogout={handleLogout} toggleDarkMode={toggleDarkMode} darkMode={darkMode} user={user} />
        <div className="container mx-auto mt-6 bg-gray-900 dark:bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn setToken={setToken} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile user={user} updateUser={updateUser} />} />
            <Route
              path="/dashboard"
              element={token ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/conversations"
              element={token ? <Conversations /> : <Navigate to="/signin" />}
            />
            <Route
              path="/reminders"
              element={token ? <Reminders /> : <Navigate to="/signin" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;