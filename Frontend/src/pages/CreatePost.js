import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const Createpost = () => {
    const user = useSelector((state)=>state?.counter?.user)
    const [tweetbody, settweetbody]= useState("");
    const [tweetimage, settweetimage]= useState("");
    const [tweetpic, settweetpic]= useState("");
    const navigate = useNavigate();

    const handlesubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('tweetbody', tweetbody);
        formData.append('dp', user?.dp);
        formData.append('postpic', tweetimage);

        fetch("/api/tweet", {
            headers: {'authorization': `Bearer ${user?.token}`},
            body:formData,
            method:"POST"
            })
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)});
        settweetbody("");
        settweetimage("");
        settweetpic("");
        navigate("/");

    };
    const onImageChange = (e) => {
          settweetpic(URL.createObjectURL(e.target.files[0]));
          settweetimage(e.target.files[0])
       }
    return ( 
        <div className="h-screen bg-gre col-span-4 sm:col-span-3 lg:col-span-2 ">
        <Nav/>
        <div className="flex flex-col items-center  bg-gre ">    <h1 className="m-3 text-2xl">Create Tweet</h1>
        <form onSubmit={handlesubmit} className="flex flex-col items-center w-10/12 ">
        <textarea className="p-2 h-48 w-full rounded-lg shadow-lg" type="text" value={tweetbody} onChange = {(e) => settweetbody(e.target.value)}></textarea>
        {tweetpic && <img src={tweetpic} alt="postpic" className="w-3/5 mt-1 rounded-lg shadow-lg"/>}
        <input type="file"
        accept=".png, .jpg, .jpeg"
        onChange={onImageChange} 
        className="bg-gray-300 mt-2 px-3 py-1 w-1/2 rounded-full"
        />
        <button type="submit" className=" bg-bre text-white my-4 mx-4 w-24 px-4 py-2 rounded-r-full rounded-l-full cursor-pointer transform hover:scale-110 transition duration-100">Post</button>
        </form>
        </div>
        
        </div> 
     );
}
 
export default Createpost;