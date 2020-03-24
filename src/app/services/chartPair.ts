export interface ChartPair {
    pair: string;
    last: number;
    chartData: ChartData[];
}

export interface ChartData {
    time: string;
    value: number;
}