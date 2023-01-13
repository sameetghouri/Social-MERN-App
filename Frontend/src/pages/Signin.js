import { useState } from "react";
import {useDispatch} from "react-redux";
import {  LOGIN } from "../redux/counter";
import Footer from "../components/Footer";
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
      let response = await fetch("api/user/login", { 
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
     <div className="col-span-4">
     <div className="h-screen grid grid-cols-5 md:grid-cols-8">
      <div className="col-span-5 md:col-span-6 flex flex-col items-center  bg-gre ">               
       
        <h1 className="my-6 text-2xl text-center">Log in</h1>
        <form onSubmit={handlesubmit} className="flex flex-col">  
        <input className="p-2 rounded-lg shadow-lg " type="text" placeholder='Email' value={email} required onChange = {(e) => setemail(e.target.value)}/>
        
        <input className="p-2 my-4 rounded-lg shadow-lg" type="password" placeholder='Password' value={pass} required onChange = {(e) => setpass(e.target.value)}/>
        {error && <div className="bg-red-200 text-red-700 p-4 mt-3 text-center rounded-lg">{error}</div>}
        <button disabled={isLoading} type="submit" className="bg-sky-400 mt-5 mx-14  px-4 py-2 rounded-r-full rounded-l-full cursor-pointer transform hover:scale-110 transition duration-100">Login</button>
         </form>
    </div>
    <Footer/>
    </div>
    </div> 
     );
}
 
export default Signin;