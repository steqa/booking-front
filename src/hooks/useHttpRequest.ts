import {useState} from "react";
import {ruLocale} from "../api/locale/ruLocale.ts";

type UseHttpRequest<T extends unknown[], R> = [
	request: (...args: T) => Promise<R>,
	isLoading: boolean,
	error: string | null,
	resetError: () => void,
];

export const useHttpRequest = <T extends unknown[], R>(
	callback: (...args: T) => Promise<R>
): UseHttpRequest<T, R> => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const request = async (...args: T): Promise<R> => {
		try {
			setIsLoading(true)
			return await callback(...args)
		} catch (e) {
			if (e && typeof e === "object") {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				if (e.response) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					setError(ruLocale(e.response.data.message))
				}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				setError(ruLocale(e.message))
			}
			throw e;
		} finally {
			setIsLoading(false)
		}
	}

	const resetError = () => {
		setError(null)
	}

	return [request, isLoading, error, resetError]
}
