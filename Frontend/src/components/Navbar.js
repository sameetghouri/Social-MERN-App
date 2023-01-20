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
        
            <div className=" bg-gre h-screen flex flex-col items-center pt-3 fixed w-1/5 overflow-hidden">
            <div className='w-full text-center mb-2 font-bold  rounded px-2 py-4 text-4xl text-bre '><Link  to='/'>OKPK</Link></div>
            {user && <div className='w-5/6 text-center my-2  hover:bg-bre hover:text-white rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link className="  py-4 pointer-cursor" to='/'>NewsFeed</Link></div>}
            {user && <div className='w-5/6 text-center my-2  hover:bg-bre hover:text-white  rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link className="  py-4 pointer-cursor" to='/profile'>Profile</Link></div>}
            
            {!user && <div className='md:hidden w-5/6 text-center my-2  hover:bg-bre hover:text-white  rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link className=" py-4 pointer-cursor" to='/signup'>Sign up</Link></div>}
            {!user && <div className='md:hidden w-5/6 text-center my-2  hover:bg-bre hover:text-white  rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link className=" py-4 pointer-cursor" to='/signin'>Log in</Link></div>}
            {user && <div className='md:hidden w-5/6 text-center my-2  hover:bg-bre hover:text-white  rounded-full  px-2 py-4 shadow-md  hover:shadow-lg '><Link className=" py-4  pointer-cursor" to='/post'>Create Tweet</Link></div>}
            {user && <div className='md:hidden w-5/6 text-center my-2  hover:bg-bre hover:text-white  rounded-full   shadow-md  hover:shadow-lg '>
            <button className=" py-4 px-2  pointer-cursor " onClick={handleClick}>Log Out</button> </div>}
           
            </div>
            
            
            );
}
 
export default Navbar;