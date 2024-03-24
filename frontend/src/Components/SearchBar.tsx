import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        className="px-4 py-2 border h-12 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-bice-blue focus:border-transparent"
      />
      <button
        type="submit"
        className="px-4 py-2 h-12 bg-bice-blue text-white rounded-r-md hover:bg-bice-blue focus:outline-none focus:ring-2 focus:ring-bice-blue focus:ring-opacity-50"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
