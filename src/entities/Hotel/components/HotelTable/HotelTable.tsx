import {TableRow} from "../../../../shared/ui/Table/TableRow.tsx";
import {Button} from "../../../../shared/ui/Button/Button.tsx";
import {Table} from "../../../../shared/ui/Table/Table.tsx";
import {useEffect, useState} from "react";
import {Hotel} from "../../types.ts";
import {useHttpRequest} from "../../../../shared/hooks/useHttpRequest.ts";
import {getHotels as apiGetHotels} from "../../api/getHotels.ts";
import {eventBus} from "../../lib/eventBus.ts";
import {LoadingSpinner} from "../../../../shared/ui/LoadingSpinner/LoadingSpinner.tsx";

export const HotelTable = () => {
	const [hotels, setHotels] = useState<Hotel[]>([]);

	const [getHotels, isLoading] = useHttpRequest(async () => {
		return await apiGetHotels()
	})

	const handleLoad = async () => {
		const loadedHotels = await getHotels()
		setHotels(loadedHotels)
	}

	useEffect(() => {
		handleLoad()
	}, [])

	useEffect(() => {
		const subscriptions = [
			eventBus.on('hotelCreated', (newHotel) => {
				setHotels(prev => [...prev, newHotel])
			}),
			eventBus.on('hotelUpdated', (updatedHotel) => {
				setHotels(prev => prev.map(hotel => hotel.id === updatedHotel.id ? updatedHotel : hotel))
			}),
			eventBus.on('hotelDeleted', (deletedId) => {
				setHotels(prev => prev.filter(hotel => hotel.id !== deletedId))
			})
		]

		return () => {
			subscriptions.forEach(unsubscribe => unsubscribe())
		}
	}, [])

	return (
		<>
			{isLoading && <LoadingSpinner/>}

			{!isLoading && hotels && (
				<Table headers={["Название", "Локация", "Рейтинг", ""]}>
					{hotels.map((hotel) => (
						<TableRow
							key={hotel.id}
							columns={[hotel.name, hotel.location, hotel.rating.toString()]}
							extraColumn={[
								<Button
									link
									onClick={() => eventBus.emit("hotelDeleteRequested", hotel)}
									aria-label={`Удалить отель ${hotel.name}`}
								>Удалить</Button>,
								<Button
									link
									onClick={() => eventBus.emit("hotelUpdateRequested", hotel)}
									aria-label={`Изменить отель ${hotel.name}`}
								>Изменить</Button>
							]}
						/>
					))}
				</Table>
			)}

			{!isLoading && !hotels?.length && (
				<p>Нет данных об отелях</p>
			)}
		</>
	)
}