import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import { Notfound } from '../pages/etc/notfound';
import { ComponentUsecount } from '../pages/chapter01/01_usecount';
import { ComponentChild } from '../pages/chapter01/02_child';
import { ComponentGlobal } from '../pages/chapter01/03_global';
import { ComponentUsestate } from '../pages/chapter01/04_usestate';
import { ComponentUsestate2 } from '../pages/chapter01/04_usestate2';
import { ComponentUsestate3 } from '../pages/chapter01/04_usestate3';
import { ComponentUsestate4 } from '../pages/chapter01/04_usestate4';
import { ComponentUsestate5 } from '../pages/chapter01/04_usestate5';
import { ComponentUsestate6 } from '../pages/chapter01/04_usestate6';
import { ComponentUsestate7 } from '../pages/chapter01/04_usestate7';
import { ComponentUsereducer } from '../pages/chapter01/05_usereducer';
import { ComponentUsereducerEx1 } from '../pages/chapter01/05_usereducer_ex1';
import { ComponentUsereducerEx2 } from '../pages/chapter01/05_usereducer_ex2';
import { ComponentUsereducer2 } from '../pages/chapter01/05_usereducer2';
import { ComponentUsereducer3 } from '../pages/chapter01/05_usereducer3';
import { ComponentUsereducer4 } from '../pages/chapter01/05_usereducer4';
import { Component1Example } from '../pages/chapter01/06_example';
import { Component1Example2 } from '../pages/chapter01/06_example2';
import { Component1Example3 } from '../pages/chapter01/06_example3';
import { Component1Example4 } from '../pages/chapter01/06_example4';
import { JavascriptVsReact } from '../pages/chapter02/01_javascriptVsReact';
import { StateRegion } from '../pages/chapter02/02_stateRegion';
import { StateGlobal } from '../pages/chapter02/03_stateGlobal';
import { ComponentUsecontext } from '../pages/chapter03/01_usecontext';
import { ComponentUsecontext2 } from '../pages/chapter03/02_usecontext2';
import { ComponentUsecontext3 } from '../pages/chapter03/03_usecontext3';
import { ComponentUsecontext4 } from '../pages/chapter03/04_usecontext4';
import { ComponentUsecontext5 } from '../pages/chapter03/05_usecontext5';
import { ComponentUsecontext6 } from '../pages/chapter03/06_usecontext6';

const Home = () => <div>Home page</div>;
const About = () => <div>About page</div>;

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/chapter01'>
        <Route path='01_usecount' element={<ComponentUsecount />} />
        <Route path='02_child' element={<ComponentChild />} />
        <Route path='03_global' element={<ComponentGlobal />} />
        <Route path='04_usestate' element={<ComponentUsestate />} />
        <Route path='04_usestate2' element={<ComponentUsestate2 />} />
        <Route path='04_usestate3' element={<ComponentUsestate3 />} />
        <Route path='04_usestate4' element={<ComponentUsestate4 />} />
        <Route path='04_usestate5' element={<ComponentUsestate5 />} />
        <Route path='04_usestate6' element={<ComponentUsestate6 />} />
        <Route path='04_usestate7' element={<ComponentUsestate7 />} />
        <Route path='05_usereducer' element={<ComponentUsereducer />} />
        <Route path='05_usereducer_ex1' element={<ComponentUsereducerEx1 />} />
        <Route path='05_usereducer_ex2' element={<ComponentUsereducerEx2 />} />
        <Route path='05_usereducer2' element={<ComponentUsereducer2 />} />
        <Route path='05_usereducer3' element={<ComponentUsereducer3 />} />
        <Route path='05_usereducer4' element={<ComponentUsereducer4 />} />
        <Route path='06_example' element={<Component1Example />} />
        <Route path='06_example2' element={<Component1Example2 />} />
        <Route path='06_example3' element={<Component1Example3 />} />
        <Route path='06_example4' element={<Component1Example4 />} />
      </Route>
      <Route path='/chapter02'>
        <Route path='01_javascriptVsReact' element={<JavascriptVsReact />} />
        <Route path='02_stateRegion' element={<StateRegion />} />
        <Route path='03_stateGlobal' element={<StateGlobal />} />
      </Route>
      <Route path='/chapter03'>
        <Route path='01_usecontext' element={<ComponentUsecontext />} />
        <Route path='02_usecontext2' element={<ComponentUsecontext2 />} />
        <Route path='03_usecontext3' element={<ComponentUsecontext3 />} />
        <Route path='04_usecontext4' element={<ComponentUsecontext4 />} />
        <Route path='05_usecontext5' element={<ComponentUsecontext5 />} />
        <Route path='06_usecontext6' element={<ComponentUsecontext6 />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}

