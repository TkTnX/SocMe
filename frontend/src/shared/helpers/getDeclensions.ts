export function getDeclensions(values: string[], number: number) {
	const value = Math.abs(number) % 100
	const num = value % 10

	if (value > 10 && value < 20) return values[2]

	if (num > 1 && num < 5) return values[1]

	if (num === 1) return values[0]
	return values[2]
}
