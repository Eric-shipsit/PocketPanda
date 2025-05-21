// src/app/(site)/components/AuthForm.tsx
"use client";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButton";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

const AuthForm = () => {

  const socialAction = (action: string) => {
    // await signIn(action, {redirect: false});
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      });
  };

  return (
    <div className="mt-8 w-full sm:mx-auto sm:max-w-md">
      <div className="mt-0 flex gap-2">
        <AuthSocialButton
          icon={BsGithub}
          onClick={() => socialAction("github")}
        />
        <AuthSocialButton
          icon={BsGoogle}
          onClick={() => socialAction("google")}
        />
      </div>
    </div>
  );
};

export default AuthForm;
