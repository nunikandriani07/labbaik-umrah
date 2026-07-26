-- Labbaik Umrah SaaS - Supabase Database Schema Migration
-- Migration Name: 20260725_init_labbaik.sql

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    city TEXT DEFAULT 'Jakarta',
    is_premium BOOLEAN DEFAULT FALSE,
    departure_date DATE DEFAULT (CURRENT_DATE + INTERVAL '47 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. PRAYER BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    doa_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, doa_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks
    FOR ALL USING (auth.uid() = user_id);

-- 3. CHECKLIST PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, item_id)
);

ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own checklist" ON public.checklists
    FOR ALL USING (auth.uid() = user_id);

-- 4. BUDGET CALCULATOR PLANS TABLE
CREATE TABLE IF NOT EXISTS public.budget_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    origin_city TEXT DEFAULT 'Jakarta',
    duration_days INTEGER DEFAULT 12,
    pax_count INTEGER DEFAULT 2,
    hotel_star INTEGER DEFAULT 4,
    souvenir_budget NUMERIC DEFAULT 3500000,
    total_cost NUMERIC,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.budget_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own budget plan" ON public.budget_plans
    FOR ALL USING (auth.uid() = user_id);

-- 5. TRIGGER FOR NEW USER REGISTRATION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, city, is_premium)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', 'Jamaah Umroh'),
        COALESCE(NEW.raw_user_meta_data->>'city', 'Jakarta'),
        FALSE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
