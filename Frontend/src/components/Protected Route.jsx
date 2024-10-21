import React from 'react';

const Dashboard = ({ handleLogout }) => {
  return (
    <div>
      <h1>Welcome to your dashboard!</h1>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
