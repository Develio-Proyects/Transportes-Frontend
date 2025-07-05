import { create } from "zustand"

export const useModalStore = create((set) => ({
    modal: null, 

    openModal: (type, props = {}) => set({ modal: { type, props } }),
    closeModal: () => set({ modal: null }),
}))