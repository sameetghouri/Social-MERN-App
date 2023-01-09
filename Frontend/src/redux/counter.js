import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  tweets:null,
    token:null
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
    set_tweets: (state, action) => {
      state.tweets = [...action.payload]
    },
    create_tweet: (state,action) => {
      state.tweets = [action.payload,...state.tweets];
    },
    delete_tweet: (state,action) => {
      state.tweets =  state.tweets.filter((w)=> w._id!== action.payload._id)
    },
    LOGIN:(state,action)=>{
      state.token = action.payload 
    },
    LOGOUT:(state)=>{
      state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { set_tweets, create_tweet,delete_tweet,LOGIN,LOGOUT  } = counterSlice.actions

export default counterSlice.reducer


// Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes