import HeaderSide from "@/components/HeaderSide";
import Membership from "@/components/Member";
import useAuth from "@/hooks/useAuth";
import useSubscribe from "@/hooks/useSubscribe";
import payments from "@/stripe";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Head from "next/head";

interface Props {
  products: Product[];
}

function Account({ products }: Props) {
  const { user, logout } = useAuth();
  const subscribe = useSubscribe(user);

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
      </Head>
      <HeaderSide />
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscribe?.created}
            </p>
          </div>
        </div>
        <Membership />
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          <div className="col-span-2 font-medium">
            {
              products.filter((product) => product.id === subscribe?.product)[0]
                ?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
            Change plan
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border-[1px] border-[gray] px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}>
            Sign out all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export default Account;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
