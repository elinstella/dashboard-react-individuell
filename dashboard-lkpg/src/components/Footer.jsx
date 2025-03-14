import React from 'react';

function Footer() {
  return (
    <footer className='bg-gradient-custom text-white py-6 border-t border-quaternary'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center'>
        <p className='text-sm text-center pl-8'> &#9400; 2025 BeatStats</p>

        <div className='flex space-x-4 mt-4 sm:mt-0'>
          <a
            href='#'
            className='text-white hover:text-tertiary transition-all duration-300'>
            <i className='fab fa-facebook'></i>
          </a>
          <a
            href='#'
            className='text-white hover:text-tertiary transition-all duration-300'>
            <i className='fab fa-twitter'></i>
          </a>
          <a
            href='#'
            className='text-white hover:text-tertiary transition-all duration-300'>
            <i className='fab fa-instagram'></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
