export interface Stock {
    price: number;
    symbol: Symbol;
}

export enum Symbol {
    BTC,
    ISK,
    EUR,
    USD
}