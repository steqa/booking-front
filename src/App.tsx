import {RouterProvider} from "react-router-dom";
import {Router} from "./shared/routers/Router.tsx";

export const App = () => {
	return (
		<RouterProvider router={Router}/>
	)
}
