/**
 * Garment-hardware line icon set with hover animations.
 * Names: zip, buckle, pin, stitch, rivet, button, needle, hanger, tag, scissors.
 */
export interface FashionIconProps {
  name?: 'zip' | 'buckle' | 'pin' | 'stitch' | 'rivet' | 'button' | 'needle' | 'hanger' | 'tag' | 'scissors';
  size?: number;
  stroke?: number;
  color?: string;
  /** 'hover' animates on its own hover; 'always' loops; false = static */
  animate?: 'hover' | 'always' | false;
  /** Force the animation on (e.g. when a parent nav item is hovered) */
  active?: boolean;
  title?: string;
  style?: React.CSSProperties;
}
export declare function FashionIcon(props: FashionIconProps): JSX.Element;
export declare const FASHION_ICON_NAMES: string[];
