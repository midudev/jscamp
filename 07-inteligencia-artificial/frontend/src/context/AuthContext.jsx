import { createContext, use, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  const value = {
    isLoggedIn,
    login,
    logout
  }

  return <AuthContext value={value}>
    {children}
  </AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}