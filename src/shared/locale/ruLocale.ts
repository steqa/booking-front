const ru = new Map<string, string>();

ru.set(
	"Network Error",
	"Ошибка. Проверьте подключение к интернету."
)

ru.set(
	"Unsupported Media Type",
	"Ошибка. Проверьте подключение к интернету."
)

ru.set(
	"Validation Error",
	"Ошибка. Проверьте правильность введенных данных."
);

export const ruLocale = (str: string): string => {
	return ru.get(str) ?? str;
}