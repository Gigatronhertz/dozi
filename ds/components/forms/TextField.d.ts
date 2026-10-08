/** Underline-only text input with caps label. */
export interface TextFieldProps { label?: string; value?: string; onChange?: (v: string) => void; placeholder?: string; type?: string; error?: string; inverse?: boolean; style?: React.CSSProperties; }
export declare function TextField(props: TextFieldProps): JSX.Element;
