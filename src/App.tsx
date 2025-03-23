import {RouterProvider} from "react-router-dom";
import {Router} from "./routers/Router.tsx";

export const App = () => {
	return (
		<RouterProvider router={Router}/>
	)
}
