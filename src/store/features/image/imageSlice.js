import { createSlice } from "@reduxjs/toolkit"
const initialState= {
    'image': [],
}
const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImages: (state,action)=>{
            state.image = action.payload
        }
        
    },
  
})

export const {setImages} = imageSlice.actions

export default imageSlice.reducer;
