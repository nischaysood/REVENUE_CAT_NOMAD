-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  nomad_type TEXT, -- van, rv, backpacker, digital_nomad
  travel_style TEXT, -- slow, seasonal, fast
  interests TEXT[],
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Travel Plans table
CREATE TABLE travel_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  current_location TEXT,
  next_destination TEXT,
  leaving_at DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_1 UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_2 UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, matched, blocked
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_1, user_2)
);

-- Activities table
CREATE TABLE activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT,
  description TEXT,
  activity_type TEXT, -- hiking, climbing, etc.
  location TEXT,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  max_participants INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Participants
CREATE TABLE activity_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(activity_id, profile_id)
);

-- Builder Profiles
CREATE TABLE builder_profiles (
  id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  skills TEXT[],
  years_experience INTEGER,
  hourly_rate INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Builder Sessions
CREATE TABLE builder_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  builder_id UUID REFERENCES builder_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, paid, completed
  revenuecat_transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invite Codes
CREATE TABLE invite_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE,
  used_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE builder_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_codes ENABLE ROW LEVEL SECURITY;

-- Basic Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Travel plans viewable by everyone." ON travel_plans FOR SELECT USING (true);
CREATE POLICY "Users can manage their own travel plans." ON travel_plans FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Matches viewable by involved users." ON matches FOR SELECT USING (auth.uid() = user_1 OR auth.uid() = user_2);
CREATE POLICY "Users can create matches." ON matches FOR INSERT WITH CHECK (auth.uid() = user_1);

CREATE POLICY "Activities viewable by everyone." ON activities FOR SELECT USING (true);
CREATE POLICY "Creators can manage their activities." ON activities FOR ALL USING (auth.uid() = creator_id);

CREATE POLICY "Activity participants viewable by everyone." ON activity_participants FOR SELECT USING (true);
CREATE POLICY "Users can join activities." ON activity_participants FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Builder profiles viewable by everyone." ON builder_profiles FOR SELECT USING (true);
CREATE POLICY "Builders can manage their profiles." ON builder_profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Sessions viewable by parties involved." ON builder_sessions FOR SELECT USING (auth.uid() = builder_id OR auth.uid() = user_id);
