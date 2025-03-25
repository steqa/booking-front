import axios from "axios";
import {Config} from "../../../shared/api/config.ts";

export const deleteHotel = async (id: number): Promise<number> => {
	await axios.delete(
		Config.ApiUrls.Http + Config.ApiVersions.V1 + "/hotels" + `/${id}`
	)
	return id
}