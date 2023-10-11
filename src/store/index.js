import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./silce/UserSlice";
import { carReducer } from "./silce/CarSlice";
import { reservationReducer } from "./silce/ReservationSlice";
const store = configureStore({
    reducer: {
        user: userReducer,
        car: carReducer,
        reservation: reservationReducer,    
    }
})

export default store