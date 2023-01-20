import { useState,useEffect } from "react";
import {useParams}  from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
const EditPost = () => {
    const {id} = useParams();
    const user = useSelector((state)=>state?.counter?.user)
    const [tweetbody, settweetbody]= useState("");
    const [tweetimage, settweetimage]= useState(null);
    const [oldtweetpic, setoldtweetpic]= useState(null);
    const [newtweetpic, setnewtweetpic]= useState(null);
   const navigate = useNavigate();
    useEffect(()=>{
        if(user)
        {fetch(`/api/tweet/single/${id}`,{
                headers:{
                    'Authorization':`Bearer ${user?.token}`
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                settweetbody(data.tweetbody);
                setoldtweetpic(data.tweetimage);
                
            })
            .catch((err)=>console.log(err))
        }
    },[user,id])

    const handleEdit =async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('tweetbody', tweetbody);
        if(tweetimage){formData.append('postpic', tweetimage)}

       await fetch(`/api/tweet/update/${id}`, {
            headers: {
                      'authorization': `Bearer ${user?.token}`},
            method:"PATCH",
            body:formData,
            })
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)});
        settweetbody("");
        settweetimage("");
        setoldtweetpic("");
        setnewtweetpic("");
        navigate(`/profile`)

    };
    const onImageChange = (e) => {
        setnewtweetpic(URL.createObjectURL(e.target.files[0]));
        settweetimage(e.target.files[0])
     }

    return ( 
        <div className="h-screen bg-gre col-span-4 sm:col-span-3 lg:col-span-2 ">
       <Nav/>
        <div className="flex flex-col items-center  bg-gre ">
                     
            <h1 className="m-3 text-2xl">Edit Tweet</h1>
            
            <form onSubmit={handleEdit} className="flex flex-col items-center w-4/5 ">
            
            <textarea className="p-2 h-44 w-full rounded-lg shadow-lg" type="text" value={tweetbody} onChange = {(e) => settweetbody(e.target.value)}></textarea>
            {!newtweetpic && oldtweetpic && <img src={`/PostPics/${oldtweetpic}`} alt="postpic" className="w-3/5 mt-1 rounded-lg shadow-lg"/>}
            {newtweetpic && <img src={newtweetpic} alt="postpic" className="w-3/5 mt-1 rounded-lg shadow-lg"/>}
            <input type="file"
             accept=".png, .jpg, .jpeg"
             onChange={onImageChange} 
             className="bg-gray-300 mt-2 px-3 py-1 w-2/3 rounded-full"
             />
            <button type="submit" className=" bg-bre text-white my-4 mx-4 w-24 px-4 py-2 rounded-r-full rounded-l-full cursor-pointer transform hover:scale-110 transition duration-100">Update</button>
            </form>
        </div>
        
        </div> 
     );
}
 
export default EditPost;