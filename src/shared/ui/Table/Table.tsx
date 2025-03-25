import {FC, ReactNode} from "react";
import classes from "./Table.module.css";

interface TableProps {
	headers: ReactNode[],
	children: ReactNode | ReactNode[],
}

export const Table: FC<TableProps> = ({headers, children}) => {
	return (
		<table className={classes.table}>
			<thead>
			<tr>
				{headers.map((header, index) => (
					<th key={index}>{header}</th>
				))}
			</tr>
			</thead>
			<tbody>
			{children}
			</tbody>
		</table>
	)
}
