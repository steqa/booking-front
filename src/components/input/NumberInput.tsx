import {ChangeEvent, FC} from "react";
import classes from "./Input.module.css";

interface NumberInputProps {
	min?: number;
	max?: number;
	step?: number;
	digits?: number;
	placeholder: string;
	value: number | undefined;
	setValue: (value: number | undefined) => void;
}

export const NumberInput: FC<NumberInputProps> = (
	{
		min,
		max,
		step,
		digits = 16,
		placeholder,
		value,
		setValue
	}) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		const regex = new RegExp(`^\\d*\\.?\\d{0,${digits}}$`)

		if (!newValue) {
			setValue(undefined)
			return
		}

		if (regex.test(newValue)) {
			const parsedValue = parseFloat(newValue)
			if (min !== undefined && parsedValue < min) {
				setValue(min)
			} else if (max !== undefined && parsedValue > max) {
				setValue(max)
			} else {
				setValue(parsedValue)
			}
		}
	}

	return (
		<input
			className={classes.input}
			type="number"
			min={min}
			max={max}
			step={step}
			placeholder={placeholder}
			value={value !== undefined ? value : ""}
			onChange={handleChange}
		/>
	)
}
