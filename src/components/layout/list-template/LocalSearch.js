import { Icon } from 'gatsby-plugin-substrate';
import React from 'react';

export default function LocalSearch({ setSearchQuery, searchQuery, section }) {
  const handleChange = event => {
    const search = event.target.value.toLowerCase();
    setSearchQuery(search);
  };
  return (
    <>
      <input
        className="w-full p-2 text-sm font-medium placeholder-gray-400 outline-none dark:bg-substrateDarkest"
        placeholder={`Search ${section}`}
        value={searchQuery}
        onChange={event => handleChange(event)}
      />
      <Icon name="search" className="fill-current text-substrateGray-dark dark:text-substrateWhite w-4 h-4" />
    </>
  );
}
