import {Input} from "../../../../shared/ui/Input/Input.tsx";
import classes from "./UpdateHotelForm.module.css";
import {Button} from "../../../../shared/ui/Button/Button.tsx";
import {useValidator} from "../../../../shared/hooks/useValidator.ts";
import {NumberInput} from "../../../../shared/ui/Input/NumberInput.tsx";
import {FC, FormEvent, useEffect} from "react";
import {InputErrors} from "../../../../shared/ui/InputErrors/InputErrors.tsx";
import {useHttpRequest} from "../../../../shared/hooks/useHttpRequest.ts";
import {updateHotel as apiUpdateHotel} from "../../api/updateHotel.ts";
import {validateLocation, validateName, validateRating} from "../../lib/validators.ts";
import {Hotel, HotelCreate} from "../../types.ts";
import {eventBus} from "../../lib/eventBus.ts";

interface UpdateHotelFormProps {
	hotelId: number,
	initialData: Hotel,
	onSubmit?: () => void,
}

export const UpdateHotelForm: FC<UpdateHotelFormProps> = ({hotelId, initialData, onSubmit}) => {
	const [name, setName, nameValid, nameEmpty, nameErrors] = useValidator<string>("", validateName)
	const [location, setLocation, locationValid, locationEmpty, locationErrors] = useValidator<string>("", validateLocation)
	const [rating, setRating, ratingValid, ratingEmpty, ratingErrors] = useValidator<number>(undefined, validateRating)

	const formValid =
		!nameEmpty && !locationEmpty &&
		nameValid && locationValid &&
		(ratingEmpty || ratingValid);


	const [updateHotel, isLoading, , resetError] = useHttpRequest(async (id: number, data: HotelCreate) => {
		return await apiUpdateHotel(id, data)
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!formValid || !name || !location) return

		resetError();
		const updatedHotel = await updateHotel(hotelId, {
			name: name,
			location: location,
			rating: rating,
		});

		if (updatedHotel) {
			eventBus.emit("hotelUpdated", updatedHotel);
			setName("");
			setLocation("");
			setRating(undefined);
		}

		if (onSubmit) onSubmit()
	}

	useEffect(() => {
		if (initialData.name) setName(initialData.name)
		if (initialData.location) setLocation(initialData.location)
		if (initialData.rating) setRating(initialData.rating)
	}, []);

	return (
		<form onSubmit={handleSubmit} className={classes.formContainer}>
			<Input
				placeholder={"Название"}
				value={name}
				setValue={setName}
			/>
			{nameErrors.length > 0 && (<InputErrors errors={nameErrors}/>)}

			<Input
				placeholder={"Локация"}
				value={location}
				setValue={setLocation}
			/>
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

			<Button type="submit" disabled={!formValid || isLoading}>
				{isLoading ? 'Обновление...' : 'Обновить отель'}
			</Button>
		</form>
	)
}
