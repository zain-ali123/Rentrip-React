import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
// console.log("token in the fetch----> ", token);
const config = {
  headers: {
    "x-access-token": token,
    "Content-Type": "application/json",
  },
};

// console.log("fetch cars");
export const fetchCars = createAsyncThunk("fetchCars", async () => {
  try {
    const { data } = await axios.get("http://localhost:3005/car", config);
    console.log(data.data.cars);
    return data.data.cars;
  } catch (err) {
    return err;
  }
});

export const fetchCarsByManagerId = createAsyncThunk(
  "fetchCarsByManagerId",
  async () => {
    console.log("object");
    const id = localStorage.getItem("userId");
    const { data } = await axios.get(`http://localhost:3005/car/${id}`, config);
    // console.log("data",data)
    console.log(data.data.cars);
    return data.data.cars;
  }
);
export const deleteCarById = createAsyncThunk(
  "deleteCarById",
  async (payload) => {
    const { data } = await axios.delete(
      `http://localhost:3005/car/${payload}`,
      config
    );
    console.log(data.data.cars);
    return data.data.cars;
  }
);
export const updateCarById = createAsyncThunk(
  "updateCarById",
  async (payload) => {
    const { data } = await axios.put(
      `http://localhost:3005/car/${payload.id}`,
      payload.form,
      config
    );
    console.log(data.data.cars);
    return data.data.cars;
  }
);

export const createCar = createAsyncThunk("createCar", async (payload) => {
  const response = await axios.post(
    "http://localhost:3005/car",
    payload,
    config
  );
  console.log(response);
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    loading: false,
  },
  extraReducers(builder) {
    //fetch cars
    builder.addCase(fetchCars.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
    });

    //fetchCarsByManagerId
      builder.addCase(fetchCarsByManagerId.pending, (state) => {
          state.loading = true;
        
        
      })
      builder.addCase(fetchCarsByManagerId.fulfilled, (state, action) => {
          state.loading = false;
          state.cars = action.payload;

      })

      //updateCar
      builder.addCase(updateCarById.pending, (state) => {
          state.loading = true;
      })
      builder.addCase(updateCarById.fulfilled, (state, action) => {
          state.loading = false;
          state.cars = action.payload;

      })

      //deleteCar
      builder.addCase(deleteCarById.pending, (state) => {
          state.loading=true
      })
      builder.addCase(deleteCarById.fulfilled, (state, action) => {
          state.loading = false;
          state.cars=action.payload
      })
  },
});

export const carReducer = carSlice.reducer;
