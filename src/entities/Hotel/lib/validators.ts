export const validateName = (value: string) => {
	if (!value || value.length < 0) return []
	if (value.length < 1) return ["Минимальная длина названия 1 символ."]
	if (value.length > 255) return ["Максимальная длина имени 255 символов."]
	return []
}

export const validateLocation = (value: string) => {
	if (!value || value.length < 0) return []
	if (value.length < 1) return ["Минимальная длина локации 1 символ."]
	if (value.length > 255) return ["Максимальная длина локации 255 символов."]
	return []
}

export const validateRating = (value?: number) => {
	if (!value) return []
	if (value < 0) return ["Минимальный рейтинг - 0."]
	if (value > 5) return ["Максимальный рейтинг - 5."]
	return []
}