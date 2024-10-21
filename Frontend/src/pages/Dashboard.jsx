import React, { useState } from 'react';

const Dashboard = () => {
  const [unreadMessages, setUnreadMessages] = useState(3); // Mock unread messages
  const [quickReplies] = useState(['Hello', 'How are you?', 'Tell me a joke']);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dialmate Dashboard</h2>

      {/* Notifications */}
      <div className="mb-4">
        {unreadMessages > 0 && (
          <div className="bg-red-100 text-red-600 p-2 rounded-lg">
            You have {unreadMessages} unread message(s)!
          </div>
        )}
      </div>

      {/* Quick Reply Buttons */}
      <div className="flex space-x-2 mb-4">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => alert(`You selected: ${reply}`)}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Rest of the dashboard content */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Your Recent Activity</h3>
        {/* Activity List or other components */}
      </div>
    </div>
  );
};

export default Dashboard;
