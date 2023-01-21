import  {useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import {RiDeleteBin6Line} from "react-icons/ri";
import {FiEdit} from "react-icons/fi";
import {BiCommentDetail} from "react-icons/bi";
import {RiHeart3Line, RiHeart3Fill} from "react-icons/ri";
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
    
    const response = await fetch('/api/tweet/comment/'+tweet._id,{
        method:'PATCH',
        headers:{
          "Content-Type": "application/json",
          'Authorization':`Bearer ${user.token}`},
        body:JSON.stringify({ comment, dp:user.dp})
    })
    if(response.ok){
        dispatch(set_comment(tweetcomment))
    }
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
      dispatch(set_tweetunlike({tweetid:tweet._id, userid:user.id}))
      const response = await fetch('/api/tweet/unlike/'+tweet._id,{
          method:'PATCH',
          headers:{
            'Authorization':`Bearer ${user.token}`}
      })
      const json = await response.json()
      console.log(json)
    } 
    const handledelete= async ()=>{
        const response = await fetch('/api/tweet/'+tweet._id,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`}
        })
        const json = await response.json()
        console.log(json)
        if (response.ok){
            dispatch(delete_tweet({tweetid:tweet._id}))
        }  
    }
    
    const openfun = ()=>{ setopen(!open) }

return ( 
  <div className="w-full bg-white shadow-sm rounded-2xl py-6 px-8 my-2 " >
      
      <div className="flex items-center w-full relative">
      <img src={`/ProfilePics/${tweet.tweetauthordp}`} alt="DP" className="w-10 h-10 rounded-full mr-4"/>
      <div className="text-lg font-medium">{tweet.tweetauthor}</div>
      
      {edit && <div className="absolute right-1  ">
      <GoThreeBars className="w-10 h-10 p-2 cursor-pointer" onClick={openfun} /> 
      {open && 
      <ul className=" absolute right-6 top-2 px-2 rounded-lg ">
        <li className='p-1 rounded-lg shadow-xl'>
          <Link to={`/edit/${tweet._id}`}> <FiEdit className="w-5 h-5" /></Link>
        </li>
        <li className='p-1 rounded-lg shadow-xl'>
          <RiDeleteBin6Line className="w-5 h-5 cursor-pointer" onClick={handledelete}/>
        </li> 
      </ul>}
      </div>}
      </div>

      <div className="text-gray-600 text-xs my-2">
      {formatDistanceToNow(new Date(tweet.createdAt), {addSuffix:true})}
      </div>

      <p className="my-4 ">{tweet.tweetbody}</p>
      {tweet.tweetimage &&<div className="w-full flex justify-center" > 
      <img className="w-full rounded-lg" src={`PostPics/${tweet.tweetimage}`} alt="tweetimage"/></div>}
      
      <div className="flex items-center mt-3 ">
        {tweet.likes.includes(user.id) 
        ? <div className='ml-3' ><RiHeart3Fill className="w-6 h-6" onClick={patchUnlike}/> </div> 
        : <div className='ml-3' ><RiHeart3Line className="w-6 h-6" onClick={patchLike}/></div>}
      <div className="text-gray-600 ml-2 mr-4">{tweet.likes.length}</div>
      <div  ><BiCommentDetail className="w-6 h-6" /> </div>  
      <div className="text-gray-600 ml-2">{tweet.comments.length}</div>
      </div>

      <div className="flex items-center my-3">
      <input type='text' placeholder="Write Comment" value={comment} onChange={(e)=>{setcomment(e.target.value)}} className=" mr-1 w-11/12 px-2 py-1 rounded-xl border-2 " />
      <button onClick={patchComment} className=" py-1 px-4  bg-bre rounded-full cursor-pointer transform hover:scale-110 transition duration-100 text-gray-100">Post</button>
      </div>

      {tweet.comments && tweet.comments.map((item,id)=>{
        return <div key={id} className="flex  mt-2 mb-3 p-2  border-gre shadow rounded-xl">
        <img src={`/ProfilePics/${item.userdp}` || ""} alt="dp" className="w-7 h-7 rounded-full mr-2"/>
        <div className="font-medium mr-2 pt-1 ">{item.username}:</div>
        <div className="text-gray-800 pt-1">{item.comment}</div>
        
        </div>})}
        
  </div>
     );
}
 
export default TweetDetails;