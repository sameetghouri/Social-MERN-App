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
        <div className="hidden md:block md:col-span-2 bg-gre">
        
        <nav className=" flex flex-col items-center justify-center pt-4 ">
            {!user && <div className='w-10/12 shadow-md text-center font-semibold text-gray-900 cursor-pointer my-2 px-2 py-4 hover:bg-bre hover:text-white rounded-lg '><Link  to='/signup'>Sign up</Link></div>}
            {!user && <div className='w-10/12 shadow-md text-center font-semibold text-gray-900 cursor-pointer my-2 px-2 py-4 hover:bg-bre hover:text-white rounded-lg '><Link  to='/signin'>Log in</Link></div>}
            {user && <div className='w-10/12 shadow-md text-center font-semibold text-gray-900  cursor-pointer my-2 px-2 py-4 hover:bg-bre hover:text-white  rounded-lg '><Link  to='/post'>Create Tweet</Link></div>}
            {user && <div className='w-10/12 shadow-md text-center font-semibold text-gray-900  cursor-pointer my-2 px-2 py-4 hover:bg-bre hover:text-white  rounded-lg '>
            <button onClick={handleClick}>Log Out</button> 
            </div>}
          
        </nav>
    </div>
     );
}
 
export default Footer;
