import React, { useEffect } from 'react';

import { useState } from 'react'


import './App.css';
import api from './services/api';

//assets
import Logo from './assets/LinkLab.png'
import RingLoader from "react-spinners/RingLoader"


function App() {

  const [url,setUrl]= useState('')
  const [list, setList] =useState([])
  const [loading, setLoading]=useState(true)

  useEffect(()=>{  
     setLoading(true)  
    api.get('/url-short').then(response=>{
      const allLinks = response.data;
      console.log(allLinks)
      setList(allLinks)
    })   
    setTimeout(()=>setLoading(false),1500)   
  },[ ])

  function HandleForm(e){
    e.preventDefault()
    api.post('/url-short', {url: url}).then(() => {
       document.location.reload()
  }).catch(() => {
      alert('Erro ao criar link, tente novamente')
  })
  }   

  
  return (
    <div className="home-container">
      <div className="logo-top"><img alt="" src={Logo}/></div>
      <div className="input-box">
      <form onSubmit={HandleForm}>
      <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="URL"/>
      <button type="submit">Encolher</button>
     </form>
     </div>
     <div className="table-box">
     {loading ? (
       <RingLoader
       color={"#52e1b1"}
       />

     ):(  
       <table>
         <tbody>
         <tr>
           <th>URL</th>
           <th>Short</th>
         </tr>         
           {list.map(link=>{
             return(
               <tr key={link.id}>
               <td><a href={link.url}>{`${link.url.slice(0,30)}...`}</a></td>
               <td><a href={link.shortid}>{link.shortid}</a></td>
               </tr>
             )            
           })}
         </tbody>        
       </table> 
     )}   

     </div> 
    </div>
  );
}

export default App;
