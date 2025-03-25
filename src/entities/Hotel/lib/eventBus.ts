import {Hotel} from "../types.ts";

type EventType =
	"hotelCreated"
	| "hotelDeleted"
	| "hotelUpdated"
	| "hotelCreateRequested"
	| "hotelUpdateRequested"
	| "hotelDeleteRequested"

type EventPayload = {
	"hotelCreated": Hotel,
	"hotelDeleted": number, // Hotel id
	"hotelUpdated": Hotel,
	"hotelCreateRequested": void,
	"hotelUpdateRequested": Hotel,
	"hotelDeleteRequested": Hotel,
}

export const eventBus = {
	listeners: new Map<EventType, Set<(payload: EventPayload[EventType]) => void>>(),

	on<T extends EventType>(
		event: T,
		callback: (payload: EventPayload[T]) => void
	) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set())
		}
		const typedListeners = this.listeners.get(event) as Set<(payload: EventPayload[T]) => void>
		typedListeners.add(callback)
		return () => this.off(event, callback)
	},

	off<T extends EventType>(
		event: T,
		callback: (payload: EventPayload[T]) => void
	) {
		const typedListeners = this.listeners.get(event) as Set<(payload: EventPayload[T]) => void>
		typedListeners?.delete(callback)
	},

	emit<T extends EventType>(event: T, payload: EventPayload[T]) {
		const typedListeners = this.listeners.get(event) as Set<(payload: EventPayload[T]) => void>
		typedListeners?.forEach((callback) => {
			callback(payload)
		});
	},
};