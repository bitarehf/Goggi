export interface Stock {
    price: number;
    symbol: Symbol;
    lastUpdated: Date;
}

export enum Symbol {
    BTC,
    ISK,
    EUR,
    USD
}
