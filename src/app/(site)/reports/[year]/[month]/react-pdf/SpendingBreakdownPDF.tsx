import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Expense, MonthReportStats } from "@/app/global";

export const SpendingBreakdownPDF: React.FC<{
  stats: MonthReportStats;
  losses: Expense[];
}> = ({ stats, losses }) => {
  const styles = StyleSheet.create({
    section: { marginBottom: 16 },
    headerContainer: { textAlign: "center", marginBottom: 24 },
    title: { fontSize: 24, fontWeight: "bold" },
    subtitle: { fontSize: 14, color: "#555" },
    summaryTable: { width: "100%", marginBottom: 16 },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#ddd",
      paddingVertical: 4,
    },
    tableCellLabel: { flex: 3, fontSize: 12, fontWeight: "bold" },
    tableCellValue: { flex: 1, fontSize: 12, textAlign: "right" },
    chartContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    chartBox: {
      width: "48%",
      height: 200,
      borderWidth: 1,
      borderColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
    },
    bulletList: { marginLeft: 16, marginBottom: 16 },
    bulletItem: { flexDirection: "row", fontSize: 12, marginBottom: 4 },
    bulletDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: "#000",
      marginRight: 8,
      marginTop: 6,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },
  });
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Spending Breakdown</Text>
      <View style={styles.chartContainer}>
        <View style={styles.chartBox}>
          {/* Placeholder for pie chart image */}
          <Text>Pie Chart</Text>
        </View>
        <View style={styles.bulletList}>
          {/* Bullet items */}
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text>Total Spending: ${stats.totalLost.toFixed(2)}</Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text>
              Largest Expense Category: {stats.biggestExpenseCategory} ($
              {stats.categoryTotalsForExpenses[
                stats.biggestExpenseCategory
              ]?.toFixed(2)}
              )
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text>
              Largest Expense Category: {stats.biggestExpenseCategory} accounts
              for {stats.biggestExpensePercentage.toFixed(1)}% of total spending
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text>Biggest Single Purchase: {stats.biggestPurchaseText}</Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text>
              Most Frequent Expense Category: {stats.highestOccCategory}
            </Text>
          </View>
          <View style={styles.bulletItem}>
            <View style={styles.bulletDot} />
            <Text>Total Transactions: {losses.length} transactions</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
