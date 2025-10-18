export interface WalletCard {
  id: string;
  name: string;
  type: 'credit' | 'debit';
  cardNumber: string; // Full card number or masked number
  bank: string; // Bank name with brand
  network: 'Visa' | 'Mastercard' | 'American Express';
  expiryMonth: number;
  expiryYear: number;
  color: string; // Card color in hex format
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