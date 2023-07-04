import { BASE_URL } from "@/app/api/BaseAPI"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState={
    tutorials: [],
    status: 'idle',//loading, succeeded, failed
    error: null,
    total: 0
}

export const fetchTutorial = createAsyncThunk('tutorials/fetchTutorial',async({limit,offset})=>{
    const res = await fetch(`${BASE_URL}tutorials?limit=${limit}&offset=${offset}&isDeleted=false`)
    const data = await res.json()
    return data
})

const tutorialSlice = createSlice({
    name: 'tutorials',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchTutorial.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchTutorial.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.tutorials = action.payload
            state.total = action.payload.total
        })
        .addCase(fetchTutorial.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})
// export action ; we have no action that's why hehe
export const { } = tutorialSlice.actions
//export reducer
export default tutorialSlice.reducer
// export selector
// export const selectAllTutorial = state => state.tutorial.tutorial.data.list
export const selectTutorialStatus = state => state.tutorials.status
export const selectAllTutorial = state => state.tutorials.tutorials.data

