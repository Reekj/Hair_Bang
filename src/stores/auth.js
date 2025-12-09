import { ref, computed } from 'vue'

const user = ref(null)
const token = ref(localStorage.getItem('token') || null)
const isAdmin = ref(localStorage.getItem('isAdmin') === 'true')

export function useAuth() {
  const isLoggedIn = computed(() => !!token.value)

  function setUser(userData) {
    user.value = userData
    if (userData.token) {
      token.value = userData.token
      localStorage.setItem('token', userData.token)
    }
    if (userData.isAdmin) {
      isAdmin.value = userData.isAdmin
      localStorage.setItem('isAdmin', 'true')
    }
  }

  function logout() {
    user.value = null
    token.value = null
    isAdmin.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('user')
  }

  function restoreFromLocalStorage() {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    const savedIsAdmin = localStorage.getItem('isAdmin')

    if (savedUser && savedToken) {
      try {
        user.value = JSON.parse(savedUser)
        token.value = savedToken
        isAdmin.value = savedIsAdmin === 'true'
      } catch (e) {
        console.error('Failed to restore user from localStorage:', e)
        logout()
      }
    }
  }

  return {
    user,
    token,
    isAdmin,
    isLoggedIn,
    setUser,
    logout,
    restoreFromLocalStorage,
  }
}
