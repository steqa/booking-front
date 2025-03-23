import {useEffect, useState} from "react";
import {SHotel} from "../../api/schemas/hotel/SHotel.ts";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import {HotelRouter} from "../../api/routers/HotelRouter.ts";
import {Table} from "../../components/table/Table.tsx";
import {TableRow} from "../../components/table/TableRow.tsx";
import {LoadingSpinner} from "../../components/loading/spinner/LoadingSpinner.tsx";
import {Button} from "../../components/button/Button.tsx";
import {Modal} from "../../components/modal/Modal.tsx";
import {HotelForm} from "../../forms/hotel/HotelForm.tsx";
import pageClasses from "../Page.module.css"
import classes from "./PHotel.module.css"
import {SHotelCreate} from "../../api/schemas/hotel/SHotelCreate.ts";
import {Header} from "../../components/header/Header.tsx";

export const PHotel = () => {
	const [hotels, setHotels] = useState<SHotel[]>([])

	const [createModalVisible, setCreateModalVisible] = useState(false)

	const [updateModalVisible, setUpdateModalVisible] = useState(false)
	const [hotelToUpdate, setHotelToUpdate] = useState<SHotel>()

	const [deleteModalVisible, setDeleteModalVisible] = useState(false)
	const [hotelToDelete, setHotelToDelete] = useState<SHotel>()


	const [createHotel, createHotelsError] = useHttpRequest(async (data: SHotelCreate) => {
			const responseHotel: SHotel = await HotelRouter.createHotel(data)
			setHotels([...hotels, responseHotel])
		}
	)

	const [getHotels, isGetHotelsLoading, getHotelsError] = useHttpRequest(async () => {
			const responseHotels: SHotel[] = await HotelRouter.getHotels()
			setHotels([...responseHotels])
		}
	)

	const [updateHotel, updateHotelsError] = useHttpRequest(async (id: number, data: SHotelCreate) => {
			const responseHotel: SHotel = await HotelRouter.updateHotel(id, data)
			const newHotels = []
			for (let i = 0; i < hotels.length; i++) {
				if (hotels[i].id !== responseHotel.id) newHotels.push(hotels[i])
				else newHotels.push(responseHotel)
			}
			setHotels(newHotels)
		}
	)

	const [deleteHotel, deleteHotelsError] = useHttpRequest(async (id: number) => {
			await HotelRouter.deleteHotel(id)
			const newHotels = []
			for (let i = 0; i < hotels.length; i++) {
				if (hotels[i].id !== id) newHotels.push(hotels[i])
			}
			setHotels(newHotels)
		}
	)

	useEffect(() => {
		getHotels()
		document.title = "Отели - Booking App";
	}, [])

	return (
		<div className={pageClasses.container}>
			<Header/>

			<h1>Отели</h1>

			{getHotelsError || createHotelsError || deleteHotelsError || updateHotelsError && (
				<>
					<p>{getHotelsError}</p>
					<p>{createHotelsError}</p>
					<p>{deleteHotelsError}</p>
					<p>{updateHotelsError}</p>
				</>
			)}

			<div className={classes.tableContainer}>
				<Table headers={["Название", "Локация", "Рейтинг", ""]}>
					{hotels && hotels.map((hotel, index) => (
						<TableRow
							key={index}
							columns={[hotel.name, hotel.location, hotel.rating]}
							extraColumn={[
								<Button link onClick={() => {
									setHotelToDelete(hotel)
									setDeleteModalVisible(true)
								}}>Удалить</Button>,
								<Button link onClick={() => {
									setHotelToUpdate(hotel)
									setUpdateModalVisible(true)
								}}>Изменить</Button>
							]}
						/>
					))}
				</Table>

				{isGetHotelsLoading && (
					<LoadingSpinner/>
				)}
			</div>

			{createModalVisible && (
				<Modal onClose={() => setCreateModalVisible(false)}>
					<h1>Добавить отель</h1>
					<hr/>
					<HotelForm submitText={"Добавить"} onSubmit={(data: SHotelCreate) => {
						createHotel(data)
						setCreateModalVisible(false)
					}}/>
					<div className={classes.modalButtonGroup}>
						<Button gray outline onClick={() => {
							setCreateModalVisible(false)
						}}>Отмена</Button>
					</div>
				</Modal>
			)}

			{updateModalVisible && (
				<Modal onClose={() => setUpdateModalVisible(false)}>
					<h1>Изменить отель</h1>
					<hr/>
					<HotelForm submitText={"Обновить"} initialData={hotelToUpdate} onSubmit={(data: SHotelCreate) => {
						updateHotel(hotelToUpdate!.id, data)
						setUpdateModalVisible(false)
					}}/>
					<div className={classes.modalButtonGroup}>
						<Button gray outline onClick={() => {
							setUpdateModalVisible(false)
						}}>Отмена</Button>
					</div>
				</Modal>
			)}

			{deleteModalVisible && (
				<Modal onClose={() => setDeleteModalVisible(false)}>
					<h1>Подтвердите удаление</h1>
					<hr/>
					<p className={classes.modalDescription}>
						Вы действительно хотите безвозвратно удалить отель {hotelToDelete!.name}?
					</p>
					<div className={classes.modalButtonGroup}>
						<Button outline red onClick={() => {
							deleteHotel(hotelToDelete!.id)
							setDeleteModalVisible(false)
						}}>Удалить</Button>
						<Button gray outline onClick={() => {
							setDeleteModalVisible(false)
						}}>Отмена</Button>
					</div>
				</Modal>
			)}

			<Button styles={{marginTop: "auto"}} onClick={() => setCreateModalVisible(true)}>Добавить отель</Button>
		</div>
	)
}