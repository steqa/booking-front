import classes from "./Page.module.css"
import {Header} from "../components/header/Header.tsx";
import {useEffect} from "react";

export const PMain = () => {
	useEffect(() => {
		document.title = "Главная - Booking App";
	}, [])

	return (
		<div className={classes.container}>
			<Header/>

			<h1>Главная страница</h1>
		</div>
	)
}