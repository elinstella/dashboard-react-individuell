function NavHeader() {
  return (
    <nav className='flex justify-between bg-blue-500 p-3'>
      <a href='#'>BeatStats</a>
      <ul className='flex'>
        <li>
          <a href='#'>Home</a>
        </li>
        <li>
          <a href='#'>About</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavHeader;
