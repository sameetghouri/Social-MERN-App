import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Createpost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import {useDispatch, useSelector} from "react-redux";
import {  LOGIN } from "./redux/counter";
import { useEffect } from 'react';
import Footer from './components/Footer';


function App() {
  
  const dispatch = useDispatch()
  const User = useSelector((state)=>state?.counter?.user)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch(LOGIN(user))
    }
  },[dispatch])
  
  return (
    <div className='grid grid-cols-4'>
       
    <Router >
    <div className='sm:col-span-1'><Navbar/></div>
    <Routes>
      <Route path='/' element={User ? <Home/> : <Navigate to="/signin"/>} />
      <Route path='/profile' element={User ? <Profile/> : <Navigate to="/signin"/>} />
      <Route path='/signin' element={!User ? <Signin/> : <Navigate to="/"/>} />
      <Route path='/signup' element={!User ? <Signup/> : <Navigate to="/"/>} />
      <Route path='/create' element={User ? <Createpost/> :  <Navigate to="/signin"/>} />
      <Route path='/edit/:id' element={User ?<EditPost/> :  <Navigate to="/signin"/>} />

      <Route path='*' element={<div className="text-4xl text-center col-span-4 mt-10">404 Page Not Found</div>} />
    </Routes>
    <div className='lg:col-span-1'><Footer/></div>
  </Router>
  </div>
   
  );
}

export default App;
