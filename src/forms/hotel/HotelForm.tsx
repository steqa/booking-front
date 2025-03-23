import {Input} from "../../components/input/Input.tsx";
import classes from "../Form.module.css";
import {Button} from "../../components/button/Button.tsx";
import {locationValidator, nameValidator, ratingValidator} from "./validators.ts";
import {useValidator} from "../../hooks/useValidator.ts";
import {NumberInput} from "../../components/input/NumberInput.tsx";
import {FC, useEffect, useState} from "react";
import {InputErrors} from "../../components/input-errors/InputErrors.tsx";
import {SHotelCreate} from "../../api/schemas/hotel/SHotelCreate.ts";

interface HotelFormProps {
	onSubmit?: (hotel: SHotelCreate) => void,
	initialData?: SHotelCreate,
	submitText?: string,
}

export const HotelForm: FC<HotelFormProps> = ({onSubmit, initialData, submitText = "Сохранить"}) => {
	const [name, setName, nameValid, nameEmpty, nameErrors] = useValidator<string>("", nameValidator)
	const [location, setLocation, locationValid, locationEmpty, locationErrors] = useValidator<string>("", locationValidator)
	const [rating, setRating, ratingValid, ratingEmpty, ratingErrors] = useValidator<number>(undefined, ratingValidator)

	const [btnDisabled, setBtnDisabled] = useState<boolean>(true)

	const onUpdate = () => {
		if (
			nameEmpty ||
			locationEmpty
		) {
			setBtnDisabled(true)
			return
		}

		if (
			(!nameEmpty && !nameValid) ||
			(!locationEmpty && !locationValid) ||
			(!ratingEmpty && !ratingValid)
		) {
			setBtnDisabled(true)
			return
		}

		setBtnDisabled(false)
	}

	const onSubmit_ = () => {
		if (
			nameValid &&
			locationValid &&
			ratingValid
		) {
			if (onSubmit) {
				onSubmit({
					name: name!,
					location: location!,
					rating: rating!,
				})
			}
		}
	}

	useEffect(() => {
		onUpdate()
	});

	useEffect(() => {
		if (initialData) {
			setName(initialData.name)
			setLocation(initialData.location)
			setRating(initialData.rating)
		}
	}, [initialData]);

	return (
		<div className={classes.formContainer}>
			<Input placeholder={"Название"} value={name} setValue={setName}/>
			{nameErrors.length > 0 && (<InputErrors errors={nameErrors}/>)}

			<Input placeholder={"Локация"} value={location} setValue={setLocation}/>
			{locationErrors.length > 0 && (<InputErrors errors={locationErrors}/>)}

			<NumberInput
				placeholder={"Рейтинг"}
				value={rating}
				setValue={setRating}
				min={0}
				max={5}
				step={0.1}
				digits={1}
			/>
			{ratingErrors.length > 0 && (<InputErrors errors={ratingErrors}/>)}

			<Button disabled={btnDisabled} onClick={() => onSubmit_()}>{submitText}</Button>
		</div>
	)
}
