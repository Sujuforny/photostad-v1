import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState={
    images: [],
    status: 'idle',
    error: null
}
export const fetchImages = createAsyncThunk('images/fetchImages',async({limit,offset})=>{
    const res = await fetch(`${BASE_URL}images`)
    const data = await res.json()
    return data
}
)
const imageSlice = createSlice({

    name: 'images',
    initialState,
    reducers: {


    },
    extraReducers(builder){
        builder
        .addCase(fetchImages.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchImages.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.images = state.images.concat(action.payload)
        })
        .addCase(fetchImages.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }

})
// export action ; we have no action that's why hehe
export const { } = imageSlice.actions
//export reducer
export default imageSlice.reducer
// export selector
export const selectAllImages = state => state.images.images
export const selectImageStatus = state => state.images.status
export const selectImageError = state => state.images.error
