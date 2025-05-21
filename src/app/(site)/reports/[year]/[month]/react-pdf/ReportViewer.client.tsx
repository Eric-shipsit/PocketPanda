// src/app/(site)/reports/[year]/[month]/react-pdf/ReportViewer.client.tsx
"use client";

import React from "react";
import { usePDF } from "@react-pdf/renderer";
import { PDFView } from "../PDFView";
import TextButton from "@/app/components/buttons/TextButton";
import { MonthReportData } from "@/app/global";

export default function ReportViewer({ data }: { data: MonthReportData }) {
  // Generate the PDF and get a URL; also get updateInstance
  const [instance, updateInstance] = usePDF({
    document: <PDFView data={data} />,
  });

  // Re-generate the PDF whenever `data` changes
  React.useEffect(() => {
    updateInstance(<PDFView data={data} />);
  }, [data]);

  if (instance.loading) return <p>Loading PDF…</p>;
  if (instance.error) return <p>Error: {instance.error}</p>;

  return (
    <TextButton
      text="Open report in new tab"
      onClick={() => window.open(instance.url!, "_blank", "noopener")}
    />
  );
}
