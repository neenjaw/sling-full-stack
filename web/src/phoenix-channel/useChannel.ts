import { useState, useContext, useEffect } from 'react'
import { PhoenixSocketContext } from './PhoenixSocketContext'
import { Channel } from 'phoenix'

export const useChannel = (channelName: string) => {
  const [channel, setChannel] = useState<Channel | null>()
  const { socket } = useContext(PhoenixSocketContext)

  useEffect(() => {
    const phoenixChannel = socket?.channel(channelName)

    phoenixChannel?.join().receive('ok', () => {
      setChannel(phoenixChannel)
    })

    return () => {
      phoenixChannel?.leave()
    }
  }, [])

  return [channel]
}