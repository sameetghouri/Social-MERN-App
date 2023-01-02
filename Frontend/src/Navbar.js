import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {  login, logout } from "./redux/counter";
const Navbar = () => {
    const pname = useSelector((state)=>state?.counter?.value?.usernam)
    const dispatch = useDispatch();
    return ( 
        
            <div className=" bg-gray-100 h-screen flex flex-col items-center pt-3 fixed w-1/5 overflow-hidden">
            <div className='w-full text-center mb-2  rounded px-2 py-4 text-4xl text-emerald-500 '><Link  to='/'>OKPK</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/'>NewsFeed</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/profile'>Profile</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/'>Notifications</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/'>Messages</Link></div>
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/signin'>Sign in</Link></div>
            {!pname && <div className='w-5/6 text-center my-2  hover:bg-gre  rounded-full px-2 py-4 shadow-md  hover:shadow-lg '><Link  to='/signup'>Sign up</Link></div>}
            
            <div className='w-5/6 text-center my-2  hover:bg-gre rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '>
            <button onClick={()=>dispatch(logout())} >Logout</button>
            </div>
            </div>
            
            
            );
}
 
export default Navbar;