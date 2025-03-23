import {SHotel} from "../schemas/hotel/SHotel.ts";
import axios from "axios";
import {Config} from "./Config.ts";
import {SHotelCreate} from "../schemas/hotel/SHotelCreate.ts";

export class HotelRouter {
	private static readonly path: string = "/hotels";

	public static createHotel = async (data: SHotelCreate): Promise<SHotel> => {
		const response = await axios.post(
			Config.ApiUrls.Http + Config.ApiVersions.V1 + this.path,
			data
		)
		return response.data
	}

	public static getHotels = async (): Promise<SHotel[]> => {
		const response = await axios.get(
			Config.ApiUrls.Http + Config.ApiVersions.V1 + this.path
		)
		return response.data
	}

	public static updateHotel = async (id: number, data: SHotelCreate): Promise<SHotel> => {
		const response = await axios.put(
			Config.ApiUrls.Http + Config.ApiVersions.V1 + this.path + `/${id}`,
			data
		)
		return response.data
	}

	public static deleteHotel = async (id: number): Promise<void> => {
		const response = await axios.delete(
			Config.ApiUrls.Http + Config.ApiVersions.V1 + this.path + `/${id}`
		)
		return response.data
	}
}
