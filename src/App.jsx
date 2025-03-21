import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import AddRecipe from './Pages/AddRecipe';
import Recipes from './Pages/Recipes';

const App = () => {
  return (
    <div>
     <BrowserRouter>
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
      <Route path='/addrecipe' element={<AddRecipe />} />
      <Route path='/recipes' element={< Recipes />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
};

export default App;