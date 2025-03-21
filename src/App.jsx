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
import FullRecipe from './Pages/FullRecipe';
import UserProfile from './Pages/UserProfile';

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
      <Route path='/profile/:id' element={<UserProfile />} />
      <Route path ='/fullrecipe/:id' element={<FullRecipe />} />
     </Routes>
     </BrowserRouter>
    </div>
  );
};

export default App;