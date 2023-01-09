import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Createpost from './pages/CreatePost';
import {useDispatch, useSelector} from "react-redux";
import {  LOGIN } from "./redux/counter";
import { useEffect } from 'react';


function App() {
  
  const dispatch = useDispatch()
  const token = useSelector((state)=>state?.counter?.token)

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
      dispatch(LOGIN(token))
    }
  },[dispatch])
  
  return (
    <div className='grid grid-cols-5'>
       
    <Router >
    <div className='col-span-1'><Navbar/></div>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/post' element={<Createpost/>} />
      
      
      <Route path='*' element={<div className="text-4xl text-center">Page Not Found</div>} />
    </Routes>
  </Router>
  </div>
   
  );
}

export default App;
