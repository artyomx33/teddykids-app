import useStore from '../lib/store'
import { Calendar, Users, Shield, ClipboardList, MessageSquare, Eye } from 'lucide-react'

function WeeklyTasks() {
  const { weeklyTasks, updateWeeklyTask, teacher } = useStore()

  const handleOptionChange = (taskId, field, value) => {
    updateWeeklyTask(taskId, {
      [field]: value,
      updatedAt: new Date().toISOString()
    })
  }

  const handleNoteChange = (taskId, field, value) => {
    updateWeeklyTask(taskId, {
      [field]: value,
      updatedAt: new Date().toISOString()
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teddy-red to-teddy-orange rounded-xl p-4 text-white">
        <h1 className="text-xl font-bold mb-2">🧸 Weekly Head Teacher Tasks — RB3 / RB5</h1>
        <p className="text-sm opacity-90">👑 The Rhythm Keeper's Checklist</p>
        <p className="text-xs opacity-80">📍 <strong>This week, you're the tuning fork of the floor.</strong></p>
        <p className="text-xs opacity-80">You don't chase noise. You keep the beat — gently, wisely — so others can dance.</p>
      </div>

      {/* 1. Weekly Planning & Calendar Flow */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="text-teddy-blue" size={20} />
          📆 Weekly Planning & Calendar Flow
        </h2>

        <div className="space-y-4">
          {/* Portabase Calendar */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Portabase calendar for RB3 and RB5 updated</p>
            <div className="flex gap-3 mb-2 flex-wrap">
              <button
                onClick={() => handleOptionChange('portabase_calendar', 'status', 'all_planned')}
                className={
                  weeklyTasks.portabase_calendar?.status === 'all_planned'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes — all planned
              </button>
              <button
                onClick={() => handleOptionChange('portabase_calendar', 'status', 'minor_gaps')}
                className={
                  weeklyTasks.portabase_calendar?.status === 'minor_gaps'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Minor gaps
              </button>
              <button
                onClick={() => handleOptionChange('portabase_calendar', 'status', 'still_sorting')}
                className={
                  weeklyTasks.portabase_calendar?.status === 'still_sorting'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Still sorting it
              </button>
            </div>
            {(weeklyTasks.portabase_calendar?.status === 'minor_gaps' ||
              weeklyTasks.portabase_calendar?.status === 'still_sorting') && (
              <textarea
                placeholder="✍️ Notes: Any issues with coverage, events, or team clarity?"
                value={weeklyTasks.portabase_calendar?.note || ''}
                onChange={(e) => handleNoteChange('portabase_calendar', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Teacher Calendar */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Teacher Calendar visible and clear</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('teacher_calendar', 'status', 'everything_shown')}
                className={
                  weeklyTasks.teacher_calendar?.status === 'everything_shown'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes — everything shown
              </button>
              <button
                onClick={() => handleOptionChange('teacher_calendar', 'status', 'missing_items')}
                className={
                  weeklyTasks.teacher_calendar?.status === 'missing_items'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Missing some items
              </button>
            </div>
            {weeklyTasks.teacher_calendar?.status === 'missing_items' && (
              <textarea
                placeholder="✍️ Notes: What changed? Who needs reminding?"
                value={weeklyTasks.teacher_calendar?.note || ''}
                onChange={(e) => handleNoteChange('teacher_calendar', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Holiday Dates */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Holiday dates, closures, and special days up to date (next week ready!)</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('holiday_dates', 'status', 'yes')}
                className={
                  weeklyTasks.holiday_dates?.status === 'yes'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes
              </button>
              <button
                onClick={() => handleOptionChange('holiday_dates', 'status', 'add_next_week')}
                className={
                  weeklyTasks.holiday_dates?.status === 'add_next_week'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                No — add next week
              </button>
            </div>
            {weeklyTasks.holiday_dates?.status === 'add_next_week' && (
              <textarea
                placeholder="✍️ Notes: Any family questions this week?"
                value={weeklyTasks.holiday_dates?.note || ''}
                onChange={(e) => handleNoteChange('holiday_dates', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Parent Flyers */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Parent flyers on track?</p>
            <div className="flex gap-3 mb-2 flex-wrap">
              <button
                onClick={() => handleOptionChange('parent_flyers', 'status', 'not_due')}
                className={
                  weeklyTasks.parent_flyers?.status === 'not_due'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Not due this week
              </button>
              <button
                onClick={() => handleOptionChange('parent_flyers', 'status', 'sent')}
                className={
                  weeklyTasks.parent_flyers?.status === 'sent'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Drafted and sent
              </button>
              <button
                onClick={() => handleOptionChange('parent_flyers', 'status', 'needs_start')}
                className={
                  weeklyTasks.parent_flyers?.status === 'needs_start'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Needs to be started 📝
              </button>
            </div>
            {weeklyTasks.parent_flyers?.status === 'needs_start' && (
              <textarea
                placeholder="✍️ Notes: Any themes or photos to include?"
                value={weeklyTasks.parent_flyers?.note || ''}
                onChange={(e) => handleNoteChange('parent_flyers', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Special Events */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Any special events next week that need prep? (e.g. Sinterklaas, birthday month, celebrations)</p>
            <div className="flex gap-3 mb-2 flex-wrap">
              <button
                onClick={() => handleOptionChange('special_events', 'status', 'no_events')}
                className={
                  weeklyTasks.special_events?.status === 'no_events'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No events
              </button>
              <button
                onClick={() => handleOptionChange('special_events', 'status', 'prepped')}
                className={
                  weeklyTasks.special_events?.status === 'prepped'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes — prepped
              </button>
              <button
                onClick={() => handleOptionChange('special_events', 'status', 'needs_work')}
                className={
                  weeklyTasks.special_events?.status === 'needs_work'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — still needs work
              </button>
            </div>
            {(weeklyTasks.special_events?.status === 'prepped' ||
              weeklyTasks.special_events?.status === 'needs_work') && (
              <textarea
                placeholder="✍️ Notes: What's planned? Who's helping?"
                value={weeklyTasks.special_events?.note || ''}
                onChange={(e) => handleNoteChange('special_events', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Upcoming Anxiety */}
          <div>
            <textarea
              placeholder="✍️ Any upcoming dates teachers seem anxious about?"
              value={weeklyTasks.teacher_anxiety?.note || ''}
              onChange={(e) => handleNoteChange('teacher_anxiety', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 2. Teacher Check-Ins & Team Energy */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="text-teddy-green" size={20} />
          🧑‍🤝‍🧑 Teacher Check-Ins & Team Energy
        </h2>

        <div className="space-y-4">
          {/* Group Lead Check-ins */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Did you check in with each group's lead this week?</p>
            <div className="flex gap-3 mb-2 flex-wrap">
              <button
                onClick={() => handleOptionChange('group_leads', 'status', 'all')}
                className={
                  weeklyTasks.group_leads?.status === 'all'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes, all of them
              </button>
              <button
                onClick={() => handleOptionChange('group_leads', 'status', 'some')}
                className={
                  weeklyTasks.group_leads?.status === 'some'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Some of them
              </button>
              <button
                onClick={() => handleOptionChange('group_leads', 'status', 'catch_up')}
                className={
                  weeklyTasks.group_leads?.status === 'catch_up'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                No — will catch up next week
              </button>
            </div>
{(weeklyTasks.group_leads?.status === 'some' ||
              weeklyTasks.group_leads?.status === 'catch_up' ||
              weeklyTasks.group_leads?.status === 'all') && (
              <textarea
                placeholder="✍️ Notes: Who's thriving? Who might need extra support?"
                value={weeklyTasks.group_leads?.note || ''}
                onChange={(e) => handleNoteChange('group_leads', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Teacher Concerns */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Did any teachers express concerns or struggles this week?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('teacher_concerns', 'status', 'no')}
                className={
                  weeklyTasks.teacher_concerns?.status === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No
              </button>
              <button
                onClick={() => handleOptionChange('teacher_concerns', 'status', 'yes')}
                className={
                  weeklyTasks.teacher_concerns?.status === 'yes'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — I listened
              </button>
            </div>
            {weeklyTasks.teacher_concerns?.status === 'yes' && (
              <textarea
                placeholder="✍️ Notes: Topic, tone, next step (no names)"
                value={weeklyTasks.teacher_concerns?.note || ''}
                onChange={(e) => handleNoteChange('teacher_concerns', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Communication Breakdown */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Was there a communication breakdown in any group?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('communication_breakdown', 'status', 'no')}
                className={
                  weeklyTasks.communication_breakdown?.status === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No
              </button>
              <button
                onClick={() => handleOptionChange('communication_breakdown', 'status', 'yes')}
                className={
                  weeklyTasks.communication_breakdown?.status === 'yes'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — discussed with them
              </button>
            </div>
            {weeklyTasks.communication_breakdown?.status === 'yes' && (
              <textarea
                placeholder="✍️ What happened? Was it resolved?"
                value={weeklyTasks.communication_breakdown?.note || ''}
                onChange={(e) => handleNoteChange('communication_breakdown', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Weekly Reflection */}
          <div className="space-y-3">
            <textarea
              placeholder="✍️ Any moments of excellent teamwork to celebrate?"
              value={weeklyTasks.weekly_reflection?.teamwork || ''}
              onChange={(e) => handleOptionChange('weekly_reflection', 'teamwork', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
            <textarea
              placeholder="✍️ Who gave great energy this week?"
              value={weeklyTasks.weekly_reflection?.great_energy || ''}
              onChange={(e) => handleOptionChange('weekly_reflection', 'great_energy', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
            <textarea
              placeholder="✍️ Who was unusually quiet?"
              value={weeklyTasks.weekly_reflection?.quiet_teachers || ''}
              onChange={(e) => handleOptionChange('weekly_reflection', 'quiet_teachers', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 3. Protocols & Safety Scan */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Shield className="text-teddy-red" size={20} />
          📋 Protocols & Safety Scan
        </h2>

        <div className="space-y-4">
          {/* Weekly Protocol Check */}
          <div>
            <p className="font-medium mb-2 text-gray-800">Which 3 protocols did you notice this week?</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="• Protocol 1:"
                value={weeklyTasks.protocols_checked?.protocol1 || ''}
                onChange={(e) => handleOptionChange('protocols_checked', 'protocol1', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="• Protocol 2:"
                value={weeklyTasks.protocols_checked?.protocol2 || ''}
                onChange={(e) => handleOptionChange('protocols_checked', 'protocol2', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="• Protocol 3:"
                value={weeklyTasks.protocols_checked?.protocol3 || ''}
                onChange={(e) => handleOptionChange('protocols_checked', 'protocol3', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Protocol Updates */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Any protocol that needs updating or clarity?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('protocol_updates', 'status', 'no')}
                className={
                  weeklyTasks.protocol_updates?.status === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No
              </button>
              <button
                onClick={() => handleOptionChange('protocol_updates', 'status', 'flagged')}
                className={
                  weeklyTasks.protocol_updates?.status === 'flagged'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — I flagged it
              </button>
            </div>
            {weeklyTasks.protocol_updates?.status === 'flagged' && (
              <textarea
                placeholder="✍️ Notes: Which one? What's unclear?"
                value={weeklyTasks.protocol_updates?.note || ''}
                onChange={(e) => handleNoteChange('protocol_updates', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Protocol Excellence */}
          <div>
            <textarea
              placeholder="✍️ Was anyone especially great at following a protocol?"
              value={weeklyTasks.protocol_excellence?.note || ''}
              onChange={(e) => handleNoteChange('protocol_excellence', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Sofia/Meral Updates */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Anything to bring to Sofia/Meral?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('sofia_meral_updates', 'status', 'no')}
                className={
                  weeklyTasks.sofia_meral_updates?.status === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No
              </button>
              <button
                onClick={() => handleOptionChange('sofia_meral_updates', 'status', 'sent')}
                className={
                  weeklyTasks.sofia_meral_updates?.status === 'sent'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — sent message
              </button>
            </div>
            {weeklyTasks.sofia_meral_updates?.status === 'sent' && (
              <textarea
                placeholder="✍️ Copy/paste WhatsApp or note here"
                value={weeklyTasks.sofia_meral_updates?.note || ''}
                onChange={(e) => handleNoteChange('sofia_meral_updates', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={3}
              />
            )}
          </div>
        </div>
      </div>

      {/* 4. Operations, Fixes & Follow-Ups */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ClipboardList className="text-teddy-orange" size={20} />
          🛠️ Operations, Fixes & Follow-Ups
        </h2>

        <div className="space-y-4">
          {/* Action List */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Action List reviewed and refreshed</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('action_list', 'status', 'yes')}
                className={
                  weeklyTasks.action_list?.status === 'yes'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Yes
              </button>
              <button
                onClick={() => handleOptionChange('action_list', 'status', 'not_yet')}
                className={
                  weeklyTasks.action_list?.status === 'not_yet'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Not yet
              </button>
            </div>
{(weeklyTasks.action_list?.status === 'yes' ||
              weeklyTasks.action_list?.status === 'not_yet') && (
              <textarea
                placeholder="✍️ What was removed? What was added? Who owns what?"
                value={weeklyTasks.action_list?.note || ''}
                onChange={(e) => handleNoteChange('action_list', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Operational Items */}
          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <p className="font-medium mb-2 text-gray-800">Repair requests logged this week</p>
              <div className="flex gap-3 mb-2">
                <button
                  onClick={() => handleOptionChange('repair_requests', 'status', 'none')}
                  className={
                    weeklyTasks.repair_requests?.status === 'none'
                      ? 'tk-btn-pink-active'
                      : 'tk-btn-pink'
                  }
                >
                  None
                </button>
                <button
                  onClick={() => handleOptionChange('repair_requests', 'status', 'yes')}
                  className={
                    weeklyTasks.repair_requests?.status === 'yes'
                      ? 'tk-btn-blue-active'
                      : 'tk-btn-blue'
                  }
                >
                  Yes — see below
                </button>
              </div>
              {weeklyTasks.repair_requests?.status === 'yes' && (
                <textarea
                  placeholder="✍️ Notes: What's broken, who's fixing it, by when?"
                  value={weeklyTasks.repair_requests?.note || ''}
                  onChange={(e) => handleNoteChange('repair_requests', 'note', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                  rows={2}
                />
              )}
            </div>

            <textarea
              placeholder="✍️ Orders needed or placed - Items, urgency, location"
              value={weeklyTasks.orders?.note || ''}
              onChange={(e) => handleNoteChange('orders', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />

            <textarea
              placeholder="✍️ Supplies restocked where needed - Which rooms?"
              value={weeklyTasks.supplies?.note || ''}
              onChange={(e) => handleNoteChange('supplies', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />

            <textarea
              placeholder="✍️ Any cleaning concerns this week? Where? What was off?"
              value={weeklyTasks.cleaning_concerns?.note || ''}
              onChange={(e) => handleNoteChange('cleaning_concerns', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />

            <textarea
              placeholder="✍️ EHBO kits checked + refilled if needed - Who was informed?"
              value={weeklyTasks.ehbo_kits?.note || ''}
              onChange={(e) => handleNoteChange('ehbo_kits', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />

            <textarea
              placeholder="✍️ Building walk-through done - Safety, smell, signage, hallway vibe — anything to fix?"
              value={weeklyTasks.building_walkthrough?.note || ''}
              onChange={(e) => handleNoteChange('building_walkthrough', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />

            <textarea
              placeholder="✍️ Any small fix that made a big difference?"
              value={weeklyTasks.small_fixes?.note || ''}
              onChange={(e) => handleNoteChange('small_fixes', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 5. Reflection & Rhythm Setting */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Eye className="text-teddy-purple" size={20} />
          🧠 Reflection & Rhythm Setting
        </h2>

        <div className="space-y-3">
          <textarea
            placeholder="✍️ 1 thing that went better than last week:"
            value={weeklyTasks.weekly_reflection?.better_than_last_week || ''}
            onChange={(e) => handleOptionChange('weekly_reflection', 'better_than_last_week', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 theme you're noticing in the team:"
            value={weeklyTasks.weekly_reflection?.team_theme || ''}
            onChange={(e) => handleOptionChange('weekly_reflection', 'team_theme', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 suggestion to improve flow or communication:"
            value={weeklyTasks.weekly_reflection?.improve_suggestion || ''}
            onChange={(e) => handleOptionChange('weekly_reflection', 'improve_suggestion', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 question or nudge for management:"
            value={weeklyTasks.weekly_reflection?.management_question || ''}
            onChange={(e) => handleOptionChange('weekly_reflection', 'management_question', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 thing to celebrate (big or tiny):"
            value={weeklyTasks.weekly_reflection?.celebrate || ''}
            onChange={(e) => handleOptionChange('weekly_reflection', 'celebrate', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ 1 quiet win someone might've missed:"
            value={weeklyTasks.weekly_reflection?.quiet_win || ''}
            onChange={(e) => handleOptionChange('weekly_reflection', 'quiet_win', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-teddy-purple to-teddy-blue rounded-xl p-4 text-white text-center">
        <p className="text-sm mb-2">You didn't just track tasks. You tracked trust.</p>
        <p className="text-sm mb-2">You watched the beat — and kept the band together.</p>
        <p className="text-lg">💛</p>
        <p className="text-xs opacity-90 mt-2">🧸 <em>Teddy Kids — Where rhythm is leadership.</em></p>

        <div className="mt-4 text-center">
          <div className="text-2xl font-bold">
            {Object.values(weeklyTasks).filter(t =>
              t.status || t.teamwork || t.great_energy || (t.note && t.note.trim()) ||
              t.protocol1 || t.protocol2 || t.protocol3
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

export default WeeklyTasks