import {CSSProperties, FC, ReactNode} from "react";
import classes from "./Button.module.css";

interface ButtonProps {
	type?: "button" | "submit";
	disabled?: boolean,
	outline?: boolean,
	link?: boolean,
	red?: boolean,
	gray?: boolean,
	onClick?: () => void,
	children: ReactNode,
	styles?: CSSProperties,
}

export const Button: FC<ButtonProps> = (
	{
		type = "button",
		disabled = false,
		outline = false,
		link = false,
		red = false,
		gray = false,
		onClick,
		children,
		styles
	}) => {
	const getClasses = () => {
		const classList = [classes.button]
		if (outline) classList.push(classes.outline)
		if (link) classList.push(classes.link)
		if (red) classList.push(classes.red)
		if (gray) classList.push(classes.gray)
		return classList.join(" ")
	}

	return (
		<button type={type} className={getClasses()} disabled={disabled} onClick={onClick}
		        style={styles}>{children}</button>
	)
}