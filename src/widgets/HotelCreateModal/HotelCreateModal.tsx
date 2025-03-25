import classes from "./HotelCreateModal.module.css";
import {Button} from "../../shared/ui/Button/Button.tsx";
import {Modal} from "../../shared/ui/Modal/Modal.tsx";
import {useEffect, useState} from "react";
import {CreateHotelForm, eventBus} from "../../entities/Hotel/index.ts";

export const HotelCreateModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const subscriptions = [
			eventBus.on('hotelCreateRequested', () => {
				setIsOpen(true)
			}),
			eventBus.on('hotelCreated', () => {
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

	return (
		isOpen && (
			<Modal onClose={handleClose}>
				<h1>Добавить отель</h1>
				<hr/>
				<CreateHotelForm onSubmit={handleClose}/>
				<div className={classes.buttonContainer}>
					<Button gray outline onClick={handleClose}>
						Отмена
					</Button>
				</div>
			</Modal>
		)
	)
}