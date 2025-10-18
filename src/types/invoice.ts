export interface Invoice {
  id: string;
  invoiceNumber: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientLogo?: string;
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  description?: string;
  items: InvoiceItem[];
  taxRate?: number;
  taxAmount?: number;
  subtotal: number;
  total: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  invoices: Invoice[];
  summary: {
    totalInvoices: number;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    overdueAmount: number;
    paidCount: number;
    pendingCount: number;
    overdueCount: number;
  };
}

export interface InvoiceResponse {
  success: boolean;
  message: string;
  data: InvoiceData;
}