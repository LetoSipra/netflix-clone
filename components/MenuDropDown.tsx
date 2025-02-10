import { Menu } from "@headlessui/react";

function MenuDropDown() {
  const links = [
    { href: "/account-settings", label: "Home" },
    { href: "/support", label: "TV Shows" },
    { href: "/license", label: "Movies" },
    { href: "/sign-out", label: "New & Popular" },
    { href: "/sign", label: "My List" },
  ];

  return (
    <Menu>
      <Menu.Button className={`md:hidden pl-1`}>Browse</Menu.Button>
      <Menu.Items
        className={
          "absolute left-0 top-20 rounded-none border border-[gray] bg-black text-white"
        }>
        {links?.map((link) => (
          <Menu.Item
            as="p"
            key={link.href}
            className="block w-72 py-3.5  text-center cursor-pointer text-sm font-light text-[#b3b3b3] transition duration-200 first:cursor-default first:font-normal first:text-white hover:bg-[#11100F]">
            {link.label}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default MenuDropDown;
