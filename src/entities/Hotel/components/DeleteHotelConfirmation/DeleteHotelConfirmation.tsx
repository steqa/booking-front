import classes from "./DeleteHotelConfirmation.module.css"
import {Button} from "../../../../shared/ui/Button/Button.tsx";
import {FC, FormEvent} from "react";
import {useHttpRequest} from "../../../../shared/hooks/useHttpRequest.ts";
import {deleteHotel as apiDeleteHotel} from "../../api/deleteHotel.ts";
import {Hotel} from "../../types.ts";
import {eventBus} from "../../lib/eventBus.ts";

interface DeleteHotelConfirmationProps {
	hotelId: number,
	data: Hotel,
}

export const DeleteHotelConfirmation: FC<DeleteHotelConfirmationProps> = ({hotelId, data}) => {

	const [deleteHotel, isLoading, , resetError] = useHttpRequest(async (id: number) => {
		return await apiDeleteHotel(id)
	})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		resetError();
		const deletedHotel = await deleteHotel(hotelId);

		if (deletedHotel) {
			eventBus.emit("hotelDeleted", deletedHotel);
		}
	}

	return (
		<form onSubmit={handleSubmit} className={classes.formContainer}>
			<p className={classes.content}>
				Вы действительно хотите безвозвратно удалить отель {data.name}?
			</p>

			<Button type="submit" disabled={isLoading}>
				{isLoading ? 'Удаление...' : 'Удалить отель'}
			</Button>
		</form>
	)
}
