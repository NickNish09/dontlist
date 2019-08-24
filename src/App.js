import React, { useState, useEffect } from 'react';
import Todo from "./Todo";


function App() {
  if(window.location.pathname !== "/"){
    return <Todo/>
  }
  return <div><h1>Olá</h1></div>
}

export default App;
