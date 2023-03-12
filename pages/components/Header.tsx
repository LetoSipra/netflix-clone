function Header() {
  const headerlinks = `cursor-pointer text-sm font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]`;

  return (
    <header>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src='https://svgshare.com/i/r3T.svg'
          alt='logo'
          width={100}
          height={100}
          className='cursor-pointer object-contain'
        />

        <ul className='hidden space-x-4 md:flex'>
          <li className={`${headerlinks}`}>Home</li>
          <li className={`${headerlinks}`}>Tv Shows</li>
          <li className={`${headerlinks}`}>Movies</li>
          <li className={`${headerlinks}`}>New & Pouplar</li>
          <li className={`${headerlinks}`}>My List</li>
        </ul>
      </div>
      <div>
        
      </div>
    </header>
  );
}

export default Header;
