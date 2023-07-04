import { BASE_URL } from "@/app/api/BaseAPI"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    emailUsers:"",
    status: 'idle',
    error: null
}
export const fetchUsers = createAsyncThunk('users/fetchUsers',async({limit,offset})=>{
    const res = await fetch(`${BASE_URL}users`)
    const data = await res.json()
    return data
})
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addEmailUser(state,action){
            state.emailUsers=action.payload
          },
    }, // use createAsyncThunk no need any action
    extraReducers(builder){
        builder
        .addCase(fetchUsers.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.users = state.users.concat(action.payload)
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})
//export action ; we have no action that's why hehe
export const { addEmailUser} = userSlice.actions
//export reducer
export default userSlice.reducer

// export selector
export const selectAllUsers = state => state.users.users
export const selectUserById = (state, userId) => state.users.users.find(user => user.id === userId)
export const selectUserStatus = state => state.users.status
export const selectUserError = state => state.users.error
