import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {  set_tweets, LOGOUT } from "../redux/counter";
import { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiPowerOff } from "react-icons/bi";
import { IoIosCreate }  from "react-icons/io";
const Nav = () => {
    const user = useSelector((state)=>state?.counter?.user)
    const dispatch = useDispatch();
    const [opennav, setopennav] = useState(true)

    const handleClick = ()=>{
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch(LOGOUT())
        dispatch(set_tweets([]))
    }
    const openfun = ()=>{ setopennav(!opennav)}

    return ( 
        
            <div className="sm:hidden relative bg-white w-full flex flex-col  items-start  rounded-lg">
            <div className=' text-center font-bold  rounded text-4xl text-bre px-3 py-2'><Link  to='/'>OKPK</Link></div>
            <div className="absolute right-1 p-2 ">
            <GoThreeBars className="w-10 h-10 p-2 cursor-pointer" onClick={openfun} />
            </div>
            
            {opennav && <div className=" flex items-center justify-center w-full ">
            {user && <div className='   hover:bg-bre hover:text-white rounded-lg  mb-1 mx-3  hover:shadow-lg '><Link  to='/'><AiFillHome className="w-11 h-11 p-2 cursor-pointer"/></Link></div>}
            {user && <div className='    hover:bg-bre hover:text-white  rounded-lg  mb-1 mx-3  hover:shadow-lg '><Link  to='/profile'><CgProfile className="w-11 h-11 p-2 cursor-pointer"/></Link></div>}            
            {!user && <div className='   hover:bg-bre hover:text-white  rounded-lg  mb-1 mx-3 py-2 hover:shadow-lg '><Link className=" p-4 pointer-cursor font-bold" to='/signup'>Sign up</Link></div>}
            {!user && <div className='   hover:bg-bre hover:text-white  rounded-lg  mb-1 mx-3 py-2 hover:shadow-lg '><Link className=" p-4 pointer-cursor font-bold" to='/signin'>Log in</Link></div>}
            {user && <div className='   hover:bg-bre hover:text-white  rounded-lg  mb-1 mx-3  hover:shadow-lg '><Link  to='/create'><IoIosCreate className="w-11 h-11 p-2 cursor-pointer"/></Link></div>}
            {user && <div className='  hover:bg-bre hover:text-white  rounded-lg  mb-1 mx-3  hover:shadow-lg '><BiPowerOff className="w-11 h-11 p-2 cursor-pointer"onClick={handleClick}/> </div>} 
            </div>}
            </div>
            
            
            );
}
 
export default Nav;