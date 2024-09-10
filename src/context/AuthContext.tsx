'use client'

import { makeRequest } from '@/lib/network/makeRequest'
import { useRouter } from 'next/navigation'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

type TAuthContext = {
  isAuthenticated: boolean
  logout: () => Promise<void>
  login: (password: string) => Promise<{
    message: string
    status: number
  }>
}

const AuthContext = createContext<TAuthContext>({
  isAuthenticated: false,
  logout: async () => undefined,
  login: async () => ({ message: '', status: 200 })
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await makeRequest<Response>({
          endpoint: '/api/auth/check',
          method: 'HEAD'
        })

        const isAuth = res.headers.get('x-user-authenticated')

        if (isAuth && JSON.parse(isAuth)) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error checking authentication status:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      const response = await makeRequest<{ status: number; message: string }>({
        endpoint: '/api/auth/logout',
        method: 'DELETE'
      })

      if (response.status !== 200) throw new Error(response.message)

      setIsAuthenticated(false)
      return router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const login = async (password: string) => {
    const response = await makeRequest<{
      status: number
      accessToken: string
      message: string
    }>({
      endpoint: '/api/auth/login',
      method: 'POST',
      body: { password }
    })

    if (response.status === 200) setIsAuthenticated(true)

    return response
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
