/** Selectable option for size, fit, collar, sleeve, attachment. `inverse` for denim grounds (dashed thread outline; selected = stitched bone patch). */
export interface OptionChipProps { children?: React.ReactNode; selected?: boolean; disabled?: boolean; onClick?: () => void; meta?: React.ReactNode; icon?: React.ReactNode; inverse?: boolean; }
export declare function OptionChip(props: OptionChipProps): JSX.Element;
