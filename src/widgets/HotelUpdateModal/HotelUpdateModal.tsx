import classes from "./HotelUpdateModal.module.css";
import {Button} from "../../shared/ui/Button/Button.tsx";
import {Modal} from "../../shared/ui/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {eventBus, Hotel, UpdateHotelForm} from "../../entities/Hotel/index.ts";

export const HotelUpdateModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [editingHotel, setEditingHotel] = useState<Hotel>()

	useEffect(() => {
		const subscriptions = [
			eventBus.on('hotelUpdateRequested', (hotel) => {
				setEditingHotel(hotel)
				setIsOpen(true)
			}),
			eventBus.on('hotelUpdated', () => {
				setIsOpen(false)
			}),
		]

		return () => {
			subscriptions.forEach(unsubscribe => unsubscribe())
		}
	}, []);

	const handleClose = () => {
		setIsOpen(false)
	}

	if (!editingHotel) return null;

	return (
		isOpen && (
			<Modal onClose={handleClose}>
				<h1>Добавить отель</h1>
				<hr/>
				<UpdateHotelForm
					hotelId={editingHotel.id}
					initialData={editingHotel}
					onSubmit={handleClose}
				/>
				<div className={classes.buttonContainer}>
					<Button gray outline onClick={handleClose}>
						Отмена
					</Button>
				</div>
			</Modal>
		)
	)
}