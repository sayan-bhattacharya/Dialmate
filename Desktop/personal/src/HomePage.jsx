import  { useState } from 'react';
import Header from './Header';
import EntryList from './EntryList';
import AddEntryModal from './AddEntryModal';

function HomePage() {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEntryClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveEntry = (entry) => {
    setEntries([...entries, entry]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-red-400 to-gray-700">
      <div className="flex justify-center mb-6">
          <img src="pe.png" alt="Login Illustration" className="h-20 w-20" />
        </div>
      <Header onAddEntryClick={handleAddEntryClick} />
      <EntryList entries={entries} />
      <AddEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntry}
        entries={entries}
      />
    </div>
  );
}

export default HomePage;
