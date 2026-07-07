export type ReportPeriod = '24h' | '7d' | '30d'

export interface RevenueReport {
  netProfit: number
  totalRevenue: number
  totalExpenses: number
}

const REPORT_DATA: Record<ReportPeriod, RevenueReport> = {
  '24h': {
    totalRevenue: 1240.50,
    totalExpenses: 315.00,
    netProfit: 925.50,
  },
  '7d': {
    totalRevenue: 8750.00,
    totalExpenses: 2100.00,
    netProfit: 6650.00,
  },
  '30d': {
    totalRevenue: 32400.00,
    totalExpenses: 7850.00,
    netProfit: 24550.00,
  },
}

/**
 * Simulates a GET /api/revenue-report?period=<period> call.
 * Returns { netProfit, totalRevenue, totalExpenses } for the requested period.
 */
export async function fetchRevenueReport(period: ReportPeriod): Promise<RevenueReport> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(REPORT_DATA[period]), 400)
  })
}
