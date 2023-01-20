import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {  set_tweets, LOGOUT } from "../redux/counter";
const Footer = () => {
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
        <div className="hidden  lg:block lg:w-1/4 lg:fixed lg:right-0  lg:h-screen bg-gre">
        
        <nav className=" flex flex-col items-center justify-center pt-4 ">
            {!user && <div className='w-3/5 bg-white shadow-md text-center font-semibold text-gray-900 my-2 px-2 py-4 hover:bg-bre hover:text-white rounded-lg '><Link  className=" py-4 pointer-cursor" to='/signup'>Sign up</Link></div>}
            {!user && <div className='w-3/5 bg-white shadow-md text-center font-semibold text-gray-900 my-2 px-2 py-4 hover:bg-bre hover:text-white rounded-lg '><Link  className=" py-4 pointer-cursor" to='/signin'>Log in</Link></div>}
            {user && <div className='w-3/5 bg-white shadow-md text-center font-semibold text-gray-900  my-2 px-2 py-4 hover:bg-bre hover:text-white  rounded-lg '><Link  className=" py-4 pointer-cursor" to='/create'>Create Tweet</Link></div>}
            {user && <div className='w-3/5 bg-white shadow-md text-center font-semibold text-gray-900  my-2  hover:bg-bre hover:text-white  rounded-lg '>
            <button  className=" py-4 px-2 pointer-cursor" onClick={handleClick}>Log Out</button> 
            </div>}
          
        </nav>
    </div>
     );
}
 
export default Footer;
