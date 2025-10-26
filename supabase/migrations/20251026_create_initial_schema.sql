-- Migration: Create complete TeddyKids database schema
-- Created: 2025-10-26
-- Description: Creates teachers, reports, and evidence tables with all data

-- Step 1: Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  pin TEXT NOT NULL,
  sites TEXT[] DEFAULT '{}',
  role TEXT DEFAULT 'teacher',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Step 2: Add check constraint for valid roles
ALTER TABLE teachers
ADD CONSTRAINT teachers_role_check
CHECK (role IN ('teacher', 'admin'));

-- Step 3: Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id),
  month TEXT NOT NULL, -- Format: '2025-01'
  report_type TEXT NOT NULL, -- 'daily', 'weekly', 'monthly'
  report_date DATE NOT NULL,
  data JSONB NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(teacher_id, report_date, report_type)
);

-- Step 4: Create evidence/photos table
CREATE TABLE IF NOT EXISTS evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  description TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Step 5: Insert all teachers including Teddy admin
INSERT INTO teachers (name, pin, sites, role) VALUES
  ('Adela', '1470', ARRAY['RB3', 'RB5'], 'teacher'),
  ('Christina', '1236', ARRAY['RB3'], 'teacher'),
  ('Hanrike', '7896', ARRAY['RB3', 'RB5'], 'teacher'),
  ('Meral', '2580', ARRAY['RB5'], 'teacher'),
  ('Sofia', '0852', ARRAY['RB3'], 'teacher'),
  ('Teddy', '3355', ARRAY['RB3', 'RB5'], 'admin')
ON CONFLICT (name) DO UPDATE SET
  pin = EXCLUDED.pin,
  sites = EXCLUDED.sites,
  role = EXCLUDED.role;

-- Step 6: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_teachers_role ON teachers(role);
CREATE INDEX IF NOT EXISTS idx_reports_teacher_date ON reports(teacher_id, report_date);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(report_type);
CREATE INDEX IF NOT EXISTS idx_evidence_report ON evidence(report_id);

-- Step 7: Enable Row Level Security (RLS)
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;

-- Step 8: Create RLS policies for teachers (basic security)
CREATE POLICY "Teachers can view all teachers"
ON teachers FOR SELECT
USING (true);

-- Step 9: Create RLS policies for reports
CREATE POLICY "Teachers can view own reports"
ON reports FOR ALL
USING (auth.uid()::text = teacher_id::text);

-- Step 10: Create RLS policies for evidence
CREATE POLICY "Teachers can view evidence for own reports"
ON evidence FOR ALL
USING (
  report_id IN (
    SELECT id FROM reports WHERE teacher_id::text = auth.uid()::text
  )
);