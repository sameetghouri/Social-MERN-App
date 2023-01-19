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
    set_tweetlike: (state, action) => {
      state.tweets = state.tweets.map((item)=> item._id === action.payload.tweetid ? ({
        ...item, likes:[...item.likes, action.payload.userid]
      }) : item)
    },
    set_tweetunlike: (state, action) => {
      state.tweets = state.tweets.map((item)=> item._id === action.payload.tweetid ? ({
        ...item, likes: [item.likes.filter((like)=>like!==action.payload.userid)]
      }) : item)
    },
    set_comment: (state, action) => {
      const {tweetid,userid,userdp,username,comment}= action.payload
      state.tweets = state.tweets.map((item)=> item._id === tweetid ? ({
        ...item,
        comments:[...item.comments, {userid,userdp,username,comment}]
      }) : item)
    },
    // create_tweet: (state,action) => {
    //   state.tweets = [action.payload,...state.tweets];
    // },
    delete_tweet: (state,action) => {
      state.tweets =  state.tweets.filter((item)=> item._id!== action.payload.tweetid)
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
export const { set_tweets, set_tweetlike, set_tweetunlike, set_comment, create_tweet,delete_tweet,LOGIN,LOGOUT  } = counterSlice.actions

export default counterSlice.reducer


// Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes