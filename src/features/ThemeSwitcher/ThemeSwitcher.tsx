import {Button} from "../../shared/ui/Button/Button.tsx";
import {useEffect} from "react";

export const ThemeSwitcher = () => {
	const toggleTheme = () => {
		const html = document.documentElement;
		const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
		html.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		document.documentElement.setAttribute("data-theme", savedTheme);
	}, [])

	return (
		<Button gray outline onClick={toggleTheme}>Сменить тему</Button>
	)
}