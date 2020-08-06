import { useState, useLayoutEffect } from 'react'

export enum AuthState {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN',
}

type SessionAuth = AuthState
type SessionAuthListener = (next: SessionAuth | null) => void

const GLOBAL_SESSION_AUTH: { current: null | SessionAuth } = { current: null }

const listeners: SessionAuthListener[] = []

export function setSessionAuth(next: SessionAuth | null) {
  GLOBAL_SESSION_AUTH.current = next
  listeners.forEach((listener) => listener(next))
}

export function useSessionAuth() {
  const [auth, setAuth] = useState(GLOBAL_SESSION_AUTH.current)

  useLayoutEffect(() => {
    listeners.push(setAuth)

    // clean up listeners
    return () => {
      listeners.splice(listeners.indexOf(setAuth), 1)
    }
  }, [setAuth])

  return auth
}
