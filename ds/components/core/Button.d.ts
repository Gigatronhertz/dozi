/**
 * Square-cornered tracked-caps button. On denim use `patch` (stitched bone) as primary and `thread` (dashed thread outline) as secondary.
 * @startingPoint section="Core" subtitle="Patch, thread, primary, secondary, inverse, ghost" viewport="700x300"
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'inverse' | 'ghost' | 'patch' | 'thread';
  size?: 'sm' | 'md' | 'lg';
  full?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
