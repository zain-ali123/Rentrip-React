import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
// console.log("token in the fetch----> ", token);
const config = {
  headers: {
    "x-access-token": token,
    "Content-Type": "application/json",
  },
};

export const createReservation = createAsyncThunk("createReservation",
    async (payload) => {
        const { data } = await axios.post("http://localhost:3005/reservation", payload,config)
        console.log(data)
})
export const getReservationsByUserID = createAsyncThunk('getReservationsByUserID',
    async () => {
        try {
            const id=localStorage.getItem('userId')
            const { data } = await axios.get(`http://localhost:3005/reservation/user/${id}`,config)
            // console.log(data.data.reservations)
            return data.data.reservations
            
        }
        catch (err) {
            return err
        }
    })
export const cancelReservation = createAsyncThunk('cancelReservation',
    async (payload)=>{
        const { data } = await axios.delete("http://localhost:3005/reservation", { headers:config.headers,  data: payload})
        console.log(data)
    })
export const fetchUserByReservationId = createAsyncThunk("fetchUserByReservationId",
    async (payload) => {
        try {
            const {data} =await axios.get(`http://localhost:3005/reservation/${payload}`,config)
            return data.data.allReservations[0].userId
            
        }
        catch(error) {
            console.log("error--------------->",error)
         return error   
        }
        
    })  
export const getAllReservations = createAsyncThunk("getAllReservations",
    async () => {
        const { data } = await axios.get("http://localhost:3005/reservation", config)
        return data.data.reservations
})  

const reservationSlice = createSlice({
    name: 'reservationSlice',
    initialState: {
        reservation: null,
        loading: false,
        user: null,
        error:null
    },
    extraReducers(builder) {

        //getReservations
        builder.addCase(getReservationsByUserID.pending, (state) => {
            state.loading = true;

        });
        builder.addCase(getReservationsByUserID.fulfilled, (state, action) => {
            state.loading=false
            state.reservation = action.payload
            // console.log(state.reservation)
        })


        //setUser
        builder.addCase(fetchUserByReservationId.fulfilled, (state, action) => {
            state.user = action.payload
            // console.log(state.user)
        })
        //getAllReservations
        builder.addCase(getAllReservations.pending, (state) => {
            state.loading = true;

        });
        builder.addCase(getAllReservations.fulfilled, (state, action) => {
            state.loading = false;
            state.reservation = action.payload
            // console.log(state.reservation)
        })

    }

})
export const reservationReducer = reservationSlice.reducer;
