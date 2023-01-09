import { Link } from "react-router-dom";

const Footer = () => {
    
    return ( 
        <div className="hidden md:block md:col-span-2 bg-gray-100">
        
        <nav className=" flex flex-col items-center pt-4 ">
            
            <div className='w-10/12 bg-gray-500 text-center font-semibold text-gray-100 cursor-pointer my-2 px-2 py-4 hover:bg-gray-400 rounded shadow-sm'><Link  to='/post'>Post Tweet</Link></div>
            <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>B</Link></div>
          <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>C</Link></div>
          <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>D</Link></div>
          <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>E</Link></div>
          
            
        </nav>
    </div>
     );
}
 
export default Footer;
