import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        fill
        alt="login"
        className="-z-10 !hidden object-cover opacity-60 sm:!inline"
      />
      <img
        src="https://rb.gy/ulxxee"
        alt="logo"
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="w-full rounded bg-[#333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545]"
            />
            {errors.email && (
              <p className="p-1 text-[14px] font-light text-red-400">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full rounded bg-[#333] px-5 py-3.5 placeholder-[gray] outline-none focus:bg-[#454545]"
            />
            {errors.password && (
              <p className="p-1 text-[14px] font-light text-red-400">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?
          <button
            type="submit"
            onClick={() => setLogin(false)}
            className="pl-2 text-white hover:underline"
          >
            Sign up now
          </button>
        </div>
        <div className="space-y-5 text-red-600">
          <div>
            <p>Account for login;</p>
            <p>E-mail: test@gmail.com</p>
            <p>Password: test123</p>
          </div>
          <div className="space-y-5">
            <p>
              OR you can register with random info by clicking the "sign up now"
              after entering mail&pass.
            </p>
            <p>
              Stripe is on test mode you can subscribe with test credit card.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
