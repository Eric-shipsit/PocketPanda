// src/app/(site)/reports/[year]/[month]/react-pdf/PDFView.tsx

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { MONTH_MAP, MonthReportData } from "@/app/global";
import { ExpenseSheetPDF } from "./react-pdf/ExpenseSheetPDF";
import { SpendingBreakdownPDF } from "./react-pdf/SpendingBreakdownPDF";
import { AccountSummaryPDF } from "./react-pdf/AccountSummaryPDF";

interface PDFViewProps {
  data: MonthReportData;
}

const styles = StyleSheet.create({
  page: { padding: 24, fontFamily: "Helvetica" },
  title: { fontSize: 18, fontWeight: "bold" },
  logo: { width: 50, height: 50, marginRight: 8 },
  section: {
    margin: 24,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export const PDFView: React.FC<PDFViewProps> = ({ data }) => {
  const { year, month, user, gains, losses, totalGained, totalLost, stats } =
    data;

  const categoryTotals: Record<string, number> = {};
  losses.forEach((exp) => {
    categoryTotals[exp.category] =
      (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const categoryTotalsForExpenses: Record<string, number> = {};
  for (const exp of losses) {
    const { category, amount } = exp;
    categoryTotalsForExpenses[category] =
      (categoryTotalsForExpenses[category] || 0) + amount;
  }

  const categoryTotalsForProfit: Record<string, number> = {};
  for (const exp of gains) {
    const { category, amount } = exp;
    categoryTotalsForProfit[category] =
      (categoryTotalsForProfit[category] || 0) + amount;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Image src="/static/PocketPanda.png" style={styles.logo} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Pocket Panda</Text>
        </View>
        <Text style={styles.title}>
          {MONTH_MAP[month]} {year} Report
        </Text>
        <AccountSummaryPDF
          data={data}
          totalLost={totalLost}
          totalGained={totalGained}
          categoryTotalsForExpenses={categoryTotalsForExpenses}
          categoryTotalsForProfit={categoryTotalsForProfit}
        />
      </Page>
      <Page size="A4" style={styles.page} wrap>
        {/* <SpendingBreakdownPDF stats={stats} losses={losses} /> */}
        {/* Detailed Expenses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Expenses</Text>
          <ExpenseSheetPDF expenses={losses} />
        </View>

        {/* Detailed Gains */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Gains</Text>
          <ExpenseSheetPDF expenses={gains} />
        </View>
      </Page>
    </Document>
  );
};
