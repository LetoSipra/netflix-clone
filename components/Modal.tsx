import { modalState, movieState } from "@/atoms/modal";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { Genre, Movie } from "@/typings";
import {
  CheckIcon,
  HandThumbUpIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import MuiModal from "@mui/material/Modal";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlay } from "react-icons/fa";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { Element } from "../typings";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState<string>("");
  const [genre, setGenre] = useState<Genre[]>([]);
  const [muted, setMuted] = useState<boolean>(true);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const { user } = useAuth();

  const toastStyle = {
    background: "#141414",
    color: "white",
    fontSize: "16px",
    padding: "10px",
    border: "1px solid white",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  const modalBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border-2 border-[gray] bg-[#2a2a2a]/60 transition hover:border-white hover:bg-white/10;";

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
      );

      toast(
        <p className="font-sans text-lg font-thin text-shadow">
          {movie?.title || movie?.original_name} has been removed from My List
        </p>,
        {
          duration: 4000,
          style: toastStyle,
          position: "bottom-center",
          icon: (
            <HiOutlineDocumentRemove className="m-auto h-7 w-7 rounded-full border border-solid border-white p-1" />
          ),
        }
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", movie?.id.toString()!),
        { ...movie }
      );

      toast(
        <p className="font-sans text-lg font-thin text-shadow">
          {movie?.title || movie?.original_name} has been added to My List
        </p>,
        {
          duration: 4000,
          style: toastStyle,
          position: "bottom-center",
          icon: (
            <CheckIcon className="m-auto h-7 w-7 rounded-full border border-solid border-white p-1" />
          ),
        }
      );
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenre(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setMovies(snapshot.docs)
      );
    }
  }, [db, movie?.id]);

  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  );
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-sm scrollbar-hide ">
      <>
        <button
          onClick={handleClose}
          className={`${modalBtn}modalBtn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]`}>
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2 ">
              <button
                className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition
                hover:bg-[#e6e6e6]">
                <FaPlay className="h-6 w-6 text-black" />
                Play
              </button>
              <button className={`${modalBtn}`} onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-7 w-7 text-white" />
                ) : (
                  <PlusIcon className="h-7 w-7 text-white" />
                )}
              </button>
              <button className={`${modalBtn}`}>
                <HandThumbUpIcon className="h-7 w-7 text-white" />
              </button>
            </div>
            <button className={`${modalBtn}`} onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8 text-white">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genre?.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
