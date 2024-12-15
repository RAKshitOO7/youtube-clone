import React from 'react';
import Panel from './Panel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import logo from './images/logo.png';
import VideoPlayer from '../src/VideoPlayer';
import Search from './Search';
const App=()=>{

  return(
    <Router>
    <div className="min-h-screen bg-gray-900">
      <header className="shadow-sm shadow-zinc-500 py-4 flex text-left justify-start">
      <img src={logo} alt="logo" className="mr-2 h-10 w-18 ml-2"></img>
      <h1 className="font-bold font-sans text-slate-100 text-3xl">
        YouTube
      
      </h1>
      </header>
      <Panel/>
      <Routes>

        <Route path="/" element={<Search/>}/>
        <Route path="/video/:id" element={<VideoPlayer/>} />
      </Routes>
    </div>
    </Router>
    
  )
}
export default App;

