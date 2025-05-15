import './App.css';
import MainRunner from './mainpage/MainRunner.jsx'; 
import MainFind from './mainpage/MainFind.jsx'; 
import SignIn from './mainpage/SignIn.jsx';
import SignUp from './mainpage/SignUp.jsx';
import PostRunner from './mainpage/PostRunner.jsx';
import PostFind from './mainpage/PostFind.jsx';
import EditRunner from './formpage/EditRunner.jsx';
import EditFind from './formpage/EditFind.jsx';
import AboutUs from './mainpage/AboutUs.jsx'; 
import FormFind from './formpage/FormFind.jsx'; 
import FormRunner from './formpage/FormRunner.jsx';
import Connect from './mainpage/Connect.jsx';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/mainrunner' element={<MainRunner />} />
      <Route path='/mainfind' element={<MainFind />} />
      <Route path='/postrunner' element={<PostRunner />} />
      <Route path='/postfind' element={<PostFind />} />
      <Route path='/editrunner' element={<EditRunner />} />
      <Route path='/editfind' element={<EditFind />} />
      <Route path='/formfind' element={<FormFind />} />
      <Route path='/formrunner' element={<FormRunner />} />
      <Route path='/aboutus' element={<AboutUs />} />
      <Route path='/connect' element={<Connect />} />
    </Routes>
  );
}
