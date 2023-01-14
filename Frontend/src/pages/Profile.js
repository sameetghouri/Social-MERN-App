import {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {  set_tweets } from "../redux/counter";
import TweetDetails from "../components/TweetDetails";
import Footer from "../components/Footer";
const Profile = () => {
  const user = useSelector((state)=>state?.counter?.user)
  const tweets = useSelector((state)=>state?.counter?.tweets)
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchTweets = async () =>{
        const response = await fetch('api/tweet/profile',{
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
        
    <main className=" bg-gre col-span-5 md:col-span-6 flex flex-col items-center ">
        
            <div className="w-11/12 bg-white shadow-sm pt-10 pb-4  mt-3 rounded-lg flex flex-col items-center ">
            <div className="h-28 ">
              <div className=" w-24 h-24 rounded-full overflow-hidden">
              <img  src={`/ProfilePics/${user?.dp}`} alt="DP"></img> 
              </div>
            </div>
            <div className="mt-4 font-bold text-3xl text-gray-900 text-center">{user?.name}</div>   
            </div >
        <h2 className="text-center mt-10 mb-3 font-semibold text-xl text-gray-800 ">Profile Tweets</h2>
        
        {tweets && tweets.map((item)=>(
                <TweetDetails key={item._id} tweet={item}/>
            ))} 

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
 
export default Profile;