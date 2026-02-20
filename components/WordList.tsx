
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { POPULAR_SIGNS } from '../constants';

const WordList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSigns = POPULAR_SIGNS.filter(word => 
    word.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort();

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Search Bar - Modern but unobtrusive */}
      <div className="relative mb-12 px-4">
        <input
          type="text"
          placeholder="Search for a sign..."
          className="w-full px-4 py-3 pl-10 bg-white border-b border-gray-200 focus:border-blue-500 outline-none transition-all text-gray-700 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass absolute left-8 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>

      {/* Centered List exactly as in the screenshot */}
      <div className="flex flex-col items-center space-y-4">
        {filteredSigns.length > 0 ? (
          filteredSigns.map((word) => (
            <div key={word} className="text-center group">
              <span className="text-[18px] text-gray-800">How to sign: </span>
              <Link
                to={`/sign/${encodeURIComponent(word)}`}
                className="text-[18px] text-blue-700 underline hover:text-blue-900 transition-colors font-medium decoration-1 underline-offset-4"
              >
                {word}
              </Link>
            </div>
          ))
        ) : (
          <div className="p-20 text-center">
            <i className="fa-solid fa-ghost text-4xl text-gray-200 mb-4 block"></i>
            <p className="text-gray-400">No signs found for "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Decorative scroll indicators for that native look */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 opacity-10 pointer-events-none">
        <i className="fa-solid fa-chevron-up"></i>
        <div className="w-1 h-20 bg-gray-400 rounded-full"></div>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </div>
  );
};

export default WordList;
