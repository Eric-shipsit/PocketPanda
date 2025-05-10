// src/app/(site)/dashboard/components/IntroductionSection.tsx

import getCurrentUser from "@/app/actions/getCurrentUser";

async function IntroductionSection() {
  const currentUser = await getCurrentUser();
  console.log({ currentUser });
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Welcome, {currentUser?.name}!
      </h1>
      <p className="text-gray-700 mb-6">Email: {currentUser?.email}</p>

      <div className="text-gray-500">Your expenses will appear here.</div>
    </>
  );
}

export default IntroductionSection;
