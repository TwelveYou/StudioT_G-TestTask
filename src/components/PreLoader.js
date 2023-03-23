import React from 'react'
import logo from '../data/PreLoader.svg';
import '../styles/PreLoader.css'

export default function PreLoader() {
  return (
    <div id='loader'>
        <img className="loader__icon" src={logo} alt={'лого'}/>
    </div>
  )
}