// src/app/(site)/dashboard/page.tsx

import React from "react";
import Page from "components/Page";
import IntroductionSection from "components/IntroductionSection";

const DashboardContent = (
  <div className="min-w-full mx-auto">
    <div className="grid grid-cols-2 gap-6">
      {/* Main Welcome Box */}
      <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
        <IntroductionSection />
      </div>

      {/* Additional Box 1 */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          Box Title 1
        </h2>
        <p className="text-gray-500">Additional content goes here.</p>
      </div>

      {/* Additional Box 2 */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Box Title 2
          </h2>
          <p className="text-gray-500">Additional content goes here.</p>
        </div>
      </div>
    </div>
  </div>
);

const Dashboardpage = () => {
  return <Page>{DashboardContent}</Page>;
};

export default Dashboardpage;
