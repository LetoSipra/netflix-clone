import requests from "@/utility/api_requests";
import { Movie } from "@/typings";
import Banner from "../components/Banner";
import CardRows from "../components/CardRows";
import Header from "../components/Header";
import useAuth from "@/custom_hooks/useAuth";
import Modal from "../components/Modal";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modal";
import Subscription from "@/components/Subscription";

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
}

function index({netflixOriginals, trendingNow, topRated, actionMovies, comedyMovies, horrorMovies, romanceMovies, documentaries}: Props) {
    const {logout, loading} = useAuth()
    const showModal = useRecoilValue(modalState)
    const subs = false

    if (loading || subs === null) return null
    
    if (!subs) return <Subscription />


    return (
    <div className={`relative bg-gradient-to-b ${
        showModal && '!h-screen overflow-hidden'
      }`}> 
    <Header />
    <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-10">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
            <CardRows title="Trending Now" movies={trendingNow} />
            <CardRows title="Top Rated" movies={topRated} />
            <CardRows title="Action" movies={actionMovies} />
            <CardRows title="Comedies" movies={comedyMovies} />
            <CardRows title="Scary Movies" movies={horrorMovies} />
            <CardRows title="Romence Movies" movies={romanceMovies} />
            <CardRows title="Documentaries" movies={documentaries} />
        </section>
    </main>
    {showModal && <Modal />}
    </div>

  )
}

export default index;

export const getServerSideProps = async () => {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((response) => response.json()),
    fetch(requests.fetchTrending).then((response) => response.json()),
    fetch(requests.fetchTopRated).then((response) => response.json()),
    fetch(requests.fetchActionMovies).then((response) => response.json()),
    fetch(requests.fetchComedyMovies).then((response) => response.json()),
    fetch(requests.fetchHorrorMovies).then((response) => response.json()),
    fetch(requests.fetchRomanceMovies).then((response) => response.json()),
    fetch(requests.fetchDocumentaries).then((response) => response.json()),
    ])

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        },
    }
}
