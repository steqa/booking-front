import classes from "./HotelDeleteModal.module.css";
import {Button} from "../../shared/ui/Button/Button.tsx";
import {Modal} from "../../shared/ui/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {DeleteHotelConfirmation, eventBus, Hotel} from "../../entities/Hotel/index.ts";

export const HotelDeleteModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [deletingHotel, setDeletingHotel] = useState<Hotel>()

	useEffect(() => {
		const subscriptions = [
			eventBus.on('hotelDeleteRequested', (hotel) => {
				setDeletingHotel(hotel)
				setIsOpen(true)
			}),
			eventBus.on('hotelDeleted', () => {
				setIsOpen(false)
			}),
		]

		return () => {
			subscriptions.forEach(unsubscribe => unsubscribe())
		}
	}, [])

	const handleClose = () => {
		setIsOpen(false)
	}

	if (!deletingHotel) return null;

	return (
		isOpen && (
			<Modal onClose={handleClose}>
				<h1>Подтвердите удаление</h1>
				<hr/>
				<DeleteHotelConfirmation hotelId={deletingHotel.id} data={deletingHotel}/>
				<div className={classes.buttonContainer}>
					<Button gray outline onClick={handleClose}>
						Отмена
					</Button>
				</div>
			</Modal>
		)
	)
}