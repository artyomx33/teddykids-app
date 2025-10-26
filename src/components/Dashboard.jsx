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
    lastSaved,
    currentDate,
    canEditToday,
    isCurrentDay
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
                {format(currentDate, 'EEEE, MMM d, yyyy')}
                {!isCurrentDay() && (
                  <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    📅 Past Day
                  </span>
                )}
                {isCurrentDay() && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    ✅ Today
                  </span>
                )}
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

        {/* Midnight status notification */}
        {!canEditToday() && (
          <div className="px-4 pb-2">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-orange-700">
                <Clock size={16} />
                <span className="text-sm font-medium">
                  📅 This is a past day's report (read-only)
                </span>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                Data is automatically saved and locked at midnight each day.
              </p>
            </div>
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
        {activeTab === 'daily' && <DailyTasks canEdit={canEditToday()} />}
        {activeTab === 'weekly' && <WeeklyTasks canEdit={canEditToday()} />}
        {activeTab === 'monthly' && <MonthlyTasks canEdit={canEditToday()} />}
      </main>
      
      {/* Fixed Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 pb-8">
        <button
          onClick={handleSave}
          disabled={isSaving || !canEditToday()}
          className={`w-full flex items-center justify-center gap-2 ${
            canEditToday()
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSaving ? (
            <>
              <div className="animate-spin">⟳</div>
              <span>Saving...</span>
            </>
          ) : !canEditToday() ? (
            <>
              <Clock size={20} />
              <span>Past Day (Read-Only)</span>
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
