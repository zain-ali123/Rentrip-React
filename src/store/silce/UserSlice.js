import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 

  export const authenticateUser = createAsyncThunk("authenticateUser",
    async (payload, { rejectWithValue }) => {
      const response = await axios.post('http://localhost:3005/users/authenticate', payload);
      try {
        const result = await response.data
        console.log(response)
        // console.log(result.data.user)

        localStorage.setItem("token", result.data.token)
        localStorage.setItem("userId", result.data.user._id)
        localStorage.setItem("role", result.data.user.role)
        localStorage.setItem("isAuthenticated",true)
        
        return result.data.user
      }
      catch (error) {
        
        return rejectWithValue( error)
      }
    })
export const registerUser = createAsyncThunk("registerUser",
  async (payload) => {
    try {
      const { data } = await axios.post("http://localhost:3005/users/register", payload)
      console.log(data)
      
    }
    catch (err) {
      console.log(err)
      return err
    }
  })
export const fetchAllUsers = createAsyncThunk("fethAllUsers",
  async () => {
    try {
      const { data } = await axios.get("http://localhost:3005/users")
      // console.log(data.data.users)
      return data.data.users
    }
    catch (err){
      return(err)
    }
  })
export const deleteUserById = createAsyncThunk("deleteUserById",
  async (payload) => {
    const { data } = await axios.delete(`http://localhost:3005/users/${payload}`)
    console.log(data)
    return data.data.users
})



const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    responseMessage: null,
    users: [],
    
  },
  extraReducers(builder) {


    //authenticate user
    builder.addCase(authenticateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      
      state.loading = false;
      console.log("action.payload", action.payload)
      state.user = action.payload
      console.log(state.user )
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.error = action.payload.msg
    });

    //create user

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload.msg
    });


    //fetch users

    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload
      // console.log(state.users)
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.error = action.msg
    });

    
    // delete userById
    builder.addCase(deleteUserById.fulfilled,(state, action)=> {
      state.users=action.payload
    })
  },

   

})
export const userReducer = userSlice.reducer;