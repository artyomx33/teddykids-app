import { useEffect } from 'react'
import useStore from './lib/store'
import LoginScreen from './components/LoginScreen'
import Dashboard from './components/Dashboard'
import { Loader2 } from 'lucide-react'

function App() {
  const { isAuthenticated, teacher, saveProgress } = useStore()
  
  // Auto-save every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return
    
    const interval = setInterval(() => {
      saveProgress()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [isAuthenticated, saveProgress])
  
  // Auto-logout at midnight
  useEffect(() => {
    if (!isAuthenticated) return
    
    const checkMidnight = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const msUntilMidnight = midnight.getTime() - now.getTime()
      
      setTimeout(() => {
        useStore.getState().logout()
      }, msUntilMidnight)
    }
    
    checkMidnight()
  }, [isAuthenticated])
  
  if (isAuthenticated && teacher) {
    return <Dashboard />
  }
  
  return <LoginScreen />
}

export default App
