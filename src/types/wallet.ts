export interface WalletCard {
  id: string;
  name: string;
  type: 'credit' | 'debit';
  cardNumber: string;
  bank: string; 
  network: 'Visa' | 'Mastercard' | 'American Express';
  expiryMonth: number;
  expiryYear: number;
  color: string; 
  isDefault: boolean;
}

export interface WalletData {
  cards: WalletCard[];
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: WalletData;
}