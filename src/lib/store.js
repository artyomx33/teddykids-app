import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase } from './supabase'
import { format } from 'date-fns'

const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      teacher: null,
      isAuthenticated: false,
      
      // Current report data
      currentDate: new Date(),
      dailyTasks: {},
      weeklyTasks: {},
      monthlyTasks: {},
      
      // UI state
      activeTab: 'daily',
      isSaving: false,
      lastSaved: null,
      
      // Auth actions
      login: async (teacherName, pin) => {
        try {
          const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .eq('name', teacherName)
            .eq('pin', pin)
            .single()
          
          if (error || !data) {
            return { success: false, error: 'Invalid credentials' }
          }
          
          set({ 
            teacher: data, 
            isAuthenticated: true,
            currentDate: new Date()
          })
          
          // Load existing data for today
          await get().loadTodayData()
          
          return { success: true }
        } catch (err) {
          return { success: false, error: err.message }
        }
      },
      
      logout: () => {
        set({ 
          teacher: null, 
          isAuthenticated: false,
          dailyTasks: {},
          weeklyTasks: {},
          monthlyTasks: {}
        })
      },
      
      // Task management
      updateDailyTask: (taskId, value) => {
        set(state => ({
          dailyTasks: {
            ...state.dailyTasks,
            [taskId]: {
              ...state.dailyTasks[taskId],
              ...value,
              updatedAt: new Date().toISOString()
            }
          }
        }))
      },
      
      updateWeeklyTask: (taskId, value) => {
        set(state => ({
          weeklyTasks: {
            ...state.weeklyTasks,
            [taskId]: {
              ...state.weeklyTasks[taskId],
              ...value,
              updatedAt: new Date().toISOString()
            }
          }
        }))
      },
      
      updateMonthlyTask: (taskId, value) => {
        set(state => ({
          monthlyTasks: {
            ...state.monthlyTasks,
            [taskId]: {
              ...state.monthlyTasks[taskId],
              ...value,
              updatedAt: new Date().toISOString()
            }
          }
        }))
      },
      
      // Data persistence
      saveProgress: async () => {
        const state = get()
        if (!state.teacher) return { success: false }
        
        set({ isSaving: true })
        
        try {
          const reportDate = format(state.currentDate, 'yyyy-MM-dd')
          const month = format(state.currentDate, 'yyyy-MM')
          
          // Save daily report
          if (Object.keys(state.dailyTasks).length > 0) {
            await supabase.from('reports').upsert({
              teacher_id: state.teacher.id,
              month: month,
              report_type: 'daily',
              report_date: reportDate,
              data: state.dailyTasks
            }, {
              onConflict: 'teacher_id,report_date,report_type'
            })
          }
          
          // Save weekly report (if any tasks)
          if (Object.keys(state.weeklyTasks).length > 0) {
            await supabase.from('reports').upsert({
              teacher_id: state.teacher.id,
              month: month,
              report_type: 'weekly',
              report_date: reportDate,
              data: state.weeklyTasks
            }, {
              onConflict: 'teacher_id,report_date,report_type'
            })
          }
          
          // Save monthly report (if any tasks)
          if (Object.keys(state.monthlyTasks).length > 0) {
            await supabase.from('reports').upsert({
              teacher_id: state.teacher.id,
              month: month,
              report_type: 'monthly',
              report_date: reportDate,
              data: state.monthlyTasks
            }, {
              onConflict: 'teacher_id,report_date,report_type'
            })
          }
          
          set({ 
            isSaving: false, 
            lastSaved: new Date().toISOString() 
          })
          
          return { success: true }
        } catch (err) {
          set({ isSaving: false })
          return { success: false, error: err.message }
        }
      },
      
      loadTodayData: async () => {
        const state = get()
        if (!state.teacher) return
        
        const reportDate = format(state.currentDate, 'yyyy-MM-dd')
        
        try {
          const { data } = await supabase
            .from('reports')
            .select('*')
            .eq('teacher_id', state.teacher.id)
            .eq('report_date', reportDate)
          
          if (data) {
            const daily = data.find(r => r.report_type === 'daily')
            const weekly = data.find(r => r.report_type === 'weekly')
            const monthly = data.find(r => r.report_type === 'monthly')
            
            set({
              dailyTasks: daily?.data || {},
              weeklyTasks: weekly?.data || {},
              monthlyTasks: monthly?.data || {}
            })
          }
        } catch (err) {
          console.error('Error loading data:', err)
        }
      },
      
      // UI actions
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      // Photo upload
      uploadPhoto: async (file, taskId, reportType) => {
        const state = get()
        if (!state.teacher) return { success: false }
        
        const fileName = `${state.teacher.id}/${Date.now()}_${file.name}`
        
        try {
          const { data, error } = await supabase.storage
            .from('evidence')
            .upload(fileName, file)
          
          if (error) throw error
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('evidence')
            .getPublicUrl(fileName)
          
          // Update the relevant task with the photo URL
          if (reportType === 'daily') {
            state.updateDailyTask(taskId, { 
              photoUrl: publicUrl,
              photoPath: fileName
            })
          } else if (reportType === 'weekly') {
            state.updateWeeklyTask(taskId, { 
              photoUrl: publicUrl,
              photoPath: fileName
            })
          }
          
          return { success: true, url: publicUrl }
        } catch (err) {
          return { success: false, error: err.message }
        }
      }
    }),
    {
      name: 'teddykids-report',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ 
        teacher: state.teacher,
        isAuthenticated: state.isAuthenticated,
        currentDate: state.currentDate
      })
    }
  )
)

export default useStore
