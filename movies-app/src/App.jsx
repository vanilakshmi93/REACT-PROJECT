import { useState } from 'react'

import './App.css'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Movies from './components/Movies'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Watchlist from './components/WatchList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    

    <NavBar/>
    <Routes >
      <Route path="/" element = {
        <>
         <Banner />
         <Movies />
        </>

      }>

      </Route>

      <Route path="/watchlist" element = {
        
       <Watchlist />
        

      }>

      </Route>
   
    </Routes>
     

     
    
    </>
  )
}

export default App
