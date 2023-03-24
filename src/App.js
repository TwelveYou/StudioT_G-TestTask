import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Characters from './components/Characters';
import Error404 from './components/Error404';
import PreLoader from './components/PreLoader';
import FullCard from './components/FullCard';




export default function App() {
  return (
    <div className='app'> 
      <FullCard/>
      <PreLoader/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Characters' element={<Characters/>}/>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </div>
  )
}