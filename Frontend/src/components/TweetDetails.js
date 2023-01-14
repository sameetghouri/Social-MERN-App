import { useDispatch, useSelector} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import like from '../assets/like.svg'
import {  delete_tweet } from "../redux/counter";
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TweetDetails = ({tweet}) => {

  const dispatch = useDispatch(); 
  const user = useSelector((state)=>state?.counter?.user)
    
    // const handleclick = async ()=>{
    //     if(!user){
    //         return
    //     }
    //     const response = await fetch('/api/tweets/'+tweet._id,{
    //         method:'DELETE',
    //         headers:{
    //             'Authorization':`Bearer ${user.token}`}
    //     })
    //     const json = await response.json()

    //     if (response.ok){
    //         // dispatch({type:'DELETE_tweet', payload:json})
    //         dispatch(delete_tweet(json))
    //     }
    // }
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
             {tweet.likes.includes(user.id) ? <span className='mr-3' ><img className="w-5" src={like} alt="like"/></span> : <span className='mr-3' >NotLiked </span>}
            <div className="text-gray-600 mr-3">{`Likes: ${tweet.likes.length}`}</div>
            <div className="text-gray-600">{`Comments: ${tweet.comments.length}`}</div>
            </div>
            <input type='text' placeholder="Write Comment" className="mt-3 w-11/12 px-2 py-1 rounded-xl border-2 " />
            {tweet.comments && tweet.comments.map((comment)=>{
              return <div className="flex items-center mt-2">
              <img src={`/ProfilePics/${comment.userdp}`} alt="DP" className="w-7 h-7 rounded-full mr-2"/>
              <div className="font-medium mr-2">{comment.username}:</div>
              <div className="text-gray-800 text-sm">{comment.comment}</div>
              </div>})}
              
            
            {/* <span className='material-symbols-outlined' onClick={handleclick}>Delete</span> */}
        </div>
     );
}
 
export default TweetDetails;