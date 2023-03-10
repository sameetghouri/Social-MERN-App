import { useState } from "react";
import { useDispatch} from "react-redux";
import {LOGIN} from "../redux/counter"
import Nav from "../components/Nav";
import { BiLoaderAlt } from "react-icons/bi";
const Signup = () => {
   
    const [newname, setnewname]= useState("");
    const [userimage, setuserimage] = useState('');
    const [password, setpassword] = useState("");
    const [email, setemail]= useState("");
    const [error, seterror] = useState(null)
    const [isLoading, setisLoading] = useState(false)
    const dispatch = useDispatch();

    const submitData =async (e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", newname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dp", userimage);

          let response = await fetch("api/user/signup", { 
            method: "POST",
            body: formData,
          })
          const json = await response.json()
          if (!response.ok) {
          setisLoading(false)
          seterror(json.error);
          }
          if(response.ok){
          localStorage.setItem('user',JSON.stringify(json))
          setnewname('')
          setemail('')
          setpassword('')
          setisLoading(false)
          dispatch(LOGIN(json))

  };
}    
    return ( 
      <div className="h-screen bg-gre col-span-4 sm:col-span-3 lg:col-span-2 ">
        <Nav/>
        <div className="flex flex-col items-center bg-gre pt-14">
   
        <form  className=" flex flex-col items-center shadow-lg bg-white py-6 px-10 rounded-lg" onSubmit={submitData}>
        <h1 className="mb-6 text-2xl text-center font-bold">Sign Up</h1>
        <input onChange={e => setnewname(e.target.value)} value={newname} required className='block rounded border bg-gre p-2 mb-2'  type="text" placeholder='Full Name' />
        <div className="flex items-center my-2 px-2 py-1 bg-gre rounded" >
        <label>Profile Picture</label>
        <input type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(e)=>setuserimage(e.target.files[0])} 
        className="  ml-2 px-3 py-1 w-36 rounded-full"
        required
        />
        </div>
        <input onChange={e => setemail(e.target.value)} value={email} required className='block rounded border bg-gre p-2 my-2' type="email" placeholder='Email' />
        <input onChange={e => setpassword(e.target.value)} value={password} required className='block rounded border bg-gre p-2 my-2' type="password" placeholder='Password' />
        {error && <div className="bg-red-200 text-red-700 p-4 text-center rounded-lg mt-3">{error}</div>}
        <button  disabled={isLoading} className='block rounded-lg border bg-sky-400 px-10 py-2 mt-5 mb-4 cursor-pointer transform hover:scale-110 transition duration-100' type="submit">Sign Up</button>
        {isLoading &&<div className="flex items-end justify-center ">
        <span className=" animate-spin text-sky-500 "><BiLoaderAlt className="h-10 w-10" /></span></div>}
        </form>    
        </div>
        </div> 
 );
}
 
export default Signup;