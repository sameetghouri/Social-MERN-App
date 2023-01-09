import { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {  LOGIN } from "../redux/counter";
const Signin = () => {
    
    const [email, setemail]= useState("");
    const [pass, setpass] = useState("");
    const [error, seterror] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const dispatch = useDispatch();

    const handlesubmit =async (e) => {
      e.preventDefault();
      setisLoading(true)
      seterror(null)

      let bodyContent ={
        "email":email,
        "password":pass
      };
      let response = await fetch("/api/user/login", { 
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify( bodyContent ),
      });
      
      let json = await response.json();
      if (!response.ok) {
      setisLoading(false)
      seterror(json.error);}

    if(response.ok){
    localStorage.setItem('user',JSON.stringify(json))
    setemail('')
    setpass('')
    setisLoading(false)
    dispatch(LOGIN(json))
    }}
    
    return ( 
        <div className="col-span-4 flex items-center justify-center bg-gradient-to-t from-emerald-300 to-emerald-400 h-screen">               
        <div className="w-4/5 h-2/3 shadow-lg bg-gray-200 p-10 m-4 rounded-lg flex flex-col items-center ">
        
        <form onSubmit={handlesubmit} className="flex flex-col">  
        <label className=" mt-4 mb-1 text-lg text-center">User Name</label>
        <input className="p-2 rounded-lg shadow-lg" type="text" value={email} required onChange = {(e) => setemail(e.target.value)}/>
        
        <label className="mt-3 mb-1 text-lg text-center">Password</label>
        <input className="p-2 rounded-lg shadow-lg" type="password" value={pass} required onChange = {(e) => setpass(e.target.value)}/>
        {error && <div className="bg-red-200 text-red-700 p-4 mt-4 text-center">{error}</div>}
        <button disabled={isLoading} type="submit" className="bg-sky-400 mt-10 mx-12  px-4 py-2 rounded-r-full rounded-l-full cursor-pointer transform hover:scale-110 transition duration-100">Login</button>
        <div className='bg-sky-400 mt-4 mx-12  px-4 py-2 rounded-r-full rounded-l-full cursor-pointer transform hover:scale-110 transition duration-100 text-center'><Link  to='/signup'>Sign up</Link></div>
         </form>
    </div>
</div> 
     );
}
 
export default Signin;