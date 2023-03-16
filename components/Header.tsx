import useAuth from '@/custom_hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import { HiBell } from 'react-icons/hi'


function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const {logout} = useAuth()

  useEffect(() => {
    const handeScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }
    window.addEventListener("scroll", handeScroll);

    return () => {
        window.removeEventListener("scroll", handeScroll)

    }
  }, [])
    

  const headerlinks = `cursor-pointer text-sm font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]`;

  return (
    <header className={`${scrolled && "bg-[#141414]"} fixed top-0 z-50 text-white flex w-full items-center justify-between p-4 transition-all lg:px-10 lg:py-6`}>
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
      <div className='flex items-center space-x-4 text-sm font-light'>
        <AiOutlineSearch className='hidden h-6 w-6 sm:inline' />
        <p className='hidden lg:inline'>Kids</p>
        <HiBell className='h-6 w-6' />
        <Link href={"/account"}>
            <img src="https://imgtr.ee/images/2023/03/12/ocoCL.png" alt="profile" className='cursor-pointer rounded' />
        </Link>
      </div>
    </header>
  );
}

export default Header;
