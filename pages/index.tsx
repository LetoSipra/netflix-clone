import requests from "@/utility/api_requests";
import { Movie } from "@/typings";
import Banner from "../components/Banner";
import CardRows from "../components/CardRows";
import Header from "../components/Header";
import useAuth from "@/hooks/useAuth";
import Modal from "../components/Modal";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modal";
import Subscription from "@/components/Subscription";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "@/stripe";
import useSubscribe from "@/hooks/useSubscribe";
import useList from "@/hooks/useList";
import Head from "next/head";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

function index({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: Props) {
  const { logout, loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subs = useSubscribe(user);
  const list = useList(user?.uid);

  if (loading || subs === null) return null;

  if (!subs) return <Subscription products={products} />;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}>
      <Head>
        <title>Netflix</title>
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-10">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <CardRows title="Trending Now" movies={trendingNow} />
          <CardRows title="Top Rated" movies={topRated} />
          <CardRows title="Action" movies={actionMovies} />
          {list.length > 0 && <CardRows title="My List" movies={list} />}
          <CardRows title="Comedies" movies={comedyMovies} />
          <CardRows title="Scary Movies" movies={horrorMovies} />
          <CardRows title="Romence Movies" movies={romanceMovies} />
          <CardRows title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
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
  ]);

  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((err) => console.log(err.messeage));

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
      products,
    },
  };
};
