import { dataUrl } from "@/utility/data_base_url";
import { Movie } from "@/typings";
import Image from "next/image";
import { useEffect, useState } from "react";
import {FaPlay} from "react-icons/fa"
import {BsInfoCircleFill} from "react-icons/bs"
import { useRecoilState } from "recoil";
import { modalState, movieState } from "@/atoms/modal";

interface Props {
    netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
    const [banner, setBanner] = useState<Movie | null>(null);
    const [showModal, setShowModal] = useRecoilState(modalState);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    
    const bannerButtons = "flex items-center gap-x-2 rounded-sm px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl"

    useEffect(() => {
      setBanner(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, []);
       

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="absolute -z-10 top-0 left-0 w-screen h-[100vh]">
            <Image 
                src={banner?.backdrop_path ? `${dataUrl}${banner?.backdrop_path || banner?.poster_path}` : ""} 
                alt="banner"
                fill
                className="object-cover"
            />
        </div>
        <h1 className="text-2xl font-bold lg:text-7xl md:text-4xl">
            {banner?.title || banner?.name || banner?.original_name}
        </h1>
        <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md">
            {banner?.overview}
        </p>
        <div className="flex space-x-3">
            <button className={`${bannerButtons} bg-white text-black`}>
                <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                Play
            </button>
            <button className={`${bannerButtons} bg-[gray]/70 `} onClick={() => {
            setCurrentMovie(banner)
            setShowModal(true)
          }}>
                More Info
                <BsInfoCircleFill className="h-5 w-5 md:h-8 md:w-8" />
            </button>
        </div>
    </div>
  )
}

export default Banner;
