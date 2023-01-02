import Home from './Home';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Navbar from './Navbar';
import Profile from './Profile';
import Signup from './Signup';
import Signin from './Signin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Createpost from './CreatePost';


function App() {
  const client =new QueryClient(
    {defaultOptions:{
     queries:{
       refetchOnWindowFocus:false,
     }
    }})
  
  return (
    <div className='grid grid-cols-5'>
       <QueryClientProvider client={client}>
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
  </QueryClientProvider>
  </div>
   
  );
}

export default App;
