export interface ScheduledTransfer {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status: 'scheduled' | 'processing' | 'completed' | 'cancelled';
}

export interface ScheduledTransfersData {
  transfers: ScheduledTransfer[];
  summary: {
    totalScheduledAmount: number;
    count: number;
  };
}

export interface ScheduledTransfersResponse {
  success: boolean;
  message: string;
  data: ScheduledTransfersData;
}