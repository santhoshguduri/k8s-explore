import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    id: '',
  }

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload;
    },
    clearUser: (state, action) => {
      state = null
    }
  }
})

export const { updateUser, clearUser } = currentUserSlice.actions

export default currentUserSlice.reducer