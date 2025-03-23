import {createBrowserRouter} from "react-router-dom";
import {PMain} from "../pages/PMain.tsx";
import {PHotel} from "../pages/hotel/PHotel.tsx";
import {Paths} from "./Paths.tsx";

export const Router = createBrowserRouter([
	{
		path: Paths.Main,
		element: (<PMain/>)
	},
	{
		path: Paths.Hotel,
		element: (<PHotel/>)
	},
])
