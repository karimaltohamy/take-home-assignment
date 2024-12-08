import SignUpForm from "@/components/signUpForm/SignUpForm.compoent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Take Home Assignment",
};

const Page = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#F7F9FB] overflow-hidden">
      <SignUpForm />
    </div>
  );
};

export default Page;
