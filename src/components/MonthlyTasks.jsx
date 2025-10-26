import useStore from '../lib/store'
import { Calendar, Users, TrendingUp, Award, Target, Heart, Star } from 'lucide-react'

function MonthlyTasks() {
  const { monthlyTasks, updateMonthlyTask, teacher } = useStore()

  const handleOptionChange = (taskId, field, value) => {
    updateMonthlyTask(taskId, {
      [field]: value,
      updatedAt: new Date().toISOString()
    })
  }

  const handleNoteChange = (taskId, field, value) => {
    updateMonthlyTask(taskId, {
      [field]: value,
      updatedAt: new Date().toISOString()
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teddy-red to-teddy-orange rounded-xl p-4 text-white">
        <h1 className="text-xl font-bold mb-2">🧸 Monthly Head Teacher Review — RB3 / RB5</h1>
        <p className="text-sm opacity-90">👑 The Monthly Pulse Check</p>
        <p className="text-xs opacity-80">📍 <strong>Time to zoom out and see the bigger picture.</strong></p>
        <p className="text-xs opacity-80">What patterns are emerging? What needs attention?</p>
      </div>

      {/* 1. Team Changes */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="text-teddy-blue" size={20} />
          👥 Team Changes This Month
        </h2>

        <div className="space-y-4">
          {/* New Teachers Joined */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">How many new teachers joined this month?</p>
            <div className="flex gap-2 flex-wrap mb-2">
              <button
                onClick={() => handleOptionChange('teachers_joined', 'count', '0')}
                className={
                  monthlyTasks.teachers_joined?.count === '0'
                    ? 'tk-btn-number-active'
                    : 'tk-btn-number'
                }
              >
                0
              </button>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleOptionChange('teachers_joined', 'count', num.toString())}
                  className={
                    monthlyTasks.teachers_joined?.count === num.toString()
                      ? 'tk-btn-number-active'
                      : 'tk-btn-number'
                  }
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOptionChange('teachers_joined', 'count', 'more')}
                className={
                  monthlyTasks.teachers_joined?.count === 'more'
                    ? 'tk-btn-more-active'
                    : 'tk-btn-more'
                }
              >
                More
              </button>
            </div>
            {monthlyTasks.teachers_joined?.count && monthlyTasks.teachers_joined?.count !== '0' && (
              <textarea
                placeholder="✍️ Who joined? How are they settling in?"
                value={monthlyTasks.teachers_joined?.note || ''}
                onChange={(e) => handleNoteChange('teachers_joined', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Teachers Left */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">How many teachers left this month?</p>
            <div className="flex gap-2 flex-wrap mb-2">
              <button
                onClick={() => handleOptionChange('teachers_left', 'count', '0')}
                className={
                  monthlyTasks.teachers_left?.count === '0'
                    ? 'tk-btn-number-active'
                    : 'tk-btn-number'
                }
              >
                0
              </button>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleOptionChange('teachers_left', 'count', num.toString())}
                  className={
                    monthlyTasks.teachers_left?.count === num.toString()
                      ? 'tk-btn-number-active'
                      : 'tk-btn-number'
                  }
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOptionChange('teachers_left', 'count', 'more')}
                className={
                  monthlyTasks.teachers_left?.count === 'more'
                    ? 'tk-btn-more-active'
                    : 'tk-btn-more'
                }
              >
                More
              </button>
            </div>
            {monthlyTasks.teachers_left?.count && monthlyTasks.teachers_left?.count !== '0' && (
              <textarea
                placeholder="✍️ Who left? What was the reason? How did we handle the transition?"
                value={monthlyTasks.teachers_left?.note || ''}
                onChange={(e) => handleNoteChange('teachers_left', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* New Children Started */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">How many new children started this month?</p>
            <div className="flex gap-2 flex-wrap mb-2">
              <button
                onClick={() => handleOptionChange('children_started', 'count', '0')}
                className={
                  monthlyTasks.children_started?.count === '0'
                    ? 'tk-btn-number-active'
                    : 'tk-btn-number'
                }
              >
                0
              </button>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleOptionChange('children_started', 'count', num.toString())}
                  className={
                    monthlyTasks.children_started?.count === num.toString()
                      ? 'tk-btn-number-active'
                      : 'tk-btn-number'
                  }
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOptionChange('children_started', 'count', 'more')}
                className={
                  monthlyTasks.children_started?.count === 'more'
                    ? 'tk-btn-more-active'
                    : 'tk-btn-more'
                }
              >
                More
              </button>
            </div>
            {monthlyTasks.children_started?.count && monthlyTasks.children_started?.count !== '0' && (
              <textarea
                placeholder="✍️ How did the new children settle in? Any special needs or notes?"
                value={monthlyTasks.children_started?.note || ''}
                onChange={(e) => handleNoteChange('children_started', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>

          {/* Children Left */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">How many children left this month?</p>
            <div className="flex gap-2 flex-wrap mb-2">
              <button
                onClick={() => handleOptionChange('children_left', 'count', '0')}
                className={
                  monthlyTasks.children_left?.count === '0'
                    ? 'tk-btn-number-active'
                    : 'tk-btn-number'
                }
              >
                0
              </button>
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleOptionChange('children_left', 'count', num.toString())}
                  className={
                    monthlyTasks.children_left?.count === num.toString()
                      ? 'tk-btn-number-active'
                      : 'tk-btn-number'
                  }
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleOptionChange('children_left', 'count', 'more')}
                className={
                  monthlyTasks.children_left?.count === 'more'
                    ? 'tk-btn-more-active'
                    : 'tk-btn-more'
                }
              >
                More
              </button>
            </div>
            {monthlyTasks.children_left?.count && monthlyTasks.children_left?.count !== '0' && (
              <textarea
                placeholder="✍️ Who left? Moving, age transition, other reasons?"
                value={monthlyTasks.children_left?.note || ''}
                onChange={(e) => handleNoteChange('children_left', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={2}
              />
            )}
          </div>
        </div>
      </div>

      {/* 2. Monthly Achievements & Challenges */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="text-teddy-green" size={20} />
          🏆 Monthly Achievements & Challenges
        </h2>

        <div className="space-y-4">
          {/* Monthly Highlights */}
          <div>
            <textarea
              placeholder="✍️ What's the biggest win this month? (Team, children, processes, anything!)"
              value={monthlyTasks.monthly_highlights?.note || ''}
              onChange={(e) => handleNoteChange('monthly_highlights', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Monthly Challenge */}
          <div>
            <textarea
              placeholder="✍️ What was the biggest challenge this month? How did we handle it?"
              value={monthlyTasks.monthly_challenge?.note || ''}
              onChange={(e) => handleNoteChange('monthly_challenge', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Process Improvements */}
          <div>
            <textarea
              placeholder="✍️ Any processes or routines that improved this month?"
              value={monthlyTasks.process_improvements?.note || ''}
              onChange={(e) => handleNoteChange('process_improvements', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Next Month Planning */}
          <div>
            <textarea
              placeholder="✍️ What's coming up next month that needs planning or attention?"
              value={monthlyTasks.next_month_planning?.note || ''}
              onChange={(e) => handleNoteChange('next_month_planning', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={3}
            />
          </div>

          {/* Sofia/Meral Updates */}
          <div>
            <textarea
              placeholder="✍️ What key updates or decisions came from Sofia/Meral this month?"
              value={monthlyTasks.management_updates?.note || ''}
              onChange={(e) => handleNoteChange('management_updates', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 3. Planning & Events */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="text-teddy-orange" size={20} />
          📅 Planning & Events
        </h2>

        <div className="space-y-4">
          {/* Special Events */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Any special events or celebrations this month?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('special_events', 'had_events', 'no')}
                className={
                  monthlyTasks.special_events?.had_events === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                No events
              </button>
              <button
                onClick={() => handleOptionChange('special_events', 'had_events', 'yes')}
                className={
                  monthlyTasks.special_events?.had_events === 'yes'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — tell me more
              </button>
            </div>
            {monthlyTasks.special_events?.had_events === 'yes' && (
              <textarea
                placeholder="✍️ What events? How did they go? Any learning for next time?"
                value={monthlyTasks.special_events?.note || ''}
                onChange={(e) => handleNoteChange('special_events', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={3}
              />
            )}
          </div>

          {/* Next Month Planning */}
          <div>
            <textarea
              placeholder="✍️ What's coming up next month that needs planning or attention?"
              value={monthlyTasks.next_month_planning?.note || ''}
              onChange={(e) => handleNoteChange('next_month_planning', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* 4. Management & Communication */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-teddy-purple" size={20} />
          📊 Management & Communication
        </h2>

        <div className="space-y-4">
          {/* Parent Feedback */}
          <div className="border rounded-lg p-3">
            <p className="font-medium mb-2 text-gray-800">Any significant parent feedback this month?</p>
            <div className="flex gap-3 mb-2">
              <button
                onClick={() => handleOptionChange('parent_feedback', 'received', 'no')}
                className={
                  monthlyTasks.parent_feedback?.received === 'no'
                    ? 'tk-btn-pink-active'
                    : 'tk-btn-pink'
                }
              >
                Nothing major
              </button>
              <button
                onClick={() => handleOptionChange('parent_feedback', 'received', 'yes')}
                className={
                  monthlyTasks.parent_feedback?.received === 'yes'
                    ? 'tk-btn-blue-active'
                    : 'tk-btn-blue'
                }
              >
                Yes — there's feedback
              </button>
            </div>
            {monthlyTasks.parent_feedback?.received === 'yes' && (
              <textarea
                placeholder="✍️ What feedback? How did we respond? Any follow-up needed?"
                value={monthlyTasks.parent_feedback?.note || ''}
                onChange={(e) => handleNoteChange('parent_feedback', 'note', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm resize-none mt-2"
                rows={3}
              />
            )}
          </div>

          {/* Sofia/Meral Updates */}
          <div>
            <textarea
              placeholder="✍️ What key updates or decisions came from Sofia/Meral this month?"
              value={monthlyTasks.management_updates?.note || ''}
              onChange={(e) => handleNoteChange('management_updates', 'note', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 5. Focus for Next Month */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="text-teddy-red" size={20} />
          🎯 Focus for Next Month
        </h2>

        <div className="space-y-3">
          <textarea
            placeholder="✍️ What's your #1 priority for next month?"
            value={monthlyTasks.next_month_focus?.priority1 || ''}
            onChange={(e) => handleOptionChange('next_month_focus', 'priority1', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ What's your #2 priority for next month?"
            value={monthlyTasks.next_month_focus?.priority2 || ''}
            onChange={(e) => handleOptionChange('next_month_focus', 'priority2', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
          <textarea
            placeholder="✍️ What do you want to improve or try differently?"
            value={monthlyTasks.next_month_focus?.improvements || ''}
            onChange={(e) => handleOptionChange('next_month_focus', 'improvements', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
            rows={2}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-teddy-purple to-teddy-blue rounded-xl p-4 text-white text-center">
        <p className="text-sm mb-2">Another month of leadership, growth, and care.</p>
        <p className="text-sm mb-2">You didn't just manage. You nurtured. You guided. You led.</p>
        <p className="text-lg">💛</p>
        <p className="text-xs opacity-90 mt-2">🧸 <em>Teddy Kids — Where leadership means presence.</em></p>

        <div className="mt-4 text-center">
          <div className="text-2xl font-bold">
            {Object.values(monthlyTasks).filter(t =>
              t.count || t.had_events || t.received || (t.note && t.note.trim()) ||
              t.priority1 || t.priority2 || t.improvements
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

export default MonthlyTasks