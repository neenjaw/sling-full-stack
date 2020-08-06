import { useSessionAuth } from './useSessionAuth'

export function useIsLoggedIn() {
  const sessionAuth = useSessionAuth()
  return !!sessionAuth
}
