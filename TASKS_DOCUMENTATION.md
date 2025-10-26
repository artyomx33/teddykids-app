# TeddyKids Teacher Reporting App - Complete Task Documentation

## Overview
This document contains all tasks, questions, and requirements in the TeddyKids Teacher Reporting App. Review and adjust as needed for accuracy.

---

## 🗓️ DAILY TASKS

### Daily Walk-Around (1-2 hours)
- **RB3 Site Visit** - Quick hello in each room ✅ ❌
- **RB5 Site Visit** - Quick hello in each room ✅ ❌
- **Early Start Completed** (Tuesday/Thursday only) - Planning support ✅ ❌

### Communication & Support
- **Teacher Queries Addressed** ✅ ❌
  - *Text field*: List queries and resolutions...
- **Sofia/Meral Updated** - Important info bridged ✅ ❌
- **Trust Person Duty** - Available for confidential matters ✅ ❌
  - *Number field*: Cases handled (number only)

### Protocol Tests (Pick 1 Daily - Complete 3 Different by Friday)
1. **Pick-up ID Check** ✅ Pass / ❌ Needs Work
2. **Medication Handover** ✅ Pass / ❌ Needs Work
3. **Incident Logging** ✅ Pass / ❌ Needs Work
4. **Safeguarding Path** ✅ Pass / ❌ Needs Work
5. **Evacuation Drill** ✅ Pass / ❌ Needs Work
6. **Visitor Sign-in** ✅ Pass / ❌ Needs Work
7. **Data Privacy Check** ✅ Pass / ❌ Needs Work
8. **Cleaning/Sanitation** ✅ Pass / ❌ Needs Work
9. **Attendance/Ratios** ✅ Pass / ❌ Needs Work

For "Needs Work" results:
- *Text field*: Add notes about issues found...
- *Photo upload*: Add Evidence Photo

### Additional Notes
- *Text field*: Any other observations, immediate needs, or follow-ups...

---

## 📅 WEEKLY TASKS

### Calendar Management
- **Portabase Calendar Updated** - Study days, holidays, events added ✅ ❌
  - *Text field*: List updates made...
- **Teachers' Holiday Calendar** - Updated and visible in both locations ✅ ❌

### Team Connection
- **RB3 Group Leads Check-in** ✅ ❌
  - *Text field*: Summary and action items...
- **RB5 Group Leads Check-in** ✅ ❌
  - *Text field*: Summary and action items...

### Event Preparation
- **Materials Ordered/Staged** ✅ ❌
  - *Text field*: Event name and date...
  - *Photo upload*: Add staging photo
- **Small Supply Orders Placed** - Supermarket/supplies for upcoming week ✅ ❌
  - *Text field*: List items ordered...

### Teacher Task Follow-up
- **Routine Tasks Checked** ✅ ❌
  - ✅ ❌ Ratios maintained
  - ✅ ❌ Cleaning logs complete
  - ✅ ❌ Theme prep on track
- **Reminders Sent** ✅ ❌
  - *Number field*: Number of reminders sent

### Room Standards Check
- **Classrooms Meet Standards** - Only note if issues found ✅ ❌
  - *Text field*: Issues found (if any)...

---

## 📊 MONTHLY TASKS

### Planning & Programs
- **Holiday Program Planned** - Special activities and schedules ✅ ❌
  - *Text field*: Program details (dates, activities, materials)...
- **End-of-Theme Events** - Party planning and logistics ✅ ❌
  - *Text field*: Event details (theme, date, preparations)...
- **Special Activities Confirmed** - Next month's special programs ✅ ❌

### Parent Communication (Bi-Monthly - Even months: Feb, Apr, Jun, Aug, Oct, Dec)
- **Parent Flyer Created** - Important dates, activities, holidays ✅ ❌
  - ✅ ❌ Management approved
  - ✅ ❌ Sent to parents
- **Action List Updated** - All items have owners and deadlines ✅ ❌

### Special Event Purchasing
Select which events need purchasing:
- ✅ ❌ Sinterklaas
- ✅ ❌ Christmas Lunch
- ✅ ❌ Easter Breakfast
- ✅ ❌ Teacher's Day
- ✅ ❌ New Year Lunch
- ✅ ❌ Summer Party

*Text field*: Event purchasing notes...

### Monthly KPI Summary
- **Pick-up Issues This Month**
  - *Number field*: Number of issues
- **Protocol Pass Rate (%)**
  - *Number field*: Percentage passed (0-100)
- **Top Achievement**
  - *Text field*: What went really well this month?
- **Main Challenge & Solution**
  - *Text field*: Biggest challenge and how it was addressed...

### Next Month Focus Areas
- *Text field*: Top 2-3 priorities for next month...

### Monthly Report Submission
- **Report compiled (by the 20th)** ✅ ❌
- **Presented to management (by the 21st)** ✅ ❌

---

## 📱 App Features & Behavior

### Authentication
- Teacher dropdown: Hanrike, Sofia, Meral, Emma, Lisa
- 4-digit PIN entry with large keypad
- Auto-logout at midnight
- Session persistence

### Smart Features
- **Protocol Rotation**: Must test 3 different protocols weekly
- **Early Start Indicator**: Shows Tuesday/Thursday tasks
- **Parent Flyer Reminder**: Automatically appears bi-monthly
- **Auto-save**: Every 30 seconds
- **Photo Evidence**: Direct camera capture with cloud storage

### Progress Tracking
- Daily tasks completion counter
- Weekly tasks completion counter
- Monthly tasks completion counter
- Visual progress indicators

### Data Storage
- JSON format by month in Supabase
- Daily reports (per day)
- Weekly reports (aggregated)
- Monthly summaries with KPIs
- Photo evidence with timestamps

---

## 🎨 App Design
- **Colors**: TeddyKids palette (red, orange, yellow, green, blue, purple)
- **Mobile-first**: Optimized for iPhone 17
- **Touch targets**: Minimum 44×44px
- **PWA ready**: Installable on home screen
- **No zoom**: On input focus

---

## 📋 Notes for Adjustments

**Questions for Review:**
1. Are the site visits (RB3/RB5) correct locations?
2. Is the protocol test rotation requirement accurate (3 different by Friday)?
3. Are Sofia/Meral the correct staff to update?
4. Is the Trust Person duty description accurate?
5. Are the KPI measurements (pickup issues, protocol pass rate) the right metrics?
6. Are the special events list complete and accurate?
7. Is the reporting timeline correct (compile by 20th, present by 21st)?
8. Are the calendar systems correct (Portabase, holiday calendar)?
9. Is the bi-monthly parent flyer schedule correct?
10. Are there any missing daily/weekly/monthly tasks?

**Technical Questions:**
1. Should we add more teacher names to the login?
2. Do you need different PINs for each teacher?
3. Should there be role-based access (different tasks for different teachers)?
4. Do you need export functionality for reports?
5. Should there be notification/reminder system?

Review this documentation and let me know what needs to be corrected! 🚀