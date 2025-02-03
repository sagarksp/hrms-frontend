import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  regForm: null,
  editRegForm: false,
}

const regFormSlice = createSlice({
  name: "regForm",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setRegForm: (state, action) => {
      state.regForm = action.payload
    },
    setEditRegForm: (state, action) => {
      state.editRegForm = action.payload
    },
    resetRegFormState: (state) => {
      state.step = 1
      state.regForm = null
      state.editRegForm= false
    },
  },
})

export const {
  setStep,
  setRegForm,
  setEditRegForm,
  resetRegFormState,
} = regFormSlice.actions

export default regFormSlice.reducer