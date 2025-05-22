// src/app/(site)/reports/[year]/[month]/page.tsx

import DesktopView from "./DesktopView";
import Page from "@/app/components/Page";

export default function MonthYearReportsPage() {
  return (
    <Page>
      <DesktopView />
    </Page>
  );
}
