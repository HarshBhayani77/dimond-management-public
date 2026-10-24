import { BranchCode, BranchInfo } from '../types';

export const BRANCHES: BranchInfo[] = [
  {
    code: 'ALL',
    name: 'Consolidated Operations',
    location: 'Surat & Mumbai Consolidated',
    description: 'Executive unified view across both manufacturing vaults and bourse trading books.',
  },
  {
    code: 'SURAT',
    name: 'Surat Manufacturing Unit',
    location: 'Katargam GIDC, Surat, Gujarat',
    description: 'Primary rough procurement hub, vault registers, Princess Kapan cutting, and artisan labour.',
  },
  {
    code: 'MUMBAI',
    name: 'Mumbai Trading Office (BDB)',
    location: 'Bharat Diamond Bourse, BKC, Mumbai',
    description: 'International & domestic trading floor, commercial invoicing, customer receivables, and Dalali payouts.',
  },
];

export const MOCK_DASHBOARD_METRICS = {
  ALL: {
    roughVaultCarats: 1482.450,
    roughValuationINR: 123784575.00,
    princessStockCarats: 348.120,
    princessValuationINR: 46508820.00,
    chokiStockCarats: 92.400,
    chokiValuationINR: 5775000.00,
    activeKapanCount: 6,
    avgYieldPercent: 24.65,
    pendingReceivablesINR: 4250000.00,
    accruedDalaliINR: 64200.00,
    cashDrawerINR: 527700.00,
    bankBalanceINR: 48200000.00,
  },
  SURAT: {
    roughVaultCarats: 1320.250,
    roughValuationINR: 110240875.00,
    princessStockCarats: 112.500,
    princessValuationINR: 15030000.00,
    chokiStockCarats: 78.100,
    chokiValuationINR: 4881250.00,
    activeKapanCount: 6,
    avgYieldPercent: 24.65,
    pendingReceivablesINR: 850000.00,
    accruedDalaliINR: 12500.00,
    cashDrawerINR: 145200.00,
    bankBalanceINR: 12400000.00,
  },
  MUMBAI: {
    roughVaultCarats: 162.200,
    roughValuationINR: 13543700.00,
    princessStockCarats: 235.620,
    princessValuationINR: 31478820.00,
    chokiStockCarats: 14.300,
    chokiValuationINR: 893750.00,
    activeKapanCount: 0,
    avgYieldPercent: 0,
    pendingReceivablesINR: 3400000.00,
    accruedDalaliINR: 51700.00,
    cashDrawerINR: 382500.00,
    bankBalanceINR: 35800000.00,
  },
};

export const MOCK_RECONCILIATION_STATEMENT = {
  openingRoughCarats: 1250.000,
  newPurchasesCarats: 500.000,
  rejectionRecoveryCarats: 32.450,
  totalAvailableRoughCarats: 1782.450,
  productionKatConsumedCarats: 300.000,
  roughSoldCarats: 0.000,
  closingPhysicalVaultCarats: 1482.450,
  weightedAverageCostUSD: 142.50,
  verifiedStatus: '100% RECONCILED (NO DISCREPANCY)',
};

export const MOCK_KAPAN_LOTS = [
  {
    kapanNumber: 'KPN-2026-042',
    roughLotCode: 'LOT-RGH-AUG-01',
    katWeightCarats: 100.000,
    roughCostPerCtUSD: 120.00,
    polishedCarats: 24.650,
    yieldPercent: 24.65,
    rejectionsCarats: 8.200,
    ghatLossCarats: 67.150,
    workerMajuriINR: 35000.00,
    status: 'COMPLETED',
    finishDate: '2026-10-18',
  },
  {
    kapanNumber: 'KPN-2026-043',
    roughLotCode: 'LOT-RGH-AUG-04',
    katWeightCarats: 150.000,
    roughCostPerCtUSD: 135.00,
    polishedCarats: 37.800,
    yieldPercent: 25.20,
    rejectionsCarats: 12.100,
    ghatLossCarats: 100.100,
    workerMajuriINR: 52500.00,
    status: 'COMPLETED',
    finishDate: '2026-10-20',
  },
  {
    kapanNumber: 'KPN-2026-044',
    roughLotCode: 'LOT-RGH-SEP-02',
    katWeightCarats: 80.000,
    roughCostPerCtUSD: 140.00,
    polishedCarats: 19.200,
    yieldPercent: 24.00,
    rejectionsCarats: 6.400,
    ghatLossCarats: 54.400,
    workerMajuriINR: 28000.00,
    status: 'IN_POLISHING',
    finishDate: 'Est. 2026-10-26',
  },
];

export const MOCK_RECEIVABLES_AGING = [
  { bucket: 'Not Due (Current)', amountINR: 1850000.00, partyCount: 6, status: 'Healthy' },
  { bucket: '1 - 30 Days Overdue', amountINR: 1420000.00, partyCount: 4, status: 'Active Followup' },
  { bucket: '31 - 60 Days Overdue', amountINR: 680000.00, partyCount: 2, status: 'Notice Issued' },
  { bucket: '61 - 90 Days Overdue', amountINR: 210000.00, partyCount: 1, status: 'Broker Action' },
  { bucket: '90+ Days Overdue', amountINR: 90000.00, partyCount: 1, status: 'Critical / Disputed' },
];

export const MOCK_PARTNER_LEDGER = [
  { partnerName: 'Rajubhai Patel', capitalBalanceINR: 8540000.00, runningUpadINR: 350000.00, sharePercent: 40, status: 'Active Stakeholder' },
  { partnerName: 'Kalubhai Desai', capitalBalanceINR: 6420000.00, runningUpadINR: 420000.00, sharePercent: 30, status: 'Active Stakeholder' },
  { partnerName: 'Dipakbhai Bhayani', capitalBalanceINR: 6210000.00, runningUpadINR: 280000.00, sharePercent: 30, status: 'Active Stakeholder' },
];
