/*
  # Authentication and User Management Schema

  1. New Tables
    - `user_profiles` - Extended user profile information
    - `students` - Student-specific data (eco points, progress, etc.)
    - `teachers` - Teacher-specific data (school, experience, etc.)
    - `lessons` - Environmental education lessons
    - `challenges` - Environmental challenges
    - `badges` - Achievement badges
    - `student_badges` - Junction table for student badge awards
    - `student_lessons` - Junction table for lesson completion
    - `student_challenges` - Junction table for challenge completion
    - `shop_items` - Items available in the points shop
    - `student_purchases` - Student purchase history

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for teachers to view their students' data

  3. Functions
    - Trigger to create user profile on signup
    - Function to award badges automatically
    - Function to calculate level from eco points
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  grade text NOT NULL,
  school text NOT NULL,
  state text NOT NULL,
  eco_points integer DEFAULT 0,
  level integer DEFAULT 1,
  streak integer DEFAULT 0,
  total_impact_score numeric DEFAULT 0,
  weekly_goal integer DEFAULT 200,
  monthly_goal integer DEFAULT 800,
  join_date timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  school text NOT NULL,
  subject text,
  experience_years integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  quiz jsonb NOT NULL DEFAULT '{}',
  duration integer NOT NULL DEFAULT 30,
  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  category text NOT NULL,
  points integer NOT NULL DEFAULT 25,
  image_url text,
  is_published boolean DEFAULT false,
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Challenges Table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('conservation', 'waste', 'water', 'energy', 'biodiversity', 'climate')),
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  points integer NOT NULL DEFAULT 50,
  estimated_time text NOT NULL,
  requirements jsonb NOT NULL DEFAULT '[]',
  instructions jsonb NOT NULL DEFAULT '[]',
  state text,
  season text,
  image_url text,
  is_published boolean DEFAULT true,
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Badges Table
CREATE TABLE IF NOT EXISTS badges (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  criteria text NOT NULL,
  tier text NOT NULL CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  category text NOT NULL,
  rarity text NOT NULL CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')),
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Student Badges Junction Table
CREATE TABLE IF NOT EXISTS student_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  badge_id text NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  date_earned timestamptz DEFAULT now(),
  UNIQUE(student_id, badge_id)
);

-- Student Lessons Junction Table
CREATE TABLE IF NOT EXISTS student_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  score integer,
  UNIQUE(student_id, lesson_id)
);

-- Student Challenges Junction Table
CREATE TABLE IF NOT EXISTS student_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  challenge_id uuid NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  evidence_urls jsonb DEFAULT '[]',
  UNIQUE(student_id, challenge_id)
);

-- Shop Items Table
CREATE TABLE IF NOT EXISTS shop_items (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  category text NOT NULL CHECK (category IN ('avatars', 'achievements', 'powerups')),
  rarity text NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  image_url text,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Student Purchases Table
CREATE TABLE IF NOT EXISTS student_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  item_id text NOT NULL REFERENCES shop_items(id) ON DELETE CASCADE,
  purchased_at timestamptz DEFAULT now(),
  UNIQUE(student_id, item_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for students
CREATE POLICY "Students can read own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Students can update own data"
  ON students
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Teachers can read their students data"
  ON students
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'teacher'
    )
  );

-- RLS Policies for teachers
CREATE POLICY "Teachers can read own data"
  ON teachers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Teachers can update own data"
  ON teachers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for lessons
CREATE POLICY "Everyone can read published lessons"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Teachers can manage lessons"
  ON lessons
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for challenges
CREATE POLICY "Everyone can read published challenges"
  ON challenges
  FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Teachers can manage challenges"
  ON challenges
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role IN ('teacher', 'admin')
    )
  );

-- RLS Policies for badges
CREATE POLICY "Everyone can read badges"
  ON badges
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for student_badges
CREATE POLICY "Students can read own badges"
  ON student_badges
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own badges"
  ON student_badges
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

-- RLS Policies for student_lessons
CREATE POLICY "Students can read own lesson progress"
  ON student_lessons
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own lesson progress"
  ON student_lessons
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

-- RLS Policies for student_challenges
CREATE POLICY "Students can read own challenge progress"
  ON student_challenges
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own challenge progress"
  ON student_challenges
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

-- RLS Policies for shop_items
CREATE POLICY "Everyone can read available shop items"
  ON shop_items
  FOR SELECT
  TO authenticated
  USING (is_available = true);

-- RLS Policies for student_purchases
CREATE POLICY "Students can read own purchases"
  ON student_purchases
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own purchases"
  ON student_purchases
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Function to calculate level from eco points
CREATE OR REPLACE FUNCTION calculate_level(eco_points integer)
RETURNS integer AS $$
BEGIN
  RETURN GREATEST(1, FLOOR(eco_points / 200.0) + 1);
END;
$$ LANGUAGE plpgsql;

-- Function to update student level when eco points change
CREATE OR REPLACE FUNCTION update_student_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level = calculate_level(NEW.eco_points);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update student level
DROP TRIGGER IF EXISTS update_student_level_trigger ON students;
CREATE TRIGGER update_student_level_trigger
  BEFORE UPDATE OF eco_points ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_student_level();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();