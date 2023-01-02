import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import {FiAperture} from 'react-icons/fi'

const Home = () => {
    const [array, setarray] = useState([])
    const [isloading, setisloading] = useState(true)
    
    
    // useEffect(() => {
    //     fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-10-10&sortBy=publishedAt&apiKey=60ce0ef784a54d7ba7443946d164458f')
    //     .then(res=>res.json())
    //     .then(data => {
    //         setarray(data.articles );
    //         setisloading(false)})
    // }, [])
    
console.log(array)
    return ( 
        <div className="col-span-4">
        <div className="h-screen grid grid-cols-5 md:grid-cols-8">
             
            <main className=" bg-emerald-300 col-span-5 md:col-span-6 flex flex-col items-center ">
            <h1 className="text-4xl text-center pt-4 pb-2 text-gray-800">NewsFeed</h1>
            
           
					<div className="w-full mr-9 flex justify-end ">
						<Link to="/post" className="block bg-gray-600 rounded-full my-2 py-2 px-4 font-semibold text-gray-100 cursor-pointer transform hover:scale-110 hover:bg-opacity-75 transition duration-100" >Create Post</Link>					
					</div>
				

				<div className="bg-gray-200 mx-4 mt-1 mb-4 rounded-2xl overflow-hidden shadow-lg">
				
                    {/* A Post	 */}
				    <div className="flex flex-col bg-gray-100  ">
					 
						<div className=" rounded">	
							<img src="https://source.unsplash.com/collection/494263/800x600" className="h-full w-full shadow-md"/>
						</div>

						<div className="flex flex-col ">
							<div className="flex flex-col bg-white rounded px-4 pt-4 overflow-hidden shadow-lg">
								
								<div className="w-full mb-2 -mt-1 font-semibold text-lg text-gray-900">Welcome fellow Tailwind CSS and Ghost fan</div>
								<label className=" text-gray-600 text-lg">Comments</label>
                                <p className="text-gray-800 font-serif text-base mb-5">
									This starter template is an attempt to replicate the default Ghost theme "Casper" using Tailwind CSS and vanilla Javascript.
								</p>
							</div>
                         
							<div className="flex flex-col items-center bg-white">
								<input className="py-2 px-2 w-11/12 border-2 border-gray-300 rounded-full" type="text" placeholder="Write Comment"/>
								<button className=" py-2 w-24 m-2 bg-slate-600 rounded-full cursor-pointer transform hover:scale-110 transition duration-100 text-gray-100">Post</button>
								
							</div>
						</div>

					 
				    </div>
                </div>
            
            
            
            {/* {isloading && <div className="flex mt-4 justify-center items-center gap-2 text-gray-800 text-3xl">
                            <span className="h-8 w-8 block rounded-full animate-spin text-white "><FiAperture /></span>
                            loading...</div>}
                            
            {array && array.map((item) =>{
               return( 
               <div className="bg-gray-100 m-3 p-4 rounded-lg shadow-md" >
               <h1 className="text-xl font-bold border-b-2 border-gray-300 text-center my-2 pb-2">{item.author}</h1>
               <h1 className="text-lg text-center mb-1 text-gray-800 font-semibold">{item.title}</h1>
               <p>{item.description}</p>                                            
               </div>)
            })} */}
            </main>
            
            <Footer />
        </div>
        </div>
     );
}
export default Home;
