import React, { createContext, useEffect, useState } from 'react'
import { Socket } from 'phoenix'

export const PhoenixSocketContext = createContext<{socket: Socket | null}>({ socket: null })

type PSP = {
  endpoint: string
}

export const PhoenixSocketProvider: React.FC<PSP> = ({ endpoint, children }) => {
  const [socket, setSocket] = useState<Socket | null>()

  useEffect(() => {
    const socket = new Socket(endpoint)
    socket.connect()
    setSocket(socket)
  }, [endpoint])

  if (!socket) {
    return null
  }

  return (
    <PhoenixSocketContext.Provider value={{ socket }}>
      {children}
    </PhoenixSocketContext.Provider>
  )
}