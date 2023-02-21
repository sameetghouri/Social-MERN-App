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
            <Link className='w-full text-center mb-2 font-bold  rounded px-2 py-4 text-4xl text-bre '  to='/'>OKPK</Link>
            {user && <Link className=" w-4/6  text-center my-2 rounded-lg  px-2 py-4  shadow-sm  bg-white pointer-cursor font-bold hover:text-bre" to='/'>NewsFeed</Link>}
            {user && <Link className="w-4/6  text-center my-2 rounded-lg  px-2 py-4 bg-white shadow-sm pointer-cursor font-bold hover:text-bre" to='/profile'>Profile</Link>}            
            {!user && <Link className="lg:hidden w-4/6 bg-white text-center my-2  rounded-lg  px-2 py-4 shadow-sm  pointer-cursor font-bold hover:text-bre" to='/signup'>Sign up</Link>}
            {!user && <Link className="lg:hidden w-4/6 bg-white text-center my-2  rounded-lg  px-2 py-4 shadow-sm pointer-cursor font-bold hover:text-bre" to='/signin'>Log in</Link>}
            {user && <Link className="lg:hidden w-4/6 bg-white text-center my-2  rounded-lg  px-2 py-4 shadow-sm  pointer-cursor font-bold hover:text-bre" to='/create'>Create Post</Link>}
            {user && <button className="lg:hidden w-4/6 bg-white text-center my-2  rounded-lg shadow-sm py-4 px-2  pointer-cursor font-bold hover:text-bre" onClick={handleClick}>Log Out</button>}
           
            </div>
            );
}
 
export default Navbar;