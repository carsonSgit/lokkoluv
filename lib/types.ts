export interface BehobenPiece {
	id: string;
	piece_number: number;
	title: string;
	year: number;
	image_filename: string;
	display_order: number;
	size: string | null;
	mediums: string | null;
	techniques: string | null;
	surface: string | null;
}
