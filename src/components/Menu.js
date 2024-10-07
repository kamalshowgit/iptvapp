import React from 'react';

const Menu = ({ onSearch }) => {
  return (
    <div className="menu">
      <h1>TV Channels (Beta)</h1>
      <ul>
        <li>Home</li>
        <li>Live TV</li>
        <li>Movies</li>
        <li>Sports</li>
      </ul>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search channels..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Menu;
