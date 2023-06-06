export const abbreviate = (name: string): string => {
	const initials = name.match(/\b\w/g) || [];
	if (initials.length === 1) { return name.substring(0, 2).toUpperCase() }
	return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
}