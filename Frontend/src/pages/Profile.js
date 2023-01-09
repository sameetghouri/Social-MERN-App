
import {useSelector} from "react-redux";
import img1 from "../images/fdc.JPG"
const Profile = () => {
    const pname = useSelector((state)=>state?.counter?.value?.usernam)
    return ( 
    <div className="col-span-4 bg-gradient-to-t from-emerald-300 to-emerald-400 h-screen">
            
            <div className="flex flex-col ">
                            
                            <div className=" shadow-2xl  bg-gray-100 p-10 mx-5 mt-3  border-b-8 rounded-lg flex flex-col items-center ">
                                <div className="h-28 ">
                                <div className=" w-24 h-24 rounded-full overflow-hidden">
                                  <img  src={img1} alt="DP"></img> 
                                  </div>
                                  </div>
                                <div className="mt-4 font-bold text-lg text-center">{pname}</div>
                                <div className="text-center text-gray-800 mt-2">Profile Description</div>
                            </div>           
                    
            </div>
    </div> 
    );
}
 
export default Profile;