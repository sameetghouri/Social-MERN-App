import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";

const Signup = () => {
   
    const [newname, setnewname]= useState("");
    const [password, setpassword] = useState("");
    const [email, setemail]= useState("");
    const [age, setage]= useState("");

    

    const submitData = async ()=>{
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "name":newname,
             "email":email,
             "password":password,
             
           });
           
           let response = await fetch("http://Localhost:3001/users/register", { 
             method: "POST",
             body: bodyContent,
             headers: headersList
           });
           
           let reponsedata = await response.text();
           console.log("Hello from DF",  reponsedata);
    }
    
       
    return ( 
        <div className="col-span-4 flex items-center justify-center bg-gradient-to-t from-emerald-300 to-emerald-400 h-screen">
        <div className="w-4/5 h-11/12 shadow-lg bg-gray-200 p-8 rounded-lg overflow-hidden">
        <h1 className="mb-3 text-2xl text-center">Sign Up</h1>
            <form  className=" flex flex-col items-center" >
        
        <input className='block rounded-lg border  p-2 my-2'  type="text" placeholder='Full Name' />
        
        <input className='block rounded-lg border p-2 my-2' type="text" placeholder='Email' />
      
        <input className='block rounded-lg border  p-2 my-2' type="password" placeholder='Password' />
        
        <button className='block rounded-r-full rounded-l-full border bg-sky-400 px-6 py-2 my-4 cursor-pointer transform hover:scale-110 transition duration-100' type="submit">Sign Up</button>
        {/* <input className='block rounded-lg border  px-2 py-2 my-2' type="submit" /> */}
        </form>                      
                            
                            
                            
                                
                
        </div>
</div> 
 );
}
 
export default Signup;