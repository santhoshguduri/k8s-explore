import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    uuid: '',
    cardVerified: false,
  }

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { firstname, lastname, email, id, is_card_verified } = action.payload;
      state.firstname = firstname;
      state.lastname = lastname;
      state.email = email;
      state.uuid = id;
      state.cardVerified = is_card_verified;
    },
    clearUser: (state, action) => {
      state = null
    }
  }
})

export const { updateUser, clearUser } = currentUserSlice.actions

export default currentUserSlice.reducer