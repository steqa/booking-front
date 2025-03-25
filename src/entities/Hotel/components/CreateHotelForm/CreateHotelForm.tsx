import {Input} from "../../../../shared/ui/Input/Input.tsx";
import classes from "./CreateHotelForm.module.css";
import {Button} from "../../../../shared/ui/Button/Button.tsx";
import {useValidator} from "../../../../shared/hooks/useValidator.ts";
import {NumberInput} from "../../../../shared/ui/Input/NumberInput.tsx";
import {FC, FormEvent} from "react";
import {InputErrors} from "../../../../shared/ui/InputErrors/InputErrors.tsx";
import {useHttpRequest} from "../../../../shared/hooks/useHttpRequest.ts";
import {createHotel as apiCreateHotel} from "../../api/createHotel.ts";
import {validateLocation, validateName, validateRating} from "../../lib/validators.ts";
import {HotelCreate} from "../../types.ts";
import {eventBus} from "../../lib/eventBus.ts";

interface CreateHotelFormProps {
	onSubmit?: () => void,
}

export const CreateHotelForm: FC<CreateHotelFormProps> = ({onSubmit}) => {
	const [name, setName, nameValid, nameEmpty, nameErrors] = useValidator<string>("", validateName)
	const [location, setLocation, locationValid, locationEmpty, locationErrors] = useValidator<string>("", validateLocation)
	const [rating, setRating, ratingValid, ratingEmpty, ratingErrors] = useValidator<number>(undefined, validateRating)

	const formValid =
		!nameEmpty && !locationEmpty &&
		nameValid && locationValid &&
		(ratingEmpty || ratingValid);

	const [createHotel, isLoading, , resetError] = useHttpRequest(async (data: HotelCreate) => {
		return await apiCreateHotel(data)
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!formValid || !name || !location) return

		resetError();
		const createdHotel = await createHotel({
			name: name,
			location: location,
			rating: rating,
		});

		if (createdHotel) {
			eventBus.emit("hotelCreated", createdHotel);
			setName("");
			setLocation("");
			setRating(undefined);
		}

		if (onSubmit) onSubmit()
	}

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
				{isLoading ? 'Создание...' : 'Создать отель'}
			</Button>
		</form>
	)
}
