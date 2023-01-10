import { useState } from "react";

const Createpost = () => {
    
    
    const [newname, setnewname]= useState("");

    const handlesubmit = (e)=>{
        e.preventDefault();
    }

    return ( 
        <div className="col-span-4 flex items-center justify-center bg-gradient-to-t from-emerald-300 to-emerald-400 h-screen">
                     
        <div className="w-4/5 h-2/3 shadow-lg bg-gray-200 p-10 m-4 rounded-lg flex flex-col items-center ">
            <h1 className="m-3 text-2xl">Create Tweet</h1>
            
            <form onSubmit={handlesubmit} className="flex flex-col items-center w-full">
            
            <div className="relative w-5/6 flex justify-center">
            <textarea className="p-2 h-48 w-full rounded-lg shadow-lg" type="text" value={newname} required onChange = {(e) => setnewname(e.target.value)}></textarea>
            <button className="absolute left-1 bottom-1 bg-slate-400 px-2 rounded-full">IMG</button>
            </div>
            <button  className="bg-zinc-400 mt-10 mx-4 w-24 px-4 py-2 rounded-r-full rounded-l-full cursor-pointer transform hover:scale-110 transition duration-100">Post</button>
            </form>
        </div>
</div> 
     );
}
 
export default Createpost;