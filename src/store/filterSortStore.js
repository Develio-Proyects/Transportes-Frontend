import { create } from "zustand"

export const useFilterSortStore = create((set, get) => ({
    filters: {},
    sorts: {},

    setFilter: (scope, key, value) => {
        set((state) => ({
        filters: {
            ...state.filters,
            [scope]: {
                ...state.filters[scope],
                [key]: value
            }
        }
        }))
    },

    setSort: (scope, { field, direction }) => {
        set((state) => ({
            sorts: {
                ...state.sorts,
                [scope]: { field, direction }
            }
        }))
    },

    getScopeFilters: (scope) => get().filters[scope] || null,
    
    getScopeSort: (scope) => get().sorts[scope] || null,

    clearFilters: (scope) => {
        const { [scope]: _, ...rest } = get().filters
        set({ filters: rest })
    },

    clearSort: (scope) => {
        const { [scope]: _, ...rest } = get().sorts
        set({ sorts: rest })
    },

    clearAllFilters: () => set({ filters: {} }),
    
    clearAllSorts: () => set({ sorts: {} }),
}))