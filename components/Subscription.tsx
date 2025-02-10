import useAuth from "@/hooks/useAuth";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import Link from "next/link";
import PlanDetail from "./PlanDetail";
import { useState } from "react";
import Loading from "./Loading";
import { loadCheckout } from "@/stripe";

interface Props {
  products: Product[];
}

function Subscription({ products }: Props) {
  const { logout, user } = useAuth();
  const [selected, setSelected] = useState<Product | null>(products[2]);
  const [loading, setLoading] = useState(false);

  const subscribe = () => {
    if (!user) return;
    loadCheckout(selected?.prices[0].id!);
    setLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-[#141414] p-4 text-white transition-all lg:px-10 lg:py-6">
        <Link href={"/"}>
          <img
            src="https://rb.gy/ulxxee"
            alt="logo"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          onClick={logout}
          className="text-lg font-medium hover:underline "
        >
          Sign Out
        </button>
      </header>
      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium text-white">
          Choose the plan that's right for you
        </h1>
        <Perks />
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products.map((product) => (
              <div
                onClick={() => setSelected(product)}
                key={product.id}
                className={`${
                  selected?.id === product.id ? "opacity-100" : "opacity-50"
                } relative mx-1.5 flex h-20 w-[calc(100%/3)] cursor-default items-center justify-center rounded-sm bg-[#e50914] font-semibold shadow after:absolute after:top-full after:left-1/2 after:block after:-translate-x-1/2 after:border-8 after:border-b-0 after:border-transparent after:border-t-[#e50914] md:h-32 lg:mx-8`}
              >
                {product.name}
              </div>
            ))}
          </div>
          <PlanDetail products={products} selected={selected} />
          <button
            onClick={() => subscribe()}
            disabled={!selected || loading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[f6121d] md:w-[420px] ${
              loading && "opacity-50"
            } `}
          >
            {loading ? <Loading color="dark:fill-gray-300" /> : "Subscribe"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Subscription;

function Perks({}) {
  return (
    <ul>
      <li className="flex items-center gap-x-2 text-lg">
        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
        Ad-free.
      </li>
      <li className="flex items-center gap-x-2 text-lg">
        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations just
        for you.
      </li>
      <li className="flex items-center gap-x-2 text-lg">
        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel your
        plan anytime.
      </li>
    </ul>
  );
}
