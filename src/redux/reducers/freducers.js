import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fid: 0,
}

export const freducers = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFId: (state, action) => {
      state.fid = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFId } = freducers.actions

export default freducers.reducer