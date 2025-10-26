# TeddyKids Teacher Reporting App 📱

A mobile-first Progressive Web App (PWA) for TeddyKids teachers to easily log their daily, weekly, and monthly tasks from their phones. Built with React, Tailwind CSS, Supabase, and optimized for iPhone usage.

## 🎯 Features

- **Simple PIN Authentication**: Teachers select their name and enter a 4-digit PIN
- **Three Task Categories**:
  - **Daily**: Walk-around checklist, protocol tests, communication logs
  - **Weekly**: Calendar updates, team check-ins, event preparation
  - **Monthly**: Planning tasks, parent flyers, KPI summaries
- **Mobile-Optimized**: Large touch targets, swipe gestures, camera integration
- **Auto-Save**: Progress saves every 30 seconds
- **Photo Evidence**: Capture and attach photos directly from the phone
- **PWA Support**: Install on home screen for app-like experience
- **Offline Capable**: Works without constant internet connection

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone [your-repo-url]
cd teddykids-report

# Install dependencies
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)

2. Run this SQL in the Supabase SQL Editor:

```sql
-- Teachers table
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  pin TEXT NOT NULL,
  sites TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id),
  month TEXT NOT NULL,
  report_type TEXT NOT NULL,
  report_date DATE NOT NULL,
  data JSONB NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(teacher_id, report_date, report_type)
);

-- Evidence/Photos table
CREATE TABLE evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample teachers
INSERT INTO teachers (name, pin, sites) VALUES
  ('Hanrike', '1234', ARRAY['RB3', 'RB5']),
  ('Sofia', '5678', ARRAY['RB3']),
  ('Meral', '9012', ARRAY['RB5']);
```

3. Create a storage bucket called `evidence` (public)

4. Copy your Supabase credentials:
   - Go to Settings → API
   - Copy the `URL` and `anon public` key

### 3. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` on your phone or computer.

## 📱 Mobile Testing

### Test on iPhone:
1. Make sure your computer and iPhone are on the same network
2. Find your computer's IP address
3. Visit `http://[your-ip]:3000` on your iPhone
4. Add to Home Screen for PWA experience

## 🚢 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial TeddyKids Report App"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### 3. Custom Domain

1. In Vercel, go to Settings → Domains
2. Add `report.teddykids.nl`
3. Update DNS records at your domain provider:
   - Add CNAME record pointing to `cname.vercel-dns.com`

## 📊 Dashboard Ideas (Future)

The app collects all data in a structured format, making it easy to build management dashboards:

- **Monthly Overview**: Task completion rates by teacher
- **Protocol Compliance**: Track pass/fail rates across all tests
- **Pick-up Issues**: Trend analysis and problem areas
- **Photo Evidence Gallery**: Visual documentation archive
- **Teacher Performance**: Individual and team metrics
- **Event Planning Timeline**: Upcoming events and preparation status

## 🔐 Security Notes

- PINs are stored in plain text (consider hashing for production)
- Add Row Level Security (RLS) policies in Supabase for production
- Consider adding teacher role permissions
- Implement proper session management

## 🎨 Customization

### Colors (Tailwind Config)
- `teddy-red`: #FF6B6B
- `teddy-orange`: #FFA07A
- `teddy-yellow`: #FFD700
- `teddy-green`: #4CAF50
- `teddy-blue`: #87CEEB
- `teddy-purple`: #DDA0DD

### Adding New Teachers

```sql
INSERT INTO teachers (name, pin, sites) VALUES
  ('NewTeacher', '0000', ARRAY['RB3', 'RB5']);
```

### Modifying Tasks

Edit the task components in:
- `/src/components/DailyTasks.jsx`
- `/src/components/WeeklyTasks.jsx`
- `/src/components/MonthlyTasks.jsx`

## 📝 Data Structure

```javascript
{
  teacherId: "uuid",
  month: "2025-01",
  daily: {
    "2025-01-06": {
      walkAround: { completed: true, notes: "..." },
      protocolTests: [...],
      communications: [...]
    }
  },
  weekly: { 
    week_01: {...}, 
    week_02: {...} 
  },
  monthly: { 
    planning: {...}, 
    parentFlyer: {...} 
  }
}
```

## 🐛 Troubleshooting

**PIN not working**: Check the `teachers` table in Supabase
**Photos not uploading**: Verify storage bucket is public
**Can't save**: Check Supabase connection and RLS policies
**PWA not installing**: Ensure HTTPS in production

## 📧 Support

For questions or issues, contact Arty at Teddy Kids.

---

Built with ❤️ for TeddyKids teachers to make reporting simple and mobile-friendly.
