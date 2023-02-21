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
            {!user && <Link  className="w-3/5 bg-white shadow-sm text-center   my-2 px-2 py-4  rounded-lg pointer-cursor font-bold hover:text-bre" to='/signup'>Sign up</Link>}
            {!user && <Link  className="w-3/5 bg-white shadow-sm text-center my-2 px-2 py-4 rounded-lg pointer-cursor font-bold hover:text-bre" to='/signin'>Log in</Link>}
            {user && <Link  className="w-3/5 bg-white shadow-sm text-center text-g  my-2 px-2 py-4 rounded-lg pointer-cursor font-bold hover:text-bre " to='/create'>Create Post</Link>}
            {user && <button  className="w-3/5 bg-white shadow-sm text-center my-2 rounded-lg py-4 px-2 pointer-cursor font-bold hover:text-bre" onClick={handleClick}>Log Out</button>}
        </nav>
    </div>
     );
}
 
export default Footer;
