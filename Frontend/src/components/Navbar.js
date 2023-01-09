import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {  set_tweets, LOGOUT } from "../redux/counter";
const Navbar = () => {
    const token = useSelector((state)=>state?.counter?.token)
    const dispatch = useDispatch();

    const handleClick = ()=>{
        //remove user from storage
        localStorage.removeItem('token')

        //dispatch logout action
        dispatch(LOGOUT())
        dispatch(set_tweets([]))
    }
    return ( 
        
            <div className=" bg-gray-100 h-screen flex flex-col items-center pt-3 fixed w-1/5 overflow-hidden">
            <div className='w-full text-center mb-2  rounded px-2 py-4 text-4xl text-emerald-500 '><Link  to='/'>OKPK</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/'>NewsFeed</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/profile'>Profile</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/'>Notifications</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/'>Messages</Link></div>
            {!token && <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/signin'>Log in</Link></div>}
            
           {token && <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '>
            <button onClick={handleClick}>Log Out</button> </div>}
            </div>
            
            
            );
}
 
export default Navbar;