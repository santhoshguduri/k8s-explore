import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slices/UserSlice'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer
  }
})