import React, { useState } from 'react';

const Reminders = () => {
  const [reminders, setReminders] = useState([]); // Stores reminders
  const [reminderText, setReminderText] = useState(''); // Stores user input for reminder text
  const [reminderDate, setReminderDate] = useState(''); // Stores the selected date for the reminder

  // Function to add a new reminder
  const addReminder = () => {
    if (reminderText && reminderDate) {
      const newReminder = {
        id: reminders.length + 1,
        text: reminderText,
        date: reminderDate
      };
      setReminders([...reminders, newReminder]);
      setReminderText(''); // Clear input field after adding
      setReminderDate(''); // Clear date after adding
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Reminders</h1>

      {/* Input for adding new reminder */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter reminder"
          value={reminderText}
          onChange={(e) => setReminderText(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full mb-2"
        />
        <input
          type="datetime-local"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full mb-4"
        />
        <button onClick={addReminder} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Add Reminder
        </button>
      </div>

      {/* List of reminders */}
      <ul className="mt-4">
  {reminders.map((reminder) => {
    const isPast = new Date(reminder.date) < new Date();
    return (
      <li key={reminder.id} className="border-b py-2 flex justify-between">
        <span>{reminder.text}</span>
        <span className={`text-sm ${isPast ? 'text-red-500' : 'text-gray-500'}`}>
          {new Date(reminder.date).toLocaleString()}
          {isPast && <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">Overdue</span>}
        </span>
      </li>
    );
  })}
</ul>
    </div>
  );
};

export default Reminders;
