/** Native select styled as an underline field; `inverse` = dashed thread underline on denim. */
export interface SelectProps { label?: string; value?: string; onChange?: (v: string) => void; options?: (string | { value: string; label: string })[]; inverse?: boolean; style?: React.CSSProperties; }
export declare function Select(props: SelectProps): JSX.Element;
