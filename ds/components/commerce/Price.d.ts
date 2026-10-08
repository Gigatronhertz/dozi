/** Naira price, e.g. ₦92,000; "from" prefix for configurable bases. */
export interface PriceProps { amount: number; from?: boolean; style?: React.CSSProperties; }
export declare function Price(props: PriceProps): JSX.Element;
export declare function formatNaira(n: number): string;
