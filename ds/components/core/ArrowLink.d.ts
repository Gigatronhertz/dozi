/** Text link with trailing arrow; for section CTAs like "Shop all →". */
export interface ArrowLinkProps { href?: string; children?: React.ReactNode; inverse?: boolean; onClick?: (e: React.MouseEvent) => void; style?: React.CSSProperties; }
export declare function ArrowLink(props: ArrowLinkProps): JSX.Element;
