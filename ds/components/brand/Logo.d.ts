/** DOZI brand mark, traced vector. */
export interface LogoProps {
  /** lockup = stacked leaf + wordmark; symbol = leaf only; wordmark = DOZI letters */
  variant?: 'lockup' | 'symbol' | 'wordmark';
  /** Any CSS colour; defaults to currentColor */
  color?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
  /** Render as a dashed thread outline (embroidered/topstitched mark) */
  stitched?: boolean;
  /** Stroke width in viewBox units when stitched */
  strokeWidth?: number;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
