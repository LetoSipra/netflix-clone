import useAuth from "@/hooks/useAuth";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useState, useRef } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";

function MenuDropDown() {
  const { logout } = useAuth();

  const links = [
    { id: 0, href: "/account", label: "Profile" },
    { id: 1, href: "/account", label: "Settings" },
  ];

  return (
    <Menu>
      <Menu.Button className={``}>
        <img
          src="https://rb.gy/g1pwyx"
          alt="profile"
          className="cursor-pointer rounded"
        />
      </Menu.Button>
      <Menu.Items
        className={
          "absolute right-3 top-20 rounded-none border border-[gray] bg-black p-2 text-white"
        }
      >
        {links?.map((link) => (
          <Link href={`${link.href}`}>
            <Menu.Item
              as="p"
              key={link.id}
              className="block w-36 cursor-pointer  py-3.5 text-center text-sm font-light text-[#b3b3b3] transition duration-200 first:cursor-default first:font-normal first:text-white hover:bg-[#11100F]"
            >
              {link.label}
            </Menu.Item>
          </Link>
        ))}
        <Menu.Item
          onClick={logout}
          as="p"
          className="block w-36 cursor-pointer py-3.5 text-center text-sm font-light text-[#b3b3b3] transition duration-200 first:cursor-default first:font-normal first:text-white hover:bg-[#11100F]"
        >
          <AiOutlineLogout className="absolute left-6 h-6 w-6 text-white" />{" "}
          Logout
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default MenuDropDown;
