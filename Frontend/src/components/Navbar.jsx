import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaHome, FaMoon, FaSun, FaUser } from 'react-icons/fa'; // Added profile icon

const Navbar = ({ token, handleLogout, toggleDarkMode, darkMode, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // For user menu dropdown
  const dropdownRef = useRef(null); // Reference to the dropdown
  const location = useLocation(); // React Router's useLocation to detect route change

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when navigating to a new route
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="flex justify-between px-8 py-4 bg-gray-800 dark:bg-gray-100 text-white dark:text-black">
      <div>
        <Link to="/" className="mr-4"><FaHome className="inline-block mr-2" /> Home</Link>
        {token && (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <Link to="/conversations" className="mr-4">Conversations</Link>
            <Link to="/reminders" className="mr-4">Reminders</Link>
          </>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="px-4 py-2 rounded-lg bg-gray-600 dark:bg-gray-300 text-white dark:text-black">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {!token ? (
          <>
            <Link to="/signin" className="mr-4"><FaSignInAlt className="inline-block mr-2" /> Sign In</Link>
            <Link to="/signup"><FaUserPlus className="inline-block mr-2" /> Sign Up</Link>
          </>
        ) : (
          <>
            {/* Profile Icon for user */}
            <div ref={dropdownRef} className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2">
                <FaUser className="text-white dark:text-black w-8 h-8" />
              </button>

              {/* Dropdown Menu for user profile */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-lg py-2">
                  <div className="px-4 py-2 text-gray-800 dark:text-white font-semibold">
                    {user?.name || "User"}
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                    View Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Logout button remains here */}
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  token: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    profilePicture: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default Navbar;
