/**
 * Product tile as a stitched bone patch with rivets; lifts and tilts on hover.
 * @startingPoint section="Commerce" subtitle="Stitched product patch" viewport="700x460"
 */
export interface ProductCardProps { image: string; hoverImage?: string; name: string; detail?: string; price?: number; from?: boolean; tag?: string; onClick?: () => void; ratio?: string; /** resting rotation in deg */ tilt?: number; }
export declare function ProductCard(props: ProductCardProps): JSX.Element;
