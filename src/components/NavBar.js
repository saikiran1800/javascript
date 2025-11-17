import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CreateUsers from './CreateUsers'; 
import UsersList from './UsersList';     


const NavBar = () => {
  return (
    <div>
      <BrowserRouter>
      <ul>
        <li><Link to="/create">CreateProduct</Link></li>
        <li><Link to="/list">UsersList</Link></li>

      </ul>
      <Routes>
        <Route path='/create' element={<CreateUsers/>}/>
         <Route path='/list' element={<UsersList/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default NavBar
