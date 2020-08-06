import React, { useState, useEffect } from 'react'
import axios, { CancelTokenSource } from 'axios'
import { useIsMounted } from 'use-is-mounted'
import { setSessionAuth, AuthState } from '../hooks/phoenix/useSessionAuth'
import { connect } from '../hooks/phoenix/PhoenixConnect'

export const Login = () => {
  const [cancelSource, setCancelSource] = useState<CancelTokenSource | null>(
    null
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const isMounted = useIsMounted()
  const [helperText, setHelperText] = useState('')
  const [loading, setLoading] = useState(false)

  // If a request is in flight on unmount, cancel it
  useEffect(() => {
    return () => {
      if (cancelSource) {
        cancelSource.cancel('Previous Login attempt canceled.')
      }
    }
  })

  // disable the login button if either input is empty
  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [email, password])

  // stop the form from posting
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleLogin = () => {
    // cancel a previously in-flight request
    if (cancelSource) {
      cancelSource.cancel('Previous Login attempt canceled.')
    }
    // create a new source for this request
    const CancelToken = axios.CancelToken
    const newCancelSource = CancelToken.source()
    setCancelSource(newCancelSource)

    setLoading(true)
    connect(email, password, { CancelToken: newCancelSource.token })
      .then((res) => {
        if (!isMounted.current) {
          return
        }

        setCancelSource(null)
        console.log(res)

        if (
          res.status === 200 &&
          res.statusText === 'OK' &&
          res?.data?.data?.user?.email === email
        ) {
          setHelperText('Login Successful')
          setTimeout(() => {
            setLoading(false)
            setSessionAuth(AuthState.User)
          }, 1000)
        }
      })
      .catch((err) => {
        if (!isMounted.current) {
          return
        }

        setCancelSource(null)
        setLoading(false)
        setHelperText('Incorrect email or password')
      })
  }

  return (
    <React.Fragment>
      <form
        className="sling-login-form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <p>{helperText}</p>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Enter your password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleLogin}
          disabled={isButtonDisabled || loading}
          value="Login"
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
      </form>
    </React.Fragment>
  )
}
