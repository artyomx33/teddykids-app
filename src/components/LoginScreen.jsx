import { useState } from 'react'
import useStore from '../lib/store'
import { User, Lock, AlertCircle } from 'lucide-react'

const teachers = [
  'Adela',
  'Christina',
  'Hanrike',
  'Meral',
  'Sofia'
]

function LoginScreen() {
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const login = useStore(state => state.login)
  
  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit
      setPin(newPin)
      
      // Auto-submit when 4 digits entered
      if (newPin.length === 4) {
        handleLogin(newPin)
      }
    }
  }
  
  const handleDelete = () => {
    setPin(pin.slice(0, -1))
    setError('')
  }
  
  const handleLogin = async (pinCode = pin) => {
    if (!selectedTeacher) {
      setError('Please select your name')
      return
    }
    
    if (pinCode.length !== 4) {
      setError('PIN must be 4 digits')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    const result = await login(selectedTeacher, pinCode)
    
    if (!result.success) {
      setError(result.error || 'Invalid PIN')
      setPin('')
    }
    
    setIsLoading(false)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teddy-orange/20 to-teddy-red/20 safe-area-inset">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Logo/Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-4">
            <img
              src="/teddy kids logo 256x256.jpg"
              alt="TeddyKids Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">TeddyKids</h1>
          <p className="text-gray-600 mt-1">Teacher Reporting</p>
        </div>
        
        {/* Teacher Selection */}
        <div className="w-full max-w-sm mb-6 animate-slide-up">
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
            <User size={20} />
            Select Your Name
          </label>
          <div className="grid grid-cols-2 gap-3">
            {teachers.map(teacher => (
              <button
                key={teacher}
                onClick={() => setSelectedTeacher(teacher)}
                className={`p-4 rounded-xl text-lg font-semibold transition-all shadow-md
                          active:scale-95 ${
                  selectedTeacher === teacher
                    ? 'bg-pink-500 text-white border-2 border-pink-600'
                    : 'bg-blue-500 text-white border-2 border-blue-600 hover:bg-blue-600'
                }`}
              >
                {teacher}
              </button>
            ))}
          </div>
        </div>
        
        {/* PIN Display */}
        <div className="w-full max-w-sm mb-6">
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-3">
            <Lock size={20} />
            Enter Your PIN
          </label>
          <div className="flex justify-center gap-3 mb-4">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                  pin[i] 
                    ? 'bg-teddy-red text-white border-teddy-red scale-110' 
                    : 'bg-white border-gray-300'
                }`}
              >
                {pin[i] ? '•' : ''}
              </div>
            ))}
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="w-full max-w-sm mb-4 p-3 bg-red-100 text-red-700 rounded-xl flex items-center gap-2 animate-fade-in">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        
        {/* PIN Keypad */}
        <div className="w-full max-w-sm">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
              <button
                key={digit}
                onClick={() => handlePinInput(digit.toString())}
                disabled={isLoading}
                className="h-16 bg-white rounded-xl text-2xl font-semibold text-gray-800 
                         active:scale-95 active:bg-gray-100 transition-all shadow-md
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={handleDelete}
              disabled={isLoading || !pin}
              className="h-16 bg-gray-200 rounded-xl text-gray-600 
                       active:scale-95 transition-all shadow-md
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={() => handlePinInput('0')}
              disabled={isLoading}
              className="h-16 bg-white rounded-xl text-2xl font-semibold text-gray-800 
                       active:scale-95 active:bg-gray-100 transition-all shadow-md
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              0
            </button>
            <button
              onClick={() => handleLogin()}
              disabled={isLoading || !selectedTeacher || pin.length !== 4}
              className="h-16 bg-teddy-green rounded-xl text-white font-semibold
                       active:scale-95 transition-all shadow-md
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin">⟳</div>
              ) : (
                '✓'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
