import { BASE_URL } from "@/app/api/BaseAPI"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState= {
    certificates: [],
    status: 'idle',
    error: null

}

export const fetchCertificates = createAsyncThunk('certificates/fetchCertificates',async({limit,offset})=>{
    const res = await fetch(`${BASE_URL}certificates`)
    const data = await res.json()
    return data
}
)

const certificateSlice = createSlice({
    name: 'certificates',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchCertificates.pending,(state,action)=>{
            state.status = 'loading'
        })
        .addCase(fetchCertificates.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.certificates = state.certificates.concat(action.payload)
        })
        .addCase(fetchCertificates.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })

    }
})

// export action ; we have no action that's why hehe
export const { } = certificateSlice.actions
//export reducer
export default certificateSlice.reducer
// export selector
export const selectAllCertificates = state => state.certificates.certificates
export const selectCertificateById = (state, certificateId) => state.certificates.certificates.find(certificate => certificate.id === certificateId)
export const selectCertificateStatus = state => state.certificates.status
export const selectCertificateError = state => state.certificates.error
