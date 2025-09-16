import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import { ComponentUsecount } from '../pages/chapter01/01_usecount';
import { ComponentChild } from '../pages/chapter01/02_child';
import { ComponentGlobal } from '../pages/chapter01/03_global';
import { ComponentUsestate } from '../pages/chapter01/04_usestate';
import { ComponentUsestate2 } from '../pages/chapter01/04_usestate2';
import { ComponentUsestate3 } from '../pages/chapter01/04_usestate3';
import { ComponentUsestate4 } from '../pages/chapter01/04_usestate4';
import { ComponentUsestate5 } from '../pages/chapter01/04_usestate5';
import { ComponentUsestate6 } from '../pages/chapter01/04_usestate6';

const Home = () => <div>Home page</div>;
const About = () => <div>About page</div>;

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/01_usecount' element={<ComponentUsecount />} />
      <Route path='/02_child' element={<ComponentChild />} />
      <Route path='/04_usestate' element={<ComponentUsestate />} />
      <Route path='/04_usestate2' element={<ComponentUsestate2 />} />
      <Route path='/04_usestate3' element={<ComponentUsestate3 />} />
      <Route path='/04_usestate4' element={<ComponentUsestate4 />} />
      <Route path='/04_usestate5' element={<ComponentUsestate5 />} />
      <Route path='/04_usestate6' element={<ComponentUsestate6 />} />
    </Routes>
  )
}

