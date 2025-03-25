import axios from "axios";
import {Config} from "../../../shared/api/config.ts";
import {Hotel} from "../types.ts";

export const getHotels = async (): Promise<Hotel[]> => {
	const response = await axios.get(
		Config.ApiUrls.Http + Config.ApiVersions.V1 + "/hotels"
	)
	return response.data
}