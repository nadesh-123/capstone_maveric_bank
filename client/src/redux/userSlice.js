
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  role:"",
  token:""
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {

    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role=action.payload.role
      state.token=action.payload.token
    },

    clearUser: (state) => {
      state.id = null;
      state.username = "";
      state.role="";
      state.token=""
    }

  }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

