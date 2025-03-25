import {Header} from "../../widgets/Header/Header.tsx";
import {useEffect} from "react";
import {Container} from "../../shared/ui/Container/Container.tsx";

export const MainPage = () => {
	useEffect(() => {
		document.title = "Главная - Booking App";
	}, [])

	return (
		<Container>
			<Header pageName={"Главная"}/>
		</Container>
	)
}