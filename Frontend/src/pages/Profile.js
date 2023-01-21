import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {  set_tweets } from "../redux/counter";
import TweetDetails from "../components/TweetDetails";
import Nav from '../components/Nav';
import {BiLoaderAlt} from "react-icons/bi";
const Profile = () => {
  const user = useSelector((state)=>state?.counter?.user)
  const tweets = useSelector((state)=>state?.counter?.tweets)
  const [isloading, setIsloading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchTweets = async () =>{
        const response = await fetch('/api/tweet/profile',{
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json)
            setIsloading(false)
        }
        if(response.ok){
            setIsloading(false)
            dispatch(set_tweets(json))
        }
    }
    if(user){
        fetchTweets()
    } 
},[dispatch,user])

    return (
        <div className=" h-screen bg-gre col-span-4 sm:col-span-3 md:col-span-2 ">
         <Nav/>                
        <main className="bg-gre p-2   flex flex-col items-center">        
        <div className="w-full bg-white shadow-sm pt-10 pb-4  mt-2 rounded-lg flex flex-col items-center ">            
        <div className=" w-24 h-24  rounded-full overflow-hidden">
        {user?.dp && <img src={`/ProfilePics/${user.dp}`} alt="dp"></img> }
        </div>
        <div className="mt-4 font-bold text-3xl text-gray-900 text-center">{user?.name}</div>   
        </div >
        <h2 className="text-center mt-10 mb-3 font-semibold text-xl text-gray-800 ">Profile Tweets</h2>
        {error && <div>{error}</div>}
        {isloading && <div className="flex justify-center ">
        <span className=" animate-spin text-sky-600 "><BiLoaderAlt className="h-8 w-8" /></span>
        </div>}
        {tweets && tweets.map((item)=>(
        <TweetDetails key={item._id} tweet={item} edit={true}/>
            ))} 
    </main>
    </div> 
   
    );
} 
export default Profile;