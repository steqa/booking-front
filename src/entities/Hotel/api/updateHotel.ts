import axios from "axios";
import {Config} from "../../../shared/api/config.ts";
import {Hotel, HotelCreate} from "../types.ts";

export const updateHotel = async (id: number, data: HotelCreate): Promise<Hotel> => {
	const response = await axios.put(
		Config.ApiUrls.Http + Config.ApiVersions.V1 + "/hotels" + `/${id}`,
		data
	)
	return response.data
}