import {Navbar} from "../../shared/ui/Navbar/Navbar.tsx";
import classes from "./Header.module.css";
import {ThemeSwitcher} from "../../features/ThemeSwitcher/ThemeSwitcher.tsx";
import {FC} from "react";

interface HeaderProps {
	pageName?: string,
}

export const Header: FC<HeaderProps> = ({pageName}) => {
	return (
		<div className={classes.header}>
			<div className={classes.left}>
				<Navbar/>
				<h1>{pageName}</h1>
			</div>
			<ThemeSwitcher/>
		</div>
	)
}