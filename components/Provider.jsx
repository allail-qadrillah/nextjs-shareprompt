"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { startSession } from 'mongoose'


const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={startSession}> 
      { children }
    </SessionProvider>
  )
}

export default Provider