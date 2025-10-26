-- Add INSERT policy for users table to allow users to create their own profile
CREATE POLICY "Users can insert own profile" ON users 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- This allows the fallback mechanism in the client to work for existing users
-- who signed up before the trigger was created
