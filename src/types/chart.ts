export interface WorkingCapitalData {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface WorkingCapitalResponse {
  success: boolean;
  message: string;
  data: {
    period: string;
    currency: string;
    data: WorkingCapitalData[];
    summary: {
      totalIncome: number;
      totalExpense: number;
      netBalance: number;
    };
  };
}

export interface Transaction {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    summary: {
      totalIncome: number;
      totalExpense: number;
      count: number;
    };
  };
}