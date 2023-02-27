import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {  set_tweets } from "../redux/counter";
import TweetDetails from "../components/TweetDetails";
import {BiLoaderAlt} from "react-icons/bi";
import Nav from "../components/Nav";

const Home = () => {
const user = useSelector((state)=>state?.counter?.user)
  const tweets = useSelector((state)=>state?.counter?.tweets)
  const [isloading, setIsloading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchTweets = async () =>{
        const response = await fetch('/api/tweet',{
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
        <div className="h-screen bg-gre col-span-4 sm:col-span-3 lg:col-span-2 ">
        <Nav/>     
        <main className="bg-gre p-2  flex flex-col items-center">
        <h2 className="text-center text-gray-800 mt-4 mb-2 font-bold text-3xl">Posts</h2>
        {error && <div>{error}</div>}
        {isloading && <div className="flex justify-center ">
            <span className=" animate-spin text-sky-600 "><BiLoaderAlt className="h-8 w-8" /></span>
        </div>}
        {!isloading && tweets && tweets.map((item)=>(
                <TweetDetails key={item._id} tweet={item} edit={false}/>
            ))} 
        </main>
</div>
);
}
export default Home;
