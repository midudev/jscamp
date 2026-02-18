import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  // Estado
  isLoggedIn: false,

  // Acciones
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false})
}))