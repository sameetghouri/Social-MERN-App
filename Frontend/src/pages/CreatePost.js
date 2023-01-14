import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Createpost = () => {
    const user = useSelector((state)=>state?.counter?.user)
    const [tweetbody, settweetbody]= useState("");
    const [tweetimage, settweetimage]= useState("");
   

    const handlesubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('tweetbody', tweetbody);
        formData.append('dp', user?.dp);
        formData.append('postpic', tweetimage);

        axios("api/tweet", {
            headers: {'content-type': 'multipart/form-data',
                      'authorization': `Bearer ${user?.token}`},
            data:formData,
            method:"POST"
            })
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)});
        settweetbody("");
        settweetimage("");

    };
    

    return ( 
        <div className="col-span-4">
       <div className="h-screen grid grid-cols-5 md:grid-cols-8">
        <div className="col-span-5 md:col-span-6 flex flex-col items-center  bg-gre ">
                     
            <h1 className="m-3 text-2xl">Create Tweet</h1>
            
            <form onSubmit={handlesubmit} className="flex flex-col items-center w-4/5 ">
            
            <textarea className="p-2 h-48 w-full rounded-lg shadow-lg" type="text" value={tweetbody} onChange = {(e) => settweetbody(e.target.value)}></textarea>
            <input type="file"
             accept=".png, .jpg, .jpeg"
             onChange={(e)=>settweetimage(e.target.files[0])} 
             className="bg-gray-300 mt-2 px-3 py-1 w-2/3 rounded-full"
             />
            <button type="submit" className=" bg-bre text-white mt-8 mx-4 w-24 px-4 py-2 rounded-r-full rounded-l-full cursor-pointer transform hover:scale-110 transition duration-100">Post</button>
            </form>
        </div>
        <Footer/>
        </div>
        </div> 
     );
}
 
export default Createpost;