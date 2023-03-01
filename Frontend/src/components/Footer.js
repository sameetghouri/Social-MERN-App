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
           </nav>
    </div>
     );
}
 
export default Footer;
