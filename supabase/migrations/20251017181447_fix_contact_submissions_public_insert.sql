/*
  # Fix Contact Submissions - Allow Public INSERT

  1. Changes
    - Add additional policy to allow authenticated users to also insert
    - Ensure anon role can properly insert records
  
  2. Security
    - Both anon and authenticated users can insert contact submissions
    - Only authenticated users can read submissions (admin panel)
    - This is a public contact form so we allow unrestricted inserts
*/

-- Drop existing anonymous policy if it exists
DROP POLICY IF EXISTS "Anonymous users can insert contact submissions" ON contact_submissions;

-- Allow anyone (anon and authenticated) to insert contact submissions
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);