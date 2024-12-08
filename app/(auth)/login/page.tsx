import LoginForm from "@/components/loginForm/LoginForm.component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Take Home Assignment",
};

const page = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#F7F9FB] overflow-hidden">
      <LoginForm />
    </div>
  );
};

export default page;
