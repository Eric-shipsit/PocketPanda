import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { MONTH_MAP, MonthReportData, Expense } from "@/app/global";

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 24 },
  headerContainer: {
    width: "100%",
    textAlign: "center" as const,
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold" as const },
  subtitle: { fontSize: 14, marginTop: 4, color: "#555" },
});

const tableStyles = StyleSheet.create({
  table: { width: "100%", borderCollapse: "collapse" as const, marginTop: 8 },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  row: { flexDirection: "row", borderBottomWidth: 0.5, borderColor: "#eee" },
  cell: { flex: 1, padding: 4, fontSize: 10 },
  headerCell: {
    flex: 1,
    padding: 4,
    fontSize: 12,
    fontWeight: "bold" as const,
  },
  amountCell: {
    flex: 1,
    padding: 4,
    fontSize: 10,
    textAlign: "right" as const,
  },
  footerRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 4,
  },
  footerLabel: {
    flex: 3,
    padding: 4,
    fontSize: 12,
    fontWeight: "bold" as const,
    textAlign: "right" as const,
  },
  footerValue: {
    flex: 1,
    padding: 4,
    fontSize: 12,
    fontWeight: "bold" as const,
    textAlign: "right" as const,
  },
});

// PDF table component
export const ExpenseSheetPDF: React.FC<{ expenses: Expense[] }> = ({
  expenses,
}) => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <View style={tableStyles.table}>
      {/* Header */}
      <View style={tableStyles.headerRow}>
        <Text style={tableStyles.headerCell}>Day</Text>
        <Text style={tableStyles.headerCell}>Name</Text>
        <Text style={tableStyles.headerCell}>Description</Text>
        <Text style={tableStyles.headerCell}>Category</Text>
        <Text style={tableStyles.headerCell}>Amount</Text>
      </View>

      {/* Rows */}
      {expenses.map((exp) => (
        <View style={tableStyles.row} key={exp.id}>
          <Text style={tableStyles.cell}>{exp.day}</Text>
          <Text style={tableStyles.cell}>{exp.name}</Text>
          <Text style={tableStyles.cell}>{exp.description}</Text>
          <Text style={tableStyles.cell}>{exp.category}</Text>
          <Text style={tableStyles.amountCell}>${exp.amount.toFixed(2)}</Text>
        </View>
      ))}

      {/* Footer Total */}
      <View style={tableStyles.footerRow}>
        <Text style={tableStyles.footerLabel}>Total</Text>
        <Text style={tableStyles.footerValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};
