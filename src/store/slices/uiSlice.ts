import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
    theme: 'light' | 'dark'
    sidebarOpen: boolean
    notificationsPanelOpen: boolean
    propertyViewMode: 'grid' | 'list'
}

const initialState: UIState = {
    theme: 'light',
    sidebarOpen: true,
    notificationsPanelOpen: false,
    propertyViewMode: 'grid',
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload
        },
        toggleNotificationsPanel: (state) => {
            state.notificationsPanelOpen = !state.notificationsPanelOpen
        },
        setPropertyViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.propertyViewMode = action.payload
        },
    },
})

export const {
    setTheme,
    toggleSidebar,
    setSidebarOpen,
    toggleNotificationsPanel,
    setPropertyViewMode,
} = uiSlice.actions

export default uiSlice.reducer
