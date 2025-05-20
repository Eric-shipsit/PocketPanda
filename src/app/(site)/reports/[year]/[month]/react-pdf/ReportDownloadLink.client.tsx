// src/components/ReportDownloadLink.client.tsx
'use client'

import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFView } from '@/app/(site)/reports/[year]/[month]/PDFView'
import { MonthReportData } from '@/app/global'

export default function ReportDownloadLink({
  data
}: {
  data: MonthReportData
}) {
  return (
    <PDFDownloadLink
      document={<PDFView data={data} />}
      fileName={`PandaPocket-Expense-Report-${data.year}-${data.month}.pdf`}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
    >
      {({ loading }) => (loading ? 'Preparing PDF…' : 'Download PDF')}
    </PDFDownloadLink>
  )
}
