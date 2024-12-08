"use client";
import { useEffect, useState } from "react";
import { useAuth, useSignUp } from "@clerk/nextjs";
import InputItem from "@/components/InputItem";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerifying(true);
    } catch (err: any) {
      toast.error(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/dashboard/home");
        toast.success("Sign Up Successful");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      toast.error(err.errors[0].message);
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
        <h1 className="title">Create an account</h1>
        <p className="desc">Enter your details to create your account today.</p>
      </div>
      {verifying ? (
        <form onSubmit={handleVerify} className="px-3 py-8">
          <InputItem
            label="Enter your verification code"
            type="number"
            placeholder="Enter your verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required
          />

          <button
            type="submit"
            className="py-2 w-full bg-primary text-white flex justify-center items-center rounded-md mt-7"
          >
            Verify <CiLogin size={20} />
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignUp} className="px-3 py-8">
          <InputItem
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
                Sign Up <CiLogin size={20} />
              </span>
            )}
          </button>

          <p className="text-gray-500 text-sm mt-5 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Log In
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
