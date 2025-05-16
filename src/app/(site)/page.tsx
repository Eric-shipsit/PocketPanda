// src/app/(site)/page.tsx
"use client";

import Head from "next/head";
import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status]);

  return (
    <>
      <Head>
        <title>Panda Pocket</title>
        <meta
          name="description"
          content="Welcome to Panda Pocket, your expense tracker"
        />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Image
          src="/static/PocketPanda.png"
          width={200}
          height={200}
          alt="Panda Pocket"
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to Panda Pocket</h1>
        <p className="text-lg text-gray-700 mb-6">
          Track your expenses effortlessly and stay on top of your budget.
        </p>
        <AuthForm />
      </main>
    </>
  );
}
