import {FC} from "react";
import classes from "./InputErrors.module.css";

interface InputProps {
	errors: string[],
}

export const InputErrors: FC<InputProps> = (
	{
		errors,
	}
) => {
	return (
		<div className={classes.error}>
			{errors.map((error, index) => (
				<span key={index}>{error}</span>
			))}
		</div>
	)
}
