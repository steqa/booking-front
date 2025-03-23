import {NavLink} from "react-router-dom";
import classes from "./Navbar.module.css";
import {Paths} from "../../routers/Paths.tsx";

export const Navbar = () => {
	return (
		<div className={classes.navbar}>
			<NavLink to={Paths.Main}>Главная</NavLink>
			<NavLink to={Paths.Hotel}>Отели</NavLink>
		</div>
	)
}