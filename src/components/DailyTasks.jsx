import useStore from '../lib/store'
import { Check, Camera, MessageSquare, Users, Shield, ClipboardList, AlertCircle, Eye, Heart } from 'lucide-react'

const protocolOptions = [
  { value: 'pickup-safety', color: 'red', label: 'Pick-up Safety' },
  { value: 'medication-flow', color: 'orange', label: 'Medication Flow' },
  { value: 'incident-reporting', color: 'yellow', label: 'Incident Reporting' },
  { value: 'visitor-signin', color: 'green', label: 'Visitor Sign-in' },
  { value: 'ratios-attendance', color: 'blue', label: 'Ratios & Attendance' },
  { value: 'digital-privacy', color: 'purple', label: 'Digital Privacy' },
  { value: 'evacuation-plan', color: 'gray', label: 'Evacuation Plan' },
  { value: 'other', color: 'gray', label: 'Other' }
]

function DailyTasks() {
  const { dailyTasks, updateDailyTask, teacher, uploadPhoto } = useStore()

  const handleOptionChange = (taskId, field, value) => {
    updateDailyTask(taskId, {
      [field]: value,
      updatedAt: new Date().toISOString()
    })
  }

  const handleNoteChange = (taskId, field, value) => {
    updateDailyTask(taskId, {
      [field]: value,
      updatedAt: new Date().toISOString()
    })
  }

  const handlePhotoUpload = async (taskId, event) => {
    const file = event.target.files[0]
    if (!file) return

    const result = await uploadPhoto(file, taskId, 'daily')
    if (result.success) {
      // Photo URL is automatically added to the task by the store
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teddy-red to-teddy-orange rounded-xl p-4 text-white">
        <h1 className="text-xl font-bold mb-2">🧸 Daily Head Teacher Tasks — RB3 / RB5</h1>
        <p className="text-sm opacity-90">👑 The Teddy Command Deck</p>
        <p className="text-xs opacity-80">📍 Your mission today: <strong>Light feet. Sharp eye.</strong></p>
        <p className="text-xs opacity-80">Be the first to notice… and the last to forget.</p>
      </div>

      {/* 1. Floor Check: Morning Pulse */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Eye className="text-teddy-blue" size={20} />
          🌅 Floor Check: Morning Pulse (1–2h Walkaround)
        </h2>
        <p className="text-sm text-gray-600 mb-4 italic">Teddyverse motto: The magic is in the micro.</p>

        <div className="space-y-4">
          {/* RB3 Visit */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Did you visit every room at RB3?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('rb3_visit', 'status', 'yes')}
                className={
                  dailyTasks.rb3_visit?.status === 'yes'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes, every room
              </button>
              <button
                onClick={() => handleOptionChange('rb3_visit', 'status', 'missed')}
                className={
                  dailyTasks.rb3_visit?.status === 'missed'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Missed one (note why)
              </button>
            </div>
            <textarea
              placeholder="✍️ Notes: What stood out? Any tension? Smiles? Noise? Surprises? Is it clean or cluttered?"
              value={dailyTasks.rb3_visit?.note || ''}
              onChange={(e) => handleNoteChange('rb3_visit', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
            <label className="flex items-center gap-2 text-sm text-blue-600 mt-2 cursor-pointer">
              <Camera size={16} />
              <span>📸 Snap a pic if relevant</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handlePhotoUpload('rb3_visit', e)}
                className="hidden"
              />
            </label>
            {dailyTasks.rb3_visit?.photoUrl && (
              <img
                src={dailyTasks.rb3_visit.photoUrl}
                alt="RB3 visit"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* RB5 Visit */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Did you visit every room at RB5?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('rb5_visit', 'status', 'yes')}
                className={
                  dailyTasks.rb5_visit?.status === 'yes'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes, RB5's flowing
              </button>
              <button
                onClick={() => handleOptionChange('rb5_visit', 'status', 'off')}
                className={
                  dailyTasks.rb5_visit?.status === 'off'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Something's off 📝
              </button>
            </div>
            {dailyTasks.rb5_visit?.status === 'off' && (
              <textarea
                placeholder="✍️ Notes: Who needed support today? What little thing went right?"
                value={dailyTasks.rb5_visit?.note || ''}
                onChange={(e) => handleNoteChange('rb5_visit', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
            <label className="flex items-center gap-2 text-sm text-blue-600 mt-2 cursor-pointer">
              <Camera size={16} />
              <span>📸 Snap a pic if relevant</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handlePhotoUpload('rb5_visit', e)}
                className="hidden"
              />
            </label>
            {dailyTasks.rb5_visit?.photoUrl && (
              <img
                src={dailyTasks.rb5_visit.photoUrl}
                alt="RB5 visit"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Kitchen Check */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Kitchen area — did anything stand out?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('kitchen_check', 'status', 'fine')}
                className={
                  dailyTasks.kitchen_check?.status === 'fine'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                All looked fine
              </button>
              <button
                onClick={() => handleOptionChange('kitchen_check', 'status', 'off')}
                className={
                  dailyTasks.kitchen_check?.status === 'off'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Something's off 📝
              </button>
            </div>
            {dailyTasks.kitchen_check?.status === 'off' && (
              <textarea
                placeholder="✍️ Notes: Something missing? Dirty? Equipment broken?"
                value={dailyTasks.kitchen_check?.note || ''}
                onChange={(e) => handleNoteChange('kitchen_check', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
            <label className="flex items-center gap-2 text-sm text-blue-600 mt-2 cursor-pointer">
              <Camera size={16} />
              <span>📸 Snap a pic if relevant</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handlePhotoUpload('kitchen_check', e)}
                className="hidden"
              />
            </label>
            {dailyTasks.kitchen_check?.photoUrl && (
              <img
                src={dailyTasks.kitchen_check.photoUrl}
                alt="Kitchen check"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Hallway Check */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Hallway — did anything stand out?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('hallway_check', 'status', 'fine')}
                className={
                  dailyTasks.hallway_check?.status === 'fine'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                All looked fine
              </button>
              <button
                onClick={() => handleOptionChange('hallway_check', 'status', 'off')}
                className={
                  dailyTasks.hallway_check?.status === 'off'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Something's off 📝
              </button>
            </div>
            {dailyTasks.hallway_check?.status === 'off' && (
              <textarea
                placeholder="✍️ Notes: Any clutter, smell, noise, missing items?"
                value={dailyTasks.hallway_check?.note || ''}
                onChange={(e) => handleNoteChange('hallway_check', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
            <label className="flex items-center gap-2 text-sm text-blue-600 mt-2 cursor-pointer">
              <Camera size={16} />
              <span>📸 Snap a pic if relevant</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handlePhotoUpload('hallway_check', e)}
                className="hidden"
              />
            </label>
            {dailyTasks.hallway_check?.photoUrl && (
              <img
                src={dailyTasks.hallway_check.photoUrl}
                alt="Hallway check"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* BSO Drop-off */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">👀 BSO Drop-off Flow</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('bso_dropoff', 'status', 'calm')}
                className={
                  dailyTasks.bso_dropoff?.status === 'calm'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Calm & friendly
              </button>
              <button
                onClick={() => handleOptionChange('bso_dropoff', 'status', 'chaotic')}
                className={
                  dailyTasks.bso_dropoff?.status === 'chaotic'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Bit chaotic 📝
              </button>
            </div>
            {dailyTasks.bso_dropoff?.status === 'chaotic' && (
              <textarea
                placeholder="✍️ Notes: Who helped? What parent needed extra time?"
                value={dailyTasks.bso_dropoff?.note || ''}
                onChange={(e) => handleNoteChange('bso_dropoff', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Safety Issues */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">⚠️ Anything unsafe or unusual you noticed today?</p>
            <div className="flex gap-3 mb-2 flex-wrap">
              <button
                onClick={() => handleOptionChange('safety_issues', 'status', 'none')}
                className={
                  dailyTasks.safety_issues?.status === 'none'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Nope, all clear
              </button>
              <button
                onClick={() => handleOptionChange('safety_issues', 'status', 'handled')}
                className={
                  dailyTasks.safety_issues?.status === 'handled'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — I handled it 📝
              </button>
              <button
                onClick={() => handleOptionChange('safety_issues', 'status', 'reported')}
                className={
                  dailyTasks.safety_issues?.status === 'reported'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — I reported it 📝
              </button>
            </div>
            {(dailyTasks.safety_issues?.status === 'handled' || dailyTasks.safety_issues?.status === 'reported') && (
              <textarea
                placeholder="✍️ What was it?"
                value={dailyTasks.safety_issues?.note || ''}
                onChange={(e) => handleNoteChange('safety_issues', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
            <label className="flex items-center gap-2 text-sm text-blue-600 mt-2 cursor-pointer">
              <Camera size={16} />
              <span>📸 Snap a pic if relevant</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handlePhotoUpload('safety_issues', e)}
                className="hidden"
              />
            </label>
            {dailyTasks.safety_issues?.photoUrl && (
              <img
                src={dailyTasks.safety_issues.photoUrl}
                alt="Safety issue"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>

      {/* 2. Teacher Support & Questions */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MessageSquare className="text-teddy-green" size={20} />
          📣 Teacher Support & Questions
        </h2>

        <div className="space-y-4">
          {/* Question Count */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              How many teacher questions came to you today?
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleOptionChange('teacher_questions', 'count', num.toString())}
                  className={
                    dailyTasks.teacher_questions?.count === num.toString()
                      ? 'tk-btn-number-active'
                      : 'tk-btn-number'
                  }
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOptionChange('teacher_questions', 'count', 'more')}
                className={
                  dailyTasks.teacher_questions?.count === 'more'
                    ? 'tk-btn-more-active'
                    : 'tk-btn-more'
                }
              >
                More
              </button>
            </div>
            {dailyTasks.teacher_questions?.count === 'more' && (
              <input
                type="number"
                placeholder="How many?"
                value={dailyTasks.teacher_questions?.exact_count || ''}
                onChange={(e) => handleOptionChange('teacher_questions', 'exact_count', e.target.value)}
                className="mt-2 w-24 px-3 py-2 border rounded-lg text-sm"
              />
            )}
          </div>

          {/* Notable Questions */}
          <div>
            <p className="font-medium mb-2">✍️ Write down the two that made you think:</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="• Q1:"
                value={dailyTasks.teacher_questions?.q1 || ''}
                onChange={(e) => handleOptionChange('teacher_questions', 'q1', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="• Q2:"
                value={dailyTasks.teacher_questions?.q2 || ''}
                onChange={(e) => handleOptionChange('teacher_questions', 'q2', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Magic Sentence */}
          <div>
            <p className="font-medium mb-2">Did you use the magical sentence "What do you think?"</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleOptionChange('magic_sentence', 'used', 'yes')}
                className={
                  dailyTasks.magic_sentence?.used === 'yes'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes, always 😇
              </button>
              <button
                onClick={() => handleOptionChange('magic_sentence', 'used', 'forgot')}
                className={
                  dailyTasks.magic_sentence?.used === 'forgot'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                I didn't have to 😬
              </button>
            </div>
          </div>

          {/* Initiative & Support */}
          <div>
            <textarea
              placeholder="✍️ Who showed initiative or needed extra support today?"
              value={dailyTasks.initiative_support?.note || ''}
              onChange={(e) => handleNoteChange('initiative_support', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Communication Wins */}
          <div>
            <textarea
              placeholder="✍️ Any communication wins to celebrate?"
              value={dailyTasks.communication_wins?.note || ''}
              onChange={(e) => handleNoteChange('communication_wins', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Sofia/Meral Updates */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Anything that needed to go to Sofia or Meral?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('sofia_meral_update', 'needed', 'no')}
                className={
                  dailyTasks.sofia_meral_update?.needed === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No
              </button>
              <button
                onClick={() => handleOptionChange('sofia_meral_update', 'needed', 'yes')}
                className={
                  dailyTasks.sofia_meral_update?.needed === 'yes'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — I sent it 📝
              </button>
            </div>
            {dailyTasks.sofia_meral_update?.needed === 'yes' && (
              <textarea
                placeholder="✍️ Paste the WhatsApp message here (short + clear):"
                value={dailyTasks.sofia_meral_update?.message || ''}
                onChange={(e) => handleOptionChange('sofia_meral_update', 'message', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>
        </div>
      </div>

      {/* 3. Trust Person Duties */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="text-teddy-purple" size={20} />
          🧑‍🤝‍🧑 Trust Person Duties
        </h2>

        <div className="border rounded-lg p-3">
          <p className="font-medium mb-2">Did anyone approach you with a personal or sensitive topic today?</p>
          <div className="flex gap-3 mb-2">
            <button
              onClick={() => handleOptionChange('trust_person_approached', 'happened', 'no')}
              className={
                dailyTasks.trust_person_approached?.happened === 'no'
                  ? 'tk-btn-pink-active'
                  : 'tk-btn-pink'
              }
            >
              No
            </button>
            <button
              onClick={() => handleOptionChange('trust_person_approached', 'happened', 'yes')}
              className={
                dailyTasks.trust_person_approached?.happened === 'yes'
                  ? 'tk-btn-blue-active'
                  : 'tk-btn-blue'
              }
            >
              Yes — I listened 📝
            </button>
          </div>
          {dailyTasks.trust_person_approached?.happened === 'yes' && (
            <textarea
              placeholder="✍️ Theme (no names): (e.g. home stress, team tension, health, burn-out signs)"
              value={dailyTasks.trust_person_approached?.theme || ''}
              onChange={(e) => handleOptionChange('trust_person_approached', 'theme', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
              rows={2}
            />
          )}
        </div>
      </div>

      {/* 4. Protocol Scan */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Shield className="text-teddy-red" size={20} />
          📋 Protocol Scan — Pick One To Observe
        </h2>
        <p className="text-sm text-gray-600 mb-4 italic">Choose one protocol to quietly observe today (no enforcement, just signal-check)</p>

        <div className="space-y-4">
          {/* Protocol Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Which protocol did you check?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {protocolOptions.map(protocol => (
                <button
                  key={protocol.value}
                  onClick={() => handleOptionChange('protocol_check', 'protocol', protocol.value)}
                  className={
                    dailyTasks.protocol_check?.protocol === protocol.value
                      ? 'tk-btn-blue-active'
                      : 'tk-btn-pink'
                  }
                >
                  {protocol.label}
                </button>
              ))}
            </div>
          </div>

          {/* Protocol Status */}
          {dailyTasks.protocol_check?.protocol && (
            <div className="border rounded-lg p-3">
              <p className="font-medium mb-2">How did it feel?</p>
              <div className="flex gap-3 mb-2">
                <button
                  onClick={() => handleOptionChange('protocol_check', 'status', 'solid')}
                  className={
                    dailyTasks.protocol_check?.status === 'solid'
                      ? 'tk-btn-pink-active'
                      : 'tk-btn-pink'
                  }
                >
                  Looked solid
                </button>
                <button
                  onClick={() => handleOptionChange('protocol_check', 'status', 'attention')}
                  className={
                    dailyTasks.protocol_check?.status === 'attention'
                      ? 'tk-btn-blue-active'
                      : 'tk-btn-blue'
                  }
                >
                  Needs attention (explain below)
                </button>
              </div>
              <textarea
                placeholder="✍️ Notes: Anything we should know? Who was involved?"
                value={dailyTasks.protocol_check?.note || ''}
                onChange={(e) => handleNoteChange('protocol_check', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                rows={2}
              />
              <label className="flex items-center gap-2 text-sm text-blue-600 mt-2 cursor-pointer">
                <Camera size={16} />
                <span>📸 Snap a pic if relevant</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handlePhotoUpload('protocol_check', e)}
                  className="hidden"
                />
              </label>
              {dailyTasks.protocol_check?.photoUrl && (
                <img
                  src={dailyTasks.protocol_check.photoUrl}
                  alt="Protocol check"
                  className="mt-2 w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 5. Mini Maintenance & Materials */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ClipboardList className="text-teddy-orange" size={20} />
          🧼 Mini Maintenance & Materials
        </h2>

        <div className="space-y-4">
          {/* Boards Check */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-3">Boards Check:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm w-24">• Info Board updated?</span>
                <button
                  onClick={() => handleOptionChange('boards_check', 'info', 'yes')}
                  className={
                    dailyTasks.boards_check?.info === 'yes'
                      ? 'tk-btn-pink-active'
                      : 'tk-btn-pink'
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => handleOptionChange('boards_check', 'info', 'fixing')}
                  className={
                    dailyTasks.boards_check?.info === 'fixing'
                      ? 'tk-btn-blue-active'
                      : 'tk-btn-blue'
                  }
                >
                  Needs fixing 📝
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm w-24">• Photo Board okay?</span>
                <button
                  onClick={() => handleOptionChange('boards_check', 'photo', 'yes')}
                  className={
                    dailyTasks.boards_check?.photo === 'yes'
                      ? 'tk-btn-pink-active'
                      : 'tk-btn-pink'
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => handleOptionChange('boards_check', 'photo', 'outdated')}
                  className={
                    dailyTasks.boards_check?.photo === 'outdated'
                      ? 'tk-btn-blue-active'
                      : 'tk-btn-blue'
                  }
                >
                  Outdated 📝
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm w-24">• Staff Room tidy?</span>
                <button
                  onClick={() => handleOptionChange('boards_check', 'staff', 'yes')}
                  className={
                    dailyTasks.boards_check?.staff === 'yes'
                      ? 'tk-btn-pink-active'
                      : 'tk-btn-pink'
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() => handleOptionChange('boards_check', 'staff', 'chaotic')}
                  className={
                    dailyTasks.boards_check?.staff === 'chaotic'
                      ? 'tk-btn-blue-active'
                      : 'tk-btn-blue'
                  }
                >
                  Bit chaotic 📝
                </button>
              </div>
            </div>
            {(dailyTasks.boards_check?.info === 'fixing' || dailyTasks.boards_check?.photo === 'outdated' || dailyTasks.boards_check?.staff === 'chaotic') && (
              <textarea
                placeholder="✍️ Notes: Any fixes needed tomorrow?"
                value={dailyTasks.boards_check?.note || ''}
                onChange={(e) => handleNoteChange('boards_check', 'note', e.target.value)}
                className="mt-2 w-full px-3 py-2 border rounded-lg text-sm resize-none"
                rows={2}
              />
            )}
            />
          </div>

          {/* Supplies Check */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Any supplies low or missing?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('supplies_check', 'status', 'fine')}
                className={
                  dailyTasks.supplies_check?.status === 'fine'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Nope
              </button>
              <button
                onClick={() => handleOptionChange('supplies_check', 'status', 'followup')}
                className={
                  dailyTasks.supplies_check?.status === 'followup'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — I'll follow up 📝
              </button>
            </div>
            {dailyTasks.supplies_check?.status === 'followup' && (
              <textarea
                placeholder="✍️ Notes: What's needed? Who asked?"
                value={dailyTasks.supplies_check?.note || ''}
                onChange={(e) => handleNoteChange('supplies_check', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Repairs Check */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Does anything need repair or replacement?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('repairs_check', 'status', 'fine')}
                className={
                  dailyTasks.repairs_check?.status === 'fine'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Nope, everything's fine
              </button>
              <button
                onClick={() => handleOptionChange('repairs_check', 'status', 'issues')}
                className={
                  dailyTasks.repairs_check?.status === 'issues'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — see notes 📝
              </button>
            </div>
            {dailyTasks.repairs_check?.status === 'issues' && (
              <textarea
                placeholder="✍️ Notes: Something broken, stuck, leaking, or missing?"
                value={dailyTasks.repairs_check?.note || ''}
                onChange={(e) => handleNoteChange('repairs_check', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
            <label className="flex items-center gap-2 text-sm text-blue-600 mt-2 cursor-pointer">
              <Camera size={16} />
              <span>📸 Snap a pic</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handlePhotoUpload('repairs_check', e)}
                className="hidden"
              />
            </label>
            {dailyTasks.repairs_check?.photoUrl && (
              <img
                src={dailyTasks.repairs_check.photoUrl}
                alt="Repair needed"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Action List */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Did you add anything to the Action List?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('action_list', 'added', 'no')}
                className={
                  dailyTasks.action_list?.added === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No
              </button>
              <button
                onClick={() => handleOptionChange('action_list', 'added', 'yes')}
                className={
                  dailyTasks.action_list?.added === 'yes'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — write it below 📝
              </button>
            </div>
            {dailyTasks.action_list?.added === 'yes' && (
              <textarea
                placeholder="✍️ New action(s):"
                value={dailyTasks.action_list?.actions || ''}
                onChange={(e) => handleOptionChange('action_list', 'actions', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                rows={2}
              />
            )}
          </div>

          {/* Calendar Changes */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2">Any same-day calendar changes? (Portabase / Flyers / Events)</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('calendar_changes', 'changed', 'no')}
                className={
                  dailyTasks.calendar_changes?.changed === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Nope
              </button>
              <button
                onClick={() => handleOptionChange('calendar_changes', 'changed', 'yes')}
                className={
                  dailyTasks.calendar_changes?.changed === 'yes'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — what changed? 📝
              </button>
            </div>
            {dailyTasks.calendar_changes?.changed === 'yes' && (
              <textarea
                placeholder="What changed?"
                value={dailyTasks.calendar_changes?.what || ''}
                onChange={(e) => handleOptionChange('calendar_changes', 'what', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                rows={2}
              />
            )}
          </div>

        </div>
      </div>

      {/* 6. Wrap-Up: End of Day Pulse */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="text-teddy-yellow" size={20} />
          🧠 Wrap-Up: End of Day Pulse
        </h2>

        <div className="space-y-3">
          <textarea
            placeholder="✍️ Did a teacher point something out that helped today? (Recognize it here. Tiny things count.)"
            value={dailyTasks.teacher_recognition?.note || ''}
            onChange={(e) => handleNoteChange('teacher_recognition', 'note', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ Any small fix that made a big difference?"
            value={dailyTasks.daily_reflection?.small_fix || ''}
            onChange={(e) => handleOptionChange('daily_reflection', 'small_fix', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 thing you're proud of today:"
            value={dailyTasks.daily_reflection?.proud || ''}
            onChange={(e) => handleOptionChange('daily_reflection', 'proud', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 follow-up for tomorrow:"
            value={dailyTasks.daily_reflection?.followup || ''}
            onChange={(e) => handleOptionChange('daily_reflection', 'followup', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 staff member to check in with tomorrow:"
            value={dailyTasks.daily_reflection?.checkin || ''}
            onChange={(e) => handleOptionChange('daily_reflection', 'checkin', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ A smile you won't forget today: 😊"
            value={dailyTasks.daily_reflection?.smile || ''}
            onChange={(e) => handleOptionChange('daily_reflection', 'smile', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-teddy-purple to-teddy-blue rounded-xl p-4 text-white text-center">
        <p className="text-sm mb-2">That's it. You showed up, you saw, you supported.</p>
        <p className="text-sm mb-2">Tomorrow? We do it again. But better.</p>
        <p className="text-lg">💛</p>
        <p className="text-xs opacity-90 mt-2">🧸 <em>Teddy Kids — Where leadership means presence.</em></p>

        <div className="mt-4 text-center">
          <div className="text-2xl font-bold">
            {Object.values(dailyTasks).filter(t =>
              t.status || t.happened || t.needed || t.used || t.added || t.changed ||
              t.count || t.proud || t.protocol || (t.note && t.note.trim())
            ).length}
          </div>
          <div className="text-sm opacity-90 mt-1">
            Sections Completed Today
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyTasks