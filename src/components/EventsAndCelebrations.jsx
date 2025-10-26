import { useState } from 'react'
import useStore from '../lib/store'
import { Upload, Camera, Sparkles, Calendar, Heart, Gift } from 'lucide-react'

function EventsAndCelebrations({ canEdit = true }) {
  const { eventsData, updateEventsTask } = useStore()

  const handleInputChange = (taskId, field, value) => {
    if (!canEdit) return

    updateEventsTask(taskId, {
      [field]: value
    })
  }

  const handlePhotoUpload = async (taskId, event) => {
    if (!canEdit) return

    const file = event.target.files[0]
    if (!file) return

    const { uploadPhoto } = useStore.getState()
    const result = await uploadPhoto(file, taskId, 'events')

    if (result.success) {
      console.log('Photo uploaded successfully:', result.url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles size={24} />
          <h2 className="text-xl font-bold">🧸 Events & Celebrations</h2>
        </div>
        <p className="text-purple-100 text-sm leading-relaxed">
          <strong>👑 The Teddy Tracker</strong> 📍Your mission here: Spot the sparks. Capture the magic. Hold space for the smiles.
        </p>
        <p className="text-purple-100 text-xs mt-2 italic">
          This isn't admin. This is the heartbeat of culture. What did we make fun? What did we forget to mark? What deserves more glitter next time?
        </p>
      </div>

      {/* 1. Events You Organized This Month */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-yellow-600 font-bold">🎉</span>
          </div>
          <h3 className="font-semibold text-gray-800">1. Events You Organized This Month</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ✍️ What happened this month? (Activities, crafts, family days, internal fun — big or small)
            </label>
            <textarea
              value={eventsData?.organized?.description || ''}
              onChange={(e) => handleInputChange('organized', 'description', e.target.value)}
              disabled={!canEdit}
              placeholder="We turned the hallway into a jungle and the parents loved it..."
              className={`w-full p-3 border rounded-lg resize-none text-sm ${
                canEdit ? 'border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500' : 'bg-gray-50 border-gray-200'
              }`}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📸 Upload a photo or moment from one of the events:
            </label>
            <div className="flex items-center gap-3">
              <label className={`inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Camera size={16} />
                <span className="text-sm text-gray-600">Choose photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload('organized', e)}
                  disabled={!canEdit}
                  className="hidden"
                />
              </label>
              {eventsData?.organized?.photoUrl && (
                <img
                  src={eventsData.organized.photoUrl}
                  alt="Event photo"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <p className="text-xs text-purple-700">
              <strong>✅ Teddy Tip:</strong> Make this a story, not a list. "We had pancakes with the kids" is cute.
              But "We turned the hallway into a jungle and the parents loved it" → gold.
            </p>
          </div>
        </div>
      </div>

      {/* 2. What's Coming Next Month */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar size={16} className="text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800">📅 2. What's Coming Next Month?</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ✍️ What events or celebrations are being planned for next month? (name, prep status, who's helping, ideas still pending)
            </label>
            <textarea
              value={eventsData?.upcoming?.description || ''}
              onChange={(e) => handleInputChange('upcoming', 'description', e.target.value)}
              disabled={!canEdit}
              placeholder="Halloween party prep started, Sofia making decorations, still need more pumpkins..."
              className={`w-full p-3 border rounded-lg resize-none text-sm ${
                canEdit ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' : 'bg-gray-50 border-gray-200'
              }`}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📸 Upload moodboard, prep photo, or early sneak peek:
            </label>
            <div className="flex items-center gap-3">
              <label className={`inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Upload size={16} />
                <span className="text-sm text-gray-600">Choose photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload('upcoming', e)}
                  disabled={!canEdit}
                  className="hidden"
                />
              </label>
              {eventsData?.upcoming?.photoUrl && (
                <img
                  src={eventsData.upcoming.photoUrl}
                  alt="Upcoming event prep"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>✅ Teddy Tip:</strong> This is your early warning radar. Write down half-finished ideas — even if you're not sure yet.
              Next month you'll thank yourself.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Team Fun Moments */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Heart size={16} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800">🎈 3. Team Fun Moments</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ✍️ Did you do anything fun for or with the team this month? (a thank-you moment, surprise treat, after-work tea, anything that lifted the room)
            </label>
            <textarea
              value={eventsData?.teamFun?.description || ''}
              onChange={(e) => handleInputChange('teamFun', 'description', e.target.value)}
              disabled={!canEdit}
              placeholder="Brought surprise coffee for everyone after the long parent meeting..."
              className={`w-full p-3 border rounded-lg resize-none text-sm ${
                canEdit ? 'border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500' : 'bg-gray-50 border-gray-200'
              }`}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📸 Photo or moment:
            </label>
            <div className="flex items-center gap-3">
              <label className={`inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Camera size={16} />
                <span className="text-sm text-gray-600">Upload moment</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload('teamFun', e)}
                  disabled={!canEdit}
                  className="hidden"
                />
              </label>
              {eventsData?.teamFun?.photoUrl && (
                <img
                  src={eventsData.teamFun.photoUrl}
                  alt="Team moment"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-xs text-green-700">
              <strong>✅ Teddy Tip:</strong> Culture isn't built in meetings. It's in the cake someone brought, the surprise coffee run,
              the "we got this" moment. Log the glow.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Special Days & Holidays */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <Gift size={16} className="text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-800">💌 4. Special Days & Holidays</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ✍️ Was there a special day this month? (e.g. Teacher's Day, Valentine's, Easter, Christmas, Teddy's Birthday?)
            </label>
            <textarea
              value={eventsData?.specialDays?.occasion || ''}
              onChange={(e) => handleInputChange('specialDays', 'occasion', e.target.value)}
              disabled={!canEdit}
              placeholder="Teacher's Day - we surprised each other with handmade cards..."
              className={`w-full p-3 border rounded-lg resize-none text-sm ${
                canEdit ? 'border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'bg-gray-50 border-gray-200'
              }`}
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ✍️ What was planned and how did it go? (Did you mark it? Forget it? Celebrate it in your own way?)
            </label>
            <textarea
              value={eventsData?.specialDays?.description || ''}
              onChange={(e) => handleInputChange('specialDays', 'description', e.target.value)}
              disabled={!canEdit}
              placeholder="We didn't plan much, but Meral brought flowers and we made it special anyway..."
              className={`w-full p-3 border rounded-lg resize-none text-sm ${
                canEdit ? 'border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'bg-gray-50 border-gray-200'
              }`}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📸 Photo or memory from that day:
            </label>
            <div className="flex items-center gap-3">
              <label className={`inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <Camera size={16} />
                <span className="text-sm text-gray-600">Upload memory</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload('specialDays', e)}
                  disabled={!canEdit}
                  className="hidden"
                />
              </label>
              {eventsData?.specialDays?.photoUrl && (
                <img
                  src={eventsData.specialDays.photoUrl}
                  alt="Special day memory"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-xs text-red-700">
              <strong>✅ Teddy Tip:</strong> Even if it was small — a card, a smile, a playlist — it counts.
              These are the rhythm-keepers of the year.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 text-center">
        <p className="text-white font-medium mb-1">
          That's it. ✨
        </p>
        <p className="text-orange-100 text-sm leading-relaxed">
          You just logged the invisible threads that make a team feel alive. You didn't just track events — you honored culture.
        </p>
        <p className="text-white font-bold mt-2">
          💛 🧸 Teddy Kids — Where fun is serious business.
        </p>
      </div>
    </div>
  )
}

export default EventsAndCelebrations