import { JSX } from "react";
import AuthCard from "../_components/AuthCard";
import AuthHero from "../_components/AuthHero";
import AuthTabs from "../_components/AuthTab";
import SocialLogin from "../_components/SocialLogin";
import RegisterForm from "./RegisterForm";

export default function RegisterPage(): JSX.Element {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/ocean_2.png')" }}
    >
      <AuthCard>
        <AuthHero
          title="Create Your Account"
          subtitle="Join and Start Your Journey"
          imageSrc="/images/ocean_1.png"
        />

        <div className="p-6">
          <AuthTabs />
          <RegisterForm />
          <SocialLogin />
        </div>
      </AuthCard>
    </main>
  );
}
