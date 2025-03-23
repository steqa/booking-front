import classes from "./Modal.module.css"
import {FC, MouseEvent, ReactNode, useEffect} from "react";

interface ModalProps {
	children: ReactNode | ReactNode[],
	onClose: () => void,
}

export const Modal: FC<ModalProps> = ({children, onClose}) => {
	const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		document.documentElement.classList.add(classes.noInteraction);
		return () => {
			document.documentElement.classList.remove(classes.noInteraction);
		};
	}, []);

	return (
		<>
			<div className={classes.dimmer}/>
			<div className={classes.modal} onClick={handleClickOutside}>
				<div className={classes.body}>
					{children}
				</div>
			</div>
		</>
	)
}