import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className='bg-gradient-custom text-white py-6 px-8 sticky top-0 z-50 transition-all duration-500 ease-in-out shadow-xl rounded-bl-xl rounded-br-xl'>
      <nav
        className='flex justify-between items-center'
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          to='/'
          className='text-4xl font-extrabold text-white hover:text-tertiary transition-all duration-300 transform hover:scale-110'
        >
          BeatStats
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-12 text-lg text-white font-medium'>
          <li>
            <Link to='/' className='nav-link hover:text-tertiary hover:scale-110 transition-all duration-300 transform inline-block'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/top-songs' className='nav-link hover:text-tertiary hover:scale-110 transition-all duration-300 transform inline-block'>
              Top Songs
            </Link>
          </li>
          <li>
            <Link to='/profiles' className='nav-link hover:text-tertiary hover:scale-110 transition-all duration-300 transform inline-block'>
              Profiles
            </Link>
          </li>
        </ul>

        {/* Hamburger for mobile */}
        <button
          onClick={toggleMenu}
          className='md:hidden flex flex-col items-center space-y-2'
          aria-expanded={isOpen}
          aria-label='Toggle menu'
        >
          <span className='w-7 h-0.5 bg-white transition-all duration-300'></span>
          <span className='w-7 h-0.5 bg-white transition-all duration-300'></span>
          <span className='w-7 h-0.5 bg-white transition-all duration-300'></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:hidden overflow-hidden bg-primary transition-all duration-500 ease-in-out`}
      >
        <ul className='flex flex-col items-center space-y-6 py-6 text-white text-lg font-semibold'>
          <li>
            <Link to='/' onClick={() => setIsOpen(false)} className='nav-link hover:text-tertiary hover:scale-110 transition-all duration-300 transform inline-block'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/top-songs' onClick={() => setIsOpen(false)} className='nav-link hover:text-tertiary hover:scale-110 transition-all duration-300 transform inline-block'>
              Top Songs
            </Link>
          </li>
          <li>
            <Link to='/profiles' onClick={() => setIsOpen(false)} className='nav-link hover:text-tertiary hover:scale-110 transition-all duration-300 transform inline-block'>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
