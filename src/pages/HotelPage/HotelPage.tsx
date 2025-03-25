import {useEffect} from "react";
import {Header} from "../../widgets/Header/Header.tsx";
import {HotelUpdateModal} from "../../widgets/HotelUpdateModal/HotelUpdateModal.tsx";
import {Button} from "../../shared/ui/Button/Button.tsx";
import {HotelCreateModal} from "../../widgets/HotelCreateModal/HotelCreateModal.tsx";
import {HotelDeleteModal} from "../../widgets/HotelDeleteModal/HotelDeleteModal.tsx";
import {Container} from "../../shared/ui/Container/Container.tsx";
import {eventBus, HotelTable} from "../../entities/Hotel/index.ts";

export const HotelPage = () => {
	useEffect(() => {
		document.title = "Отели - Booking App";
	}, [])

	return (
		<Container>
			<Header pageName={"Отели"}/>

			<HotelTable/>
			<HotelUpdateModal/>
			<HotelCreateModal/>
			<HotelDeleteModal/>

			<Button
				styles={{marginTop: "auto"}}
				onClick={() => eventBus.emit("hotelCreateRequested", undefined)}
			>
				Добавить отель
			</Button>
		</Container>
	)
}