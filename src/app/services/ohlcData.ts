export interface OhlcData {
    pair: string;
    last: number;
    ohlcChart: OhlcChart[];
}

export interface OhlcChart {
    x: number;
    y: number[];
}