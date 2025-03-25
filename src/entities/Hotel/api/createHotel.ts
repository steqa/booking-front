import axios from "axios";
import {Config} from "../../../shared/api/config.ts";
import {Hotel, HotelCreate} from "../types.ts";

export const createHotel = async (data: HotelCreate): Promise<Hotel> => {
	const response = await axios.post(
		Config.ApiUrls.Http + Config.ApiVersions.V1 + "/hotels",
		data
	)
	return response.data
}