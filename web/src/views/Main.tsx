import React, { createContext } from 'react'
import { Login } from '../components/Login'
import { useIsLoggedIn } from '../hooks/phoenix/useIsLoggedIn'

export type User = {
  username: string
  email: string
}

export const Main = () => {
  const isLoggedIn = useIsLoggedIn()

  if (!isLoggedIn) {
    return <Login />
  }

  return
}
