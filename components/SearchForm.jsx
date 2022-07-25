import React from 'react';

const SearchForm = ({ onChange }) => (
  <div className="relative w-full mb-4">
    <input
      aria-label="Search articles"
      type="text"
      onChange={onChange}
      placeholder="Search meetup"
      className={`
            w-full px-3 py-2 text-gray-900 bg-white border rounded-xl hover:border-green-200 
          outline-none text-sm md:text-base
          `}
    />
    <svg
      className="absolute right-2 top-2 w-5 h-5 text-gray-400 md:right-3 md:top-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
);

export default SearchForm;
