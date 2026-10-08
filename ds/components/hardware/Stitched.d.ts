/**
 * Fabric patch with inset topstitch; base for cards and panels.
 * @startingPoint section="Hardware" subtitle="Stitched fabric patch" viewport="700x260"
 */
export interface StitchedProps {
  surface?: 'bone' | 'denim' | 'dark' | 'washed' | 'leather' | 'paper';
  /** Stitch inset in px */
  inset?: number;
  thread?: string;
  /** Second parallel stitch line */
  double?: boolean;
  /** Brass rivets at the corners */
  rivets?: boolean;
  padding?: number | string;
  raised?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
export declare function Stitched(props: StitchedProps): JSX.Element;
