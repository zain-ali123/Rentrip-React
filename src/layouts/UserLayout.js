import React from 'react'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

export const UserLayout = ({children}) => {
  return (
    <div>
      <div><NavBar/> </div>
      <div>{children}</div>
      <div><Footer/></div>
    </div>
  )
}
