// index.tsx

"use client";

import dynamic from "next/dynamic";

export { PDFView } from "../PDFView";


export const PDFViewer = dynamic(() => import("./pdfViewer"), {
  ssr: false,
});