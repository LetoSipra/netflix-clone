import Link from "next/link";
import React from "react";

function HeaderSide() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#141414] px-4 py-4 transition-all lg:px-10 lg:py-6">
      <Link href="/">
        <img
          src="https://svgshare.com/i/r3T.svg"
          width={120}
          height={120}
          alt=""
          className="cursor-pointer object-contain"
        />
      </Link>
      <Link href="/account">
        <img
          src="https://imgtr.ee/images/2023/03/12/ocoCL.png"
          alt=""
          className="cursor-pointer rounded"
        />
      </Link>
    </header>
  );
}

export default HeaderSide;
