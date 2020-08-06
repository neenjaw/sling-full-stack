import { useCallback } from 'react'
import { setSessionAuth } from './useSessionAuth'

export function useLogout() {
  return useCallback(() => setSessionAuth(null), [])
}
