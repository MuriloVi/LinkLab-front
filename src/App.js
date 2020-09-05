import React from 'react';
import Logo from './assets/LinkLab.png'

import './App.css';
import api from './services/api';


function App() {

  function HandleForm(e){
    e.preventDefault()
    console.log('OK!')
  }
  return (
    <div className="home-container">
      <div className="logo-top"><img alt="" src={Logo}/></div>
      <div className="input-box">
      <form onSubmit={HandleForm}>
      <input placeholder="URL"/>
      <button type="submit">Encolher</button>
     </form>

      </div>
    
    </div>
  );
}

export default App;
