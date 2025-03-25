import {FC, ReactNode} from "react";
import classes from "./Table.module.css";

interface TableRowProps {
	columns: ReactNode[],
	extraColumn?: ReactNode[],
}

export const TableRow: FC<TableRowProps> = ({columns, extraColumn}) => {
	return (
		<tr>
			{columns.map((column, index) => (
				<td key={index}>{column}</td>
			))}
			{extraColumn && (
				<td className={classes.extraColumn}>
					<div>{extraColumn}</div>
				</td>
			)}
		</tr>
	)
}