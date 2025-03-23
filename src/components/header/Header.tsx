import {Navbar} from "../navbar/Navbar.tsx";
import classes from "./Header.module.css";
import {ThemeSwitcher} from "../theme-switcher/ThemeSwitcher.tsx";

export const Header = () => {
	return (
		<div className={classes.header}>
			<Navbar/>
			<ThemeSwitcher/>
		</div>
	)
}