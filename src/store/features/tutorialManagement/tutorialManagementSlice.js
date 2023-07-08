import { createSlice } from "@reduxjs/toolkit"
const initialState= {
    'tutorialManagement': [],
}
const tutorialManagementSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setTutorialManagementSlice: (state,action)=>{
            state.tutorialManagement = action.payload
        }
        
    },
  
})
export const {setTutorialManagementSlice} = tutorialManagementSlice.actions

export default tutorialManagementSlice.reducer;
