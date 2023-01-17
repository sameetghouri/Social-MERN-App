import  {useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {IoHeartOutline, IoHeartSharp} from "react-icons/io5";
import  {GoThreeBars} from "react-icons/go";
import {  delete_tweet, set_tweetlike, set_tweetunlike, set_comment } from "../redux/counter";
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TweetDetails = ({tweet, edit}) => {
  const [comment, setcomment] = useState('')
  const [open, setopen] = useState(false)
  const dispatch = useDispatch(); 
  const user = useSelector((state)=>state?.counter?.user)
    
  const patchComment = async ()=>{
    const tweetcomment = {tweetid:tweet._id, userid:user.id,
       userdp:user.dp, username:user.name, comment }
    dispatch(set_comment(tweetcomment));
    const response = await fetch('/api/tweet/comment/'+tweet._id,{
        method:'PATCH',
        headers:{
          "Content-Type": "application/json",
          'Authorization':`Bearer ${user.token}`},
        body:JSON.stringify({ comment, dp:user.dp})
    })
    const json = await response.json()
    console.log(json)
    setcomment('')
    
}
  
  
  const patchLike = async ()=>{
    dispatch(set_tweetlike({tweetid:tweet._id, userid:user.id}));
        const response = await fetch('/api/tweet/like/'+tweet._id,{
            method:'PATCH',
            headers:{
              'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        console.log(json)
        
    }
    const patchUnlike = async ()=>{
      dispatch(set_tweetunlike({tweetid:tweet._id, userid:user.id}));
      const response = await fetch('/api/tweet/unlike/'+tweet._id,{
          method:'PATCH',
          headers:{
            'Authorization':`Bearer ${user.token}`}
      })
      const json = await response.json()
      console.log(json)
        
      
  }

    const handleclick = async ()=>{
        if(!user){
            return
        }
        const response = await fetch('/api/tweets/'+tweet._id,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()

        if (response.ok){
            // dispatch({type:'DELETE_tweet', payload:json})
            dispatch(delete_tweet(json))
        }  
    }

    
    

    
return ( 
  <div className="w-10/12 bg-white shadow-sm rounded-2xl py-6 px-10 my-2 " >
      <div className="flex items-center">
      <img src={`/ProfilePics/${tweet.tweetauthordp}`} alt="DP" className="w-10 h-10 rounded-full mr-4"/>
      <div className="text-lg font-medium">{tweet.tweetauthor}</div>
      
      </div>
      <div className="text-gray-600 text-xs my-2">
      {formatDistanceToNow(new Date(tweet.createdAt), {addSuffix:true})}
      </div>
      <p className="my-4">{tweet.tweetbody}</p>
      {tweet.tweetimage &&<div className="w-full flex justify-center" > <img className="w-full my-2 rounded-lg" src={`PostPics/${tweet.tweetimage}`} alt="tweetimage"/></div>}
      
      <div className="flex items-center mt-1">
        {tweet.likes.includes(user.id) 
        ? <span className='ml-2 mr-3' ><IoHeartSharp className="w-6 h-6" onClick={patchUnlike}/> </span> 
        : <span className='ml-2 mr-3' ><IoHeartOutline className="w-6 h-6" onClick={patchLike}/></span>}
      <div className="text-gray-600 mr-3">{`Likes: ${tweet.likes.length}`}</div>
      <div className="text-gray-600">{`Comments: ${tweet.comments.length}`}</div>
      </div>
      <div className="flex items-center mt-3 mb-2">
      <input type='text' placeholder="Write Comment" value={comment} onChange={(e)=>{setcomment(e.target.value)}} className=" mr-1 w-11/12 px-2 py-1 rounded-xl border-2 " />
      <button onClick={patchComment} className=" py-1 px-4  bg-bre rounded-full cursor-pointer transform hover:scale-110 transition duration-100 text-gray-100">Post</button>
      </div>
      
      {tweet.comments && tweet.comments.map((item,id)=>{
        return <div key={id} className="flex items-center my-2 ">
        <img src={`/ProfilePics/${item.userdp}` || ""} alt="dp" className="w-7 h-7 rounded-full mr-2"/>
        <div className="font-medium mr-2">{item.username}:</div>
        <div className="text-gray-800 text-sm">{item.comment}</div>
        </div>})}
        
      
        {edit && <button  onClick={handleclick} className=" py-1 px-4  bg-bre rounded-full cursor-pointer transform hover:scale-110 transition duration-100 text-gray-100">Delete</button>}
  </div>
     );
}
 
export default TweetDetails;