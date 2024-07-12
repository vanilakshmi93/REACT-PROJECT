import React from 'react';
import { Link } from 'react-router-dom';
import logos from '../assets/Logo.png';

const NavBar = () => {
  return (
    <div className='flex border pl-8 py-9 space-x-8 items-center'>
      <img src={logos} className='w-[50px]' alt="Logo" />
      <Link to="/" className="text-blue-500 hover:underline">
        <h3>Movies</h3>
      </Link>
      <Link to="/watchlist" className="text-blue-500 hover:underline">
        <h3>Watchlist</h3>
      </Link>
    </div>
  );
};

export default NavBar;