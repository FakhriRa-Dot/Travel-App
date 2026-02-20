import { JSX } from "react";
import AuthCard from "../_components/AuthCard";
import AuthHero from "../_components/AuthHero";
import AuthTabs from "../_components/AuthTab";
import SocialLogin from "../_components/SocialLogin";
import LoginForm from "./LoginForm";

export default function LoginPage(): JSX.Element {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/ocean_2.png')" }}
    >
      <AuthCard>
        <AuthHero
          title="Your Next Adventure Starts Here"
          subtitle="Ready to Explore World?"
          imageSrc="/images/ocean_1.png"
        />

        <div className="p-6">
          <AuthTabs />
          <LoginForm />
          <SocialLogin />
        </div>
      </AuthCard>
    </main>
  );
}
