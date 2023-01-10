import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {  set_tweets } from "../redux/counter";
import TweetDetails from "../components/TweetDetails";
import { Link } from "react-router-dom";
// import {FiAperture} from 'react-icons/fi'

const Home = () => {
const user = useSelector((state)=>state?.counter?.user)
  const tweets = useSelector((state)=>state?.counter?.tweets)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchTweets = async () =>{
        const response = await fetch('/api/tweet',{
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch(set_tweets(json))
        }
    }
    if(user){
        fetchTweets()
    } 
},[dispatch,user])

    return ( 
        <div className="col-span-4">
        <div className="h-screen grid grid-cols-5 md:grid-cols-8">
             
        <main className=" bg-emerald-300 col-span-5 md:col-span-6 flex flex-col items-center ">
    			 
    {/* <div className=" rounded">	
        <img src="https://source.unsplash.com/collection/494263/800x600" className="h-full w-full shadow-md"/>
    </div> */}

    <div className="flex flex-col bg-gray-200 w-11/12 mt-2 mb-2 rounded-2xl overflow-hidden">
        <div className="flex flex-col  bg-white rounded px-4 pt-4 overflow-hidden shadow-lg">
        <div className="text-center text-gray-800 my-2 font-bold text-xl">All Tweets</div>
        <div >
        {tweets && tweets.map((item)=>(
                <TweetDetails key={item._id} tweet={item}/>
            ))} 
        </div>	    
        </div>
        
        <div className="flex flex-col items-center bg-white">
            <input className="py-2 px-2 w-11/12 border-2 border-gray-300 rounded-full" type="text" placeholder="Write Comment"/>
            <button className=" py-2 w-24 m-2 bg-slate-600 rounded-full cursor-pointer transform hover:scale-110 transition duration-100 text-gray-100">Post</button>
            
        </div>
    </div>

    {/* {isloading && <div className="flex mt-4 justify-center items-center gap-2 text-gray-800 text-3xl">
                    <span className="h-8 w-8 block rounded-full animate-spin text-white "><FiAperture /></span>
                    loading...</div>}
                    
    {array && array.map((item) =>{
        return( 
        <div className="bg-gray-100 m-3 p-4 rounded-lg shadow-md" >
        <h1 className="text-xl font-bold border-b-2 border-gray-300 text-center my-2 pb-2">{item.author}</h1>
        <h1 className="text-lg text-center mb-1 text-gray-800 font-semibold">{item.title}</h1>
        <p>{item.description}</p>                                            
        </div>)
    })} */}
    </main>
    
    <Footer />
</div>
</div>
     );
}
export default Home;
