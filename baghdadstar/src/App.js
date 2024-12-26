import './App.css';

import { WORKER } from './worker';
import {HEADER} from './header';
import {CONTENT} from './content';
import {FOOTER} from './footer';
import {ORDER} from './order';
import { SUBMIT } from './submit';

import React from 'react';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScrollProvider } from './scrollContext';

function App() {
  return (
    <Router>
    <HEADER />
    <Routes>
      <Route path='/' element={
      <>
      <CONTENT />
      </>}/>

      <Route path="/order" element={<ORDER />}/>
      <Route path="/order/worker" element={<WORKER />}/>
      <Route path="/order/worker/submit" element={<SUBMIT />}/>
    </Routes>
    <FOOTER />
  </Router>
    

  );
}

export default App;
