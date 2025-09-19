/*
  # Fix RLS policy for course management

  1. Changes
    - Update the RLS policy to properly check authenticated users
    - Allow all authenticated users to manage courses for now
    - Add a more flexible policy that works with Supabase auth

  2. Security
    - Keep RLS enabled
    - Allow public read access to active courses
    - Allow authenticated users to manage all courses
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Administradores podem gerenciar todos os cursos" ON courses;

-- Create a new policy that allows authenticated users to manage courses
CREATE POLICY "Authenticated users can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Keep the public read policy for active courses
-- This policy should already exist, but let's ensure it's correct
DROP POLICY IF EXISTS "Cursos ativos são visíveis publicamente" ON courses;

CREATE POLICY "Active courses are publicly visible"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');