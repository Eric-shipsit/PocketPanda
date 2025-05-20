// src/app/(site)/reports/[year]/[month]/react-pdf/PDFView.tsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { MONTH_MAP, MonthReportData } from '@/app/global';
import { ExpenseSheetPDF } from './react-pdf/ExpenseSheetPDF';

interface PDFViewProps {
  data: MonthReportData;
}

// Styles
const styles = StyleSheet.create({
  page: { padding: 24, fontFamily: 'Helvetica' },
  section: { marginBottom: 16 },
  headerContainer: { textAlign: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#555' },
  summaryTable: { width: '100%', marginBottom: 16 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#ddd', paddingVertical: 4 },
  tableCellLabel: { flex: 3, fontSize: 12, fontWeight: 'bold' },
  tableCellValue: { flex: 1, fontSize: 12, textAlign: 'right' },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  chartBox: { width: '48%', height: 200, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center' },
  bulletList: { marginLeft: 16, marginBottom: 16 },
  bulletItem: { flexDirection: 'row', fontSize: 12, marginBottom: 4 },
  bulletDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#000', marginRight: 8, marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, borderBottomWidth: 1, borderColor: '#ddd' },
});

export const PDFView: React.FC<PDFViewProps> = ({ data }) => {
  const { year, month, user, gains, losses, totalGained, totalLost } = data;

  // Category totals for bullets
  const categoryTotals: Record<string, number> = {};
  losses.forEach(exp => { categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount; });

  const biggestCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b, Object.keys(categoryTotals)[0] || '');
  const biggestAmount = categoryTotals[biggestCategory] || 0;
  const biggestPct = totalLost ? (biggestAmount / totalLost) * 100 : 0;

  const totalTransactions = losses.length;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Pocket Panda</Text>
          <Text style={styles.subtitle}>{MONTH_MAP[month]} {year} Report</Text>
        </View>

        {/* Account Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Summary</Text>
          <View style={styles.summaryTable}>
            {user?.name && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Account Holder</Text>
                <Text style={styles.tableCellValue}>{user.name}</Text>
              </View>
            )}
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Total Gains</Text>
              <Text style={styles.tableCellValue}>${totalGained.toFixed(2)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Total Expenses</Text>
              <Text style={styles.tableCellValue}>${totalLost.toFixed(2)}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Net Balance</Text>
              <Text style={styles.tableCellValue}>${(totalGained - totalLost).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Spending Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Spending Breakdown</Text>
          <View style={styles.chartContainer}>
            <View style={styles.chartBox}>
              {/* Placeholder for pie chart image */}
              <Text>Pie Chart</Text>
            </View>
            <View style={styles.bulletList}>
              {/* Bullet items */}
              <View style={styles.bulletItem}><View style={styles.bulletDot}/><Text>Total Spending: ${totalLost.toFixed(2)}</Text></View>
              <View style={styles.bulletItem}><View style={styles.bulletDot}/><Text>Highest Category: {biggestCategory} ({biggestPct.toFixed(1)}%)</Text></View>
              <View style={styles.bulletItem}><View style={styles.bulletDot}/><Text>Total Transactions: {totalTransactions}</Text></View>
            </View>
          </View>
        </View>

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
