import { useState } from 'react'
import useStore from '../lib/store'
import DailyTasks from './DailyTasks'
import WeeklyTasks from './WeeklyTasks'
import MonthlyTasks from './MonthlyTasks'
import { Calendar, Save, LogOut, CheckCircle, Clock } from 'lucide-react'
import { format } from 'date-fns'

function Dashboard() {
  const { 
    teacher, 
    activeTab, 
    setActiveTab, 
    saveProgress, 
    logout,
    isSaving,
    lastSaved 
  } = useStore()
  
  const [showSuccess, setShowSuccess] = useState(false)
  
  const handleSave = async () => {
    const result = await saveProgress()
    if (result.success) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }
  
  const tabs = [
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: Calendar },
    { id: 'monthly', label: 'Monthly', icon: Calendar }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50 safe-area-inset">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Hi, {teacher.name}! 👋
              </h1>
              <p className="text-sm text-gray-600">
                {format(new Date(), 'EEEE, MMM d')}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-teddy-red shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Last saved indicator */}
        {lastSaved && (
          <div className="px-4 pb-2 flex items-center gap-2 text-xs text-gray-500">
            <Clock size={12} />
            Last saved: {format(new Date(lastSaved), 'HH:mm')}
          </div>
        )}
      </header>
      
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-slide-up">
          <div className="bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle size={20} />
            <span className="font-medium">Progress saved successfully!</span>
          </div>
        </div>
      )}
      
      {/* Content */}
      <main className="px-4 py-4 pb-24">
        {activeTab === 'daily' && <DailyTasks />}
        {activeTab === 'weekly' && <WeeklyTasks />}
        {activeTab === 'monthly' && <MonthlyTasks />}
      </main>
      
      {/* Fixed Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 pb-8">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin">⟳</div>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>Save Progress</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Dashboard
