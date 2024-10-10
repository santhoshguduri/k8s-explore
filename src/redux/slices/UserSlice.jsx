import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastname: '',
    email: '',
    uuid: '',
  }

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateuser: (state, action) => {
      state = action.payload;
    },
    clearUser: (state, action) => {
      state = null
    }
  }
})

export const { updateuser, clearUser } = currentUserSlice.actions

export default currentUserSlice.reducer