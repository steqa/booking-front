import {ChangeEvent, FC} from "react";
import classes from "./Input.module.css";

interface InputProps {
	type?: string;
	placeholder: string;
	value: string | undefined;
	setValue: (value: string) => void;
}

export const Input: FC<InputProps> = ({type = "text", placeholder, value, setValue}) => {
	return (
		<input
			className={classes.input}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={(e: ChangeEvent<HTMLInputElement>) => {
				setValue(e.target.value)
			}}
		/>
	)
}
