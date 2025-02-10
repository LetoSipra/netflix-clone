import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiBell } from "react-icons/hi";
import MenuDropDown from "./MenuDropDown";
import ProfileDropwDown from "./ProfileDropwDown";

function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const links = [
    { id: 0, label: "Home" },
    { id: 1, label: "Tv Shows" },
    { id: 2, label: "Movies" },
    { id: 3, label: "New & Popular" },
    { id: 4, label: "My List" },
  ];

  useEffect(() => {
    const handeScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handeScroll);

    return () => {
      window.removeEventListener("scroll", handeScroll);
    };
  }, []);

  return (
    <header
      className={`${
        scrolled && "bg-[#141414]"
      } fixed top-0 z-50 flex w-full items-center justify-between p-4 text-white transition-all lg:px-10 lg:py-6`}
    >
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <MenuDropDown />
        <ul className="hidden space-x-4 md:flex">
          {links?.map((link) => (
            <li
              key={link.id}
              className="cursor-pointer text-sm font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
            >
              {link.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <AiOutlineSearch className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell className="h-6 w-6" />
        <Link href={"/account"}></Link>
        <ProfileDropwDown />
      </div>
    </header>
  );
}

export default Header;
