export interface FinancialSummary {
  totalBalance: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: 'up' | 'down';
    };
  };
  totalExpense: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: 'up' | 'down';
    };
  };
  totalSavings: {
    amount: number;
    currency: string;
    change: {
      percentage: number;
      trend: 'up' | 'down';
    };
  };
  lastUpdated: string;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: FinancialSummary;
}