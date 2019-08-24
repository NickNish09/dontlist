import React, { useState, useEffect } from 'react';
import Todo from "./Todo";
import Home from './Home';


function App() {
  if(window.location.pathname !== "/"){
    return <Todo/>
  }
  return <Home/>
}

export default App;
