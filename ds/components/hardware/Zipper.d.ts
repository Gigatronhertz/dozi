/**
 * Draggable zip that reveals a section. Click or Enter auto-unzips.
 * @startingPoint section="Hardware" subtitle="Unzip-to-reveal section" viewport="700x420"
 */
export interface ZipperProps {
  /** Small caps label on the top flap, e.g. "The edit" */
  label?: string;
  /** Optional serif title on the top flap (ignored when compact) */
  title?: string;
  /** Hint on the bottom flap */
  hint?: string;
  /** Closed height in px (default 220; use ~64 with compact) */
  coverHeight?: number;
  /** CSS background for the flaps, default var(--fabric-denim-dark) */
  fabric?: string;
  /** Single-line accordion style */
  compact?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  /** Tooth spacing in px */
  pitch?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Zipper(props: ZipperProps): JSX.Element;
