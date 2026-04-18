# Database Setup Instructions for LandVest

## 1. Users Table (Create First!)

Run this SQL first to create a public users table:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all user profiles" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON users;

-- Create simple policies - allow all reads (since we only store email/name)
CREATE POLICY "Enable read access for all users"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Enable update for users based on id"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for users based on id"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create indexes
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON users(created_at);

-- Create a trigger to auto-create user record on auth.users creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 2. Fraction Transfers Table

```sql
-- Create fraction_transfers table
CREATE TABLE IF NOT EXISTS fraction_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_email TEXT NOT NULL,
  investment_id UUID NOT NULL REFERENCES investments(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  num_fractions INTEGER NOT NULL CHECK (num_fractions > 0),
  fraction_price DECIMAL(15, 2) NOT NULL,
  total_amount DECIMAL(15, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(investment_id, id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS fraction_transfers_from_user_id ON fraction_transfers(from_user_id);
CREATE INDEX IF NOT EXISTS fraction_transfers_to_user_email ON fraction_transfers(to_user_email);
CREATE INDEX IF NOT EXISTS fraction_transfers_investment_id ON fraction_transfers(investment_id);
CREATE INDEX IF NOT EXISTS fraction_transfers_property_id ON fraction_transfers(property_id);
CREATE INDEX IF NOT EXISTS fraction_transfers_status ON fraction_transfers(status);
CREATE INDEX IF NOT EXISTS fraction_transfers_created_at ON fraction_transfers(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE fraction_transfers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own transfers" ON fraction_transfers;
DROP POLICY IF EXISTS "Users can insert transfer requests" ON fraction_transfers;
DROP POLICY IF EXISTS "Users can update their received transfers" ON fraction_transfers;
DROP POLICY IF EXISTS "Users can cancel their own transfers" ON fraction_transfers;

-- Create policies for fraction_transfers
CREATE POLICY "Users can view their own transfers"
  ON fraction_transfers FOR SELECT
  USING (
    auth.uid() = from_user_id OR
    to_user_email IN (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Users can insert transfer requests"
  ON fraction_transfers FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update their received transfers"
  ON fraction_transfers FOR UPDATE
  USING (to_user_email IN (SELECT email FROM auth.users WHERE id = auth.uid()))
  WITH CHECK (to_user_email IN (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Users can cancel their own transfers"
  ON fraction_transfers FOR UPDATE
  USING (auth.uid() = from_user_id AND status = 'pending')
  WITH CHECK (auth.uid() = from_user_id);
```

## Instructions

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** section
3. Create a new query
4. Copy and paste the SQL above
5. Click **Run** to execute
6. You should see the table and indexes created successfully

## Table Schema Details

### Columns

- **id**: Unique identifier (UUID)
- **from_user_id**: ID of the user sending the fractions
- **to_user_email**: Email of the recipient (allows transfers to non-registered users)
- **investment_id**: Reference to the investment being transferred
- **property_id**: Reference to the property (for optimized queries)
- **num_fractions**: Number of fractions being transferred
- **fraction_price**: Price per fraction at time of transfer
- **total_amount**: Total amount (num_fractions × fraction_price)
- **status**: 'pending', 'accepted', 'declined', or 'cancelled'
- **message**: Optional message from sender
- **created_at**: When the transfer was initiated
- **accepted_at**: When the transfer was accepted
- **updated_at**: Last update timestamp

### Status Flow

```
pending → accepted → (fractions transferred, investment updated)
       → declined → (transfer rejected)
       → cancelled → (sender cancelled)
```

## Service Functions

The `fractionTransferService.js` provides these functions:

- **initiateTransfer(transferData)** - Start a new transfer
- **getPendingTransfers()** - Get pending transfer requests for current user
- **getTransferHistory()** - Get all past transfers
- **acceptTransfer(transferId)** - Accept and process transfer
- **declineTransfer(transferId)** - Decline transfer request
- **cancelTransfer(transferId)** - Cancel pending transfer (sender only)

All functions return: `{ success: boolean, data?: object, error?: string }`
