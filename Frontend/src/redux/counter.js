import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  tweets:null,
    user:null
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
    set_tweets: (state, action) => {
      state.tweets = [...action.payload]
    },
    set_tweet: (state, action) => {
      state.tweets = state.tweets.map((item)=> item._id === action.payload._id ? action.payload : item)
    },
    create_tweet: (state,action) => {
      state.tweets = [action.payload,...state.tweets];
    },
    delete_tweet: (state,action) => {
      state.tweets =  state.tweets.filter((item)=> item._id!== action.payload._id)
    },
    LOGIN:(state,action)=>{
      state.user = action.payload 
    },
    LOGOUT:(state)=>{
      state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { set_tweets, set_tweet, create_tweet,delete_tweet,LOGIN,LOGOUT  } = counterSlice.actions

export default counterSlice.reducer


// Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes