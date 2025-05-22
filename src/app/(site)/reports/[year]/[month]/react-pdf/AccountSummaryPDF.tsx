import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Expense, MonthReportData, MonthReportStats } from "@/app/global";

export const AccountSummaryPDF: React.FC<{
  data: MonthReportData;
  totalLost: number;
  totalGained: number;
  categoryTotalsForExpenses: Record<string, number>;
  categoryTotalsForProfit: Record<string, number>;
}> = ({
  data,
  totalLost,
  totalGained,
  categoryTotalsForExpenses,
  categoryTotalsForProfit,
}) => {
  const styles = StyleSheet.create({
    bold: {
      fontWeight: "bold" as const,
    },
    section: {
      margin: 24,
      fontSize: 13,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    table: {
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#E5E7EB",
      backgroundColor: "#E5E7EB",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#E5E7EB",
    },
    tableCol: {
      width: "50%",
      padding: 4,
    },
    textRight: {
      textAlign: "right" as const,
    },
  });
  const userName = data?.user?.name ?? "—";
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Monthly Summary</Text>
      <View>
        <View style={styles.table}>
          {/* Account Holder Row */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.bold]}>
              <Text>Account Holder: {userName}</Text>
            </View>
          </View>

          {/* Profit Categories */}
          {Object.entries(categoryTotalsForProfit).map(([category, amount]) => (
            <View style={styles.tableRow} key={`p-${category}`}>
              <View style={styles.tableCol}>
                <Text>{category}</Text>
              </View>
              <View style={[styles.tableCol, styles.textRight]}>
                <Text>${amount.toFixed(2)}</Text>
              </View>
            </View>
          ))}

          {/* Total Profits */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.bold]}>
              <Text>Total Profits</Text>
            </View>
            <View style={[styles.tableCol, styles.bold, styles.textRight]}>
              <Text>${totalGained.toFixed(2)}</Text>
            </View>
          </View>

          {/* Expense Categories */}
          {Object.entries(categoryTotalsForExpenses).map(
            ([category, amount]) => (
              <View style={styles.tableRow} key={`e-${category}`}>
                <View style={styles.tableCol}>
                  <Text>{category}</Text>
                </View>
                <View style={[styles.tableCol, styles.textRight]}>
                  <Text>${amount.toFixed(2)}</Text>
                </View>
              </View>
            ),
          )}

          {/* Total Expenses */}
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.bold]}>
              <Text>Total Expenses</Text>
            </View>
            <View style={[styles.tableCol, styles.bold, styles.textRight]}>
              <Text>${totalLost.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
