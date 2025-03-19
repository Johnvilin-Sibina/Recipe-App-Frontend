import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Signup />} path='/signup' />
      <Route element={<Signin />} path='/signin' />
      <Route element={<ForgotPassword />} path='/forgotpassword' />
      <Route element={<ResetPassword />} path='/resetpassword/:id/:token' />
     </Routes>
     </BrowserRouter>
    </div>
  );
};

export default App;