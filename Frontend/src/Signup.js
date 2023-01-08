import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";

const Signup = () => {
   
    const [newname, setnewname]= useState("");
    const [password, setpassword] = useState("");
    const [email, setemail]= useState("");
    const [error, seterror] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    

    const submitData = async (e)=>{
          e.preventDefault();
          setisLoading(true)
          seterror(null)
          let bodyContent = {
             "username":newname,
             "email":email,
             "password":password,  
           };
           
           let response = await fetch("/api/user/signup", { 
             method: "POST",
             headers:{'Content-Type':'application/json'},
             body: JSON.stringify(bodyContent),
             
           });
        const json = await response.json()

          if (!response.ok) {
            setisLoading(false)
            seterror(json.error);}

          if(response.ok){
          localStorage.setItem('token',JSON.stringify(json))
          setnewname('')
          setemail('')
          setpassword('')
          setisLoading(false)
          console.log("token:",json);
          }
          
           
         
    }
    
       
    return ( 
        <div className="col-span-4 flex items-center justify-center bg-gradient-to-t from-emerald-300 to-emerald-400 h-screen">
        <div className="w-4/5 h-11/12 shadow-lg bg-gray-200 p-8 rounded-lg overflow-hidden">
        <h1 className="mb-3 text-2xl text-center">Sign Up</h1>

        <form  className=" flex flex-col items-center" onSubmit={submitData}>
        <input onChange={e => setnewname(e.target.value)} value={newname} className='block rounded-lg border  p-2 my-2'  type="text" placeholder='Full Name' />
        
        <input onChange={e => setemail(e.target.value)} value={email} className='block rounded-lg border p-2 my-2' type="email" placeholder='Email' />
      
        <input onChange={e => setpassword(e.target.value)} value={password} className='block rounded-lg border  p-2 my-2' type="password" placeholder='Password' />
        
        <button disabled={isLoading}  className='block rounded-r-full rounded-l-full border bg-sky-400 px-6 py-2 my-4 cursor-pointer transform hover:scale-110 transition duration-100' type="submit">Sign Up</button>
        
        {error && <div className="bg-red-200 text-red-700 p-4">{error}</div>}
        </form>                      
                            
                            
                            
                                
                
        </div>
</div> 
 );
}
 
export default Signup;