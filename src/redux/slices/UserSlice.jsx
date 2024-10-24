import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    uuid: '',
  }

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { firstname, lastname, email, id } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
      state.uuid = id;
    },
    clearUser: (state, action) => {
      state = null
    }
  }
})

export const { updateUser, clearUser } = currentUserSlice.actions

export default currentUserSlice.reducer