import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {  set_tweets, LOGOUT } from "../redux/counter";
const Navbar = () => {
    const user = useSelector((state)=>state?.counter?.user)
    const dispatch = useDispatch();

    const handleClick = ()=>{
        //remove user from storage
        localStorage.removeItem('user')
        
        //dispatch logout action
        dispatch(LOGOUT())
        dispatch(set_tweets([]))
    }
    return ( 
        
            <div className="  hidden sm:bg-gre sm:w-1/4  sm:h-screen sm:flex sm:flex-col sm:items-center sm:pt-3 sm:fixed  sm:overflow-hidden">
            <div className='w-full text-center mb-2 font-bold  rounded px-2 py-4 text-4xl text-bre '><Link  to='/'>OKPK</Link></div>
            {user && <div className='w-3/5 bg-white  text-center my-2  hover:bg-bre hover:text-white rounded-xl  px-2 py-4 shadow-md  hover:shadow-lg '><Link className="  py-4 pointer-cursor" to='/'>NewsFeed</Link></div>}
            {user && <div className='w-3/5 bg-white  text-center my-2  hover:bg-bre hover:text-white  rounded-xl  px-2 py-4 shadow-md  hover:shadow-lg '><Link className="  py-4 pointer-cursor" to='/profile'>Profile</Link></div>}            
            {!user && <div className='lg:hidden w-3/5 bg-white text-center my-2  hover:bg-bre hover:text-white  rounded-xl  px-2 py-4 shadow-md  hover:shadow-lg '><Link className=" py-4 pointer-cursor" to='/signup'>Sign up</Link></div>}
            {!user && <div className='lg:hidden w-3/5 bg-white text-center my-2  hover:bg-bre hover:text-white  rounded-xl  px-2 py-4 shadow-md  hover:shadow-lg '><Link className=" py-4 pointer-cursor" to='/signin'>Log in</Link></div>}
            {user && <div className='lg:hidden w-3/5 bg-white text-center my-2  hover:bg-bre hover:text-white  rounded-xl  px-2 py-4 shadow-md  hover:shadow-lg '><Link className=" py-4  pointer-cursor" to='/create'>Create Tweet</Link></div>}
            {user && <div className='lg:hidden w-3/5 bg-white text-center my-2  hover:bg-bre hover:text-white  rounded-xl   shadow-md  hover:shadow-lg '>
            <button className=" py-4 px-2  pointer-cursor " onClick={handleClick}>Log Out</button> </div>}
           
            </div>
            
            
            );
}
 
export default Navbar;