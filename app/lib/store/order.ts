import { create } from 'zustand'
import produce from 'immer'

type OrderState = {
	toggles: Record<string, Record<number, boolean>>
	toggleStep: (params: { orderId: string; step: number }) => void
}

export const useOrderStore = create<OrderState>()(
	set => ({
		toggles: {},
		toggleStep: ({ orderId, step }) => set(
			produce<OrderState>(draft => {
				if (!draft.toggles[orderId]) {
					draft.toggles[orderId] = {}
				}

				draft.toggles[orderId][step] = !draft.toggles[orderId][step] ?? true
			})
		)
	})
)