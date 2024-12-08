"use client";

import { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import React from "react";
import InputItem from "@/components/InputItem";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //   sign in function
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.replace("/dashboard/home");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      toast.error(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "oauth_google" | "oauth_facebook"
  ) => {
    try {
      await signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/dashboard/home", // Redirect after successful login
        redirectUrlComplete: "/dashboard/home", // After OAuth flow completion
      });
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/dashboard/home");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="form_content">
      <div className="head">
        <h1 className="title">Let's Get Started</h1>
        <p className="desc">Sign in to continue</p>
      </div>
      <form onSubmit={handleSignIn} className="px-3 py-8">
        <InputItem
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputItem
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="py-2 w-full bg-primary text-white  rounded-md mt-7"
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <span className="flex justify-center items-center gap-2">
              Log In <CiLogin size={20} />
            </span>
          )}
        </button>

        <p className="text-gray-500 text-sm mt-5 text-center">
          Don't have an account ?{" "}
          <Link href="/sign-up" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center gap-2 my-5">
          <span className="block flex-1 h-[1px] bg-gray-300"></span>
          <span className="block text-gray-400">Or</span>
          <span className="block flex-1 h-[1px] bg-gray-300"></span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            className="w-[36px] h-[36px] bg-[#0d6efd1a] text-[#0d6efd] rounded-full flex items-center justify-center"
            onClick={() => handleSocialLogin("oauth_facebook")}
            type="button"
          >
            <FaFacebook size={16} />
          </button>
          <button
            className="w-[36px] h-[36px] bg-[#ef4d561a] text-[#ef4d56] rounded-full flex items-center justify-center"
            onClick={() => handleSocialLogin("oauth_google")}
            type="button"
          >
            <FaGoogle size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
