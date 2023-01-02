import { Link } from "react-router-dom";

const Footer = () => {
    
    return ( 
        <div className="hidden md:block md:col-span-2 bg-gray-100">
        
        <nav className=" flex flex-col items-center pt-4 ">
            
            <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>A</Link></div>
            <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>B</Link></div>
          <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>C</Link></div>
          <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>D</Link></div>
          <div className='w-full text-center my-2  hover:bg-gre rounded px-2 py-4 shadow-sm'><Link  to='/'>E</Link></div>
          
            
        </nav>
    </div>
     );
}
 
export default Footer;
