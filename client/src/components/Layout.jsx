import React from 'react'
import Navbar from './Navbar';

export default function Layout({children}) {
  return (
    <>
    <div className="container mx-auto max-w-6xl px-3">
      <Navbar/>
      {children}
    </div>
    </>
  )
}
