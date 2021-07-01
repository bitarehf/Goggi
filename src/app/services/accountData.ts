export class AccountData {
    id: string;
    withdrawalAddress: string;
    bankAccountNumber: string;
    derivation: number;
    fee: number;
    balance: number;
    transactions: Transaction[];
    marketTransactions: MarketTransaction[];
    knowYourCustomers: KnowYourCustomer[];
}

export class Transaction {
  id: number;
  personalId: string;
  time: string;
  reference: string;
  shortReference: string;
  paymentDetail: string;
  amount: number;
}

export class MarketTransaction {
  id: number;
  personalId: string;
  time: string;
  rate: number;
  fee: number;
  coins: number;
  amount: number;
  txId: string;
  balance: number;
  type: TransactionType;
  status: TransactionStatus;
}

export class KnowYourCustomer {
  id?: number;
  personalId?: string;
  occupation: string;
  originOfFunds: string;
  ownerOfFunds: boolean;
  time?: string;
}

export enum TransactionType {
  Buy,
  Sell,
  Deposit,
  Withdrawal
}

export enum TransactionStatus {
  Completed,
  Pending,
  Rejected,
  Failed
}