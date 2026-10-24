export type BranchCode = 'ALL' | 'SURAT' | 'MUMBAI';

export interface BranchInfo {
  code: BranchCode;
  name: string;
  location: string;
  description: string;
}

export interface KapanSimData {
  katWeight: number; // Raw Kat Weight (Carats)
  roughRatePerCarat: number; // USD per carat
  dollarRate: number; // INR per USD
  targetYieldPercent: number; // Expected Polish Yield %
  majuriPerCarat: number; // Worker Wages per carat in INR
  rejectionPercent: number; // Rejections %
  rejectionRatePerCarat: number; // USD per carat for rejection
}

export interface CalculatedKapanResult {
  polishedCarats: number;
  rejectionCarats: number;
  ghatLossCarats: number;
  roughCostINR: number;
  totalLabourINR: number;
  rejectionRecoveryINR: number;
  netProductionCostINR: number;
  costPerPolishedCaratINR: number;
  costPerPolishedCaratUSD: number;
}

export interface TradeCalculationParams {
  carats: number;
  rateUSD: number;
  dollarRate: number;
  lessPercent: number;
  dalaliPercent: number;
}

export interface TradeCalculationResult {
  grossUSD: number;
  baseINR: number;
  lessFactor: number;
  discountedINR: number;
  dalaliINR: number;
  netPayableINR: number;
}

export interface SchemaTableMeta {
  tableName: string;
  domain: string;
  purpose: string;
  primaryKey: string;
  foreignKeys: string[];
  keyFields: string[];
}

export interface LexiconEntry {
  gujarati: string;
  transliteration: string;
  englishConcept: string;
  businessRole: string;
  category: 'Material' | 'Production' | 'Commercial' | 'Accounts';
}
