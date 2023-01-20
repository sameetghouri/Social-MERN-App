import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {  set_tweets } from "../redux/counter";
import TweetDetails from "../components/TweetDetails";
import {BiLoaderAlt} from 'react-icons/bi'

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
        <div className="col-span-4 ">
        <div className="h-screen grid grid-cols-5 md:grid-cols-8">
             
        <main className=" bg-gre  col-span-5 md:col-span-6 flex flex-col items-center">
        
        
        <h2 className="text-center text-gray-800 mt-4 mb-2 font-bold text-3xl">Tweets</h2>
        {error && <div>{error}</div>}
        {isloading && <div className="flex justify-center ">
            <span className=" animate-spin text-sky-600 "><BiLoaderAlt className="h-8 w-8" /></span>
        </div>}
        {tweets && tweets.map((item)=>(
                <TweetDetails key={item._id} tweet={item} edit={false}/>
            ))} 

             

     
                    
    
    </main>
    
    <Footer />
</div>
</div>
     );
}
export default Home;
