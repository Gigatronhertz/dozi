/** Round fabric swatch (twill texture over the colour) — the only rounded element in DOZI UI. */
export interface SwatchProps { color: string; label?: string; selected?: boolean; onClick?: () => void; size?: number; inverse?: boolean; }
export declare function Swatch(props: SwatchProps): JSX.Element;
export interface SwatchOption { value: string; label: string; color: string; }
export interface SwatchGroupProps { options: SwatchOption[]; value?: string; onChange?: (v: string) => void; showLabel?: boolean; inverse?: boolean; }
export declare function SwatchGroup(props: SwatchGroupProps): JSX.Element;
