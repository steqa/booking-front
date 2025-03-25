export interface Hotel {
	id: number,
	name: string,
	location: string,
	rating: number,
}

export interface HotelCreate {
	name: string,
	location: string,
	rating?: number,
}
