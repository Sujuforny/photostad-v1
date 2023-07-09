import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  'email': "",
   isFromForgetPw: false,
};
const anonymousSlice = createSlice({
  name: "anonymous",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setIsFormForgetPw: (state, action) => {
        state.isFromForgetPw = action.payload
    }
  },
});

export const {setEmail, setIsFormForgetPw} = anonymousSlice.actions;

export default anonymousSlice.reducer;
export const selectEmail = (state) => state?.anonymous.email;
export const selectIsFromForgetPw = (state) => state?.anonymous.isFromForgetPw
;
