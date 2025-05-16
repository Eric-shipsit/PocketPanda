// src/app/(site)/dev/page.tsx

import React, { useContext, useState } from "react";
import Page from "components/Page";
import DevContent from "./DevContent";

//TODO: redirect if permissions are invalid
const DevPage = () => {
  return (
    <Page>
      <DevContent />
    </Page>
  );
};

export default DevPage;
