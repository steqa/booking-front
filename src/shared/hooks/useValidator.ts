import {Dispatch, SetStateAction, useEffect, useState} from "react";

type ValidateCallback<T> = (value: T, extraValue?: T) => string[]

type UseValidateReturn<T> = [
		T | undefined,
	Dispatch<SetStateAction<T | undefined>>,
	boolean,
	boolean,
	string[],
	() => void
];

export const useValidator = <T>(
	defaultValue: T | undefined,
	validateFunc: ValidateCallback<T>,
	extraValue?: T
): UseValidateReturn<T> => {
	const [value, setValue] = useState<T | undefined>(defaultValue)
	const [errors, setErrors] = useState<string[]>([])
	const [isValid, setIsValid] = useState<boolean>(true)
	const [isEmpty, setIsEmpty] = useState<boolean>(true)

	const validate = () => {
		let errorsList = []
		if (value) {
			if (extraValue) errorsList = validateFunc(value, extraValue)
			else errorsList = validateFunc(value)
			setErrors(errorsList)
		}
		if (value == defaultValue) setIsEmpty(true)
		else setIsEmpty(false)

		if (errorsList.length > 0) setIsValid(false)
		else setIsValid(true)
	};

	useEffect(() => {
		validate()
	}, [value])

	return [value, setValue, isValid, isEmpty, errors, validate]
};
