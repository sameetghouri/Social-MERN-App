import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  count:0,
  value: [ {usernam: ""} ]
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
    login: (state,action) => {

      fetch()

      state.value = action.payload;

    },

    logout: (state) => {
      state.value = initialState.value;
    },
    // setuser(state,action){
    //   const userdata = action.payload;
    //   return{...state,...userdata} }
    //setuser action will update the perticular property value (role:senior enginer from junior enginer) of user object
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, login, logout } = counterSlice.actions

export default counterSlice.reducer


// Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes