import React from 'react';
import PropTypes from 'prop-types';

function Header({ onAddEntryClick }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-extrabold text-white">My Diary</h1>
      <button
        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={onAddEntryClick}
      >
        Add Entry
      </button>
    </header>
  );
}

Header.propTypes = {
  onAddEntryClick: PropTypes.func.isRequired,
};

export default Header;
