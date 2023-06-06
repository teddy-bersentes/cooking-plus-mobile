import { MMKV } from "react-native-mmkv"
import { PersistStorage } from "zustand/middleware"

export const storage = new MMKV()

export function loadString(key: string): string | null {
	try {
		return storage.getString(key) || null
	} catch (error) {
		console.error(error)
		return null
	}
}

export function saveString(key: string, value: string): boolean {
	try {
		storage.set(key, value)
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export function load(key: string): any | null {
	try {
		const data = storage.getString(key);
		if (!data) return null
		return JSON.parse(data);
	} catch (error) {
		console.error(error)
		return null
	}
}

export function save(key: string, value: any): boolean {
	try {
		saveString(key, JSON.stringify(value));
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export function remove(key: string): void {
	try {
		storage.delete(key);
	} catch (error) {
		console.error(error)
	}
}

export function clear(): void {
	try {
		storage.clearAll();
	} catch (error) {
		console.error(error)
	}
}


export const zustandPersist: <T>() => PersistStorage<T> = () => {
	return {
		getItem: (key: string) => load(key),
		removeItem: (key: string) => remove(key),
		// cast to any to satisfy void return type
		setItem: (key, value) => save(key, value) as any
	}
}