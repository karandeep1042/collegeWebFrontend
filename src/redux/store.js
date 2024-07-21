import { configureStore } from '@reduxjs/toolkit'
import freducers from './reducers/freducers'
export const store = configureStore({
    reducer: {
        freducers : freducers
    },
})