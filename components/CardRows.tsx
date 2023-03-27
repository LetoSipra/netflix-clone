import { Movie } from "@/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";
import { useRef, useState } from "react";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[] | DocumentData[];
}

function CardRows({ title, movies }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleClick = (way: string) => {
    setScrolled(true);
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;

      const scrollTo =
        way === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <>
    <div className="h-40 space-y-0.5 md:space-y-2" id="Trending">
      <h2 id="Trending" className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125
        ${!scrolled && "hidden"}
        `}
          onClick={() => {
            handleClick("left");
          }}
        />

        <div
          ref={scrollRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125"
          onClick={() => {
            handleClick("right");
          }}
        />
      </div>
    </div>
    </>
  );
}

export default CardRows;
