/*
  # Fix Contact Submissions RLS for Anonymous Users

  1. Changes
    - Add policy to allow anonymous users (anon) to insert contact submissions
    - This allows the public contact form to work without authentication
  
  2. Security
    - Only INSERT is allowed for anonymous users
    - Authenticated users can still read submissions
    - Service role maintains full access
*/

-- Allow anonymous users to insert contact submissions
CREATE POLICY "Anonymous users can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);