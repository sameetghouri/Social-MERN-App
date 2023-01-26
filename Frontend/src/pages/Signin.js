import { useState } from "react";
import {useDispatch} from "react-redux";
import Nav from "../components/Nav";
import {  LOGIN } from "../redux/counter";
import { BiLoaderAlt } from "react-icons/bi";
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
      <div className="h-screen bg-gre col-span-4 sm:col-span-3 lg:col-span-2 ">
     <Nav/>
      <div className="flex flex-col items-center bg-gre pt-20">             
        <h1 className="mb-6 text-2xl text-center">Log in</h1>
        <form onSubmit={handlesubmit} className="flex flex-col">  
        <input className="p-2 rounded-lg shadow-lg " type="text" placeholder='Email' value={email} required onChange = {(e) => setemail(e.target.value)}/>
        <input className="p-2 my-4 rounded-lg shadow-lg" type="password" placeholder='Password' value={pass} required onChange = {(e) => setpass(e.target.value)}/>
        {error && <div className="bg-red-200 text-red-700 p-4 mt-3 text-center rounded-lg">{error}</div>}
        <button disabled={isLoading} type="submit" className="bg-sky-400 my-5 mx-16 mb-4 px-4 py-2 rounded-lg cursor-pointer transform hover:scale-110 transition duration-100">Login</button>
        {isLoading &&<div className="flex items-end justify-center ">
        <span className=" animate-spin text-sky-500 "><BiLoaderAlt className="h-10 w-10" /></span></div>}
         </form>
    </div>
    
    </div> 
     );
}
 
export default Signin;