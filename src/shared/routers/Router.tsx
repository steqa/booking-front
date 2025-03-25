import {createBrowserRouter} from "react-router-dom";
import {MainPage} from "../../pages/MainPage/MainPage.tsx";
import {Paths} from "./Paths.tsx";
import {HotelPage} from "../../pages/HotelPage/HotelPage.tsx";

export const Router = createBrowserRouter([
	{
		path: Paths.Main,
		element: (<MainPage/>)
	},
	{
		path: Paths.Hotel,
		element: (<HotelPage/>)
	},
])
