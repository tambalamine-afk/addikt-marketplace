-- ==============================================================================
-- ADDIKT MARKETPLACE - Migration initiale (état de la base au 13/09/2026)
-- ==============================================================================
-- Reprend l'ancien supabase/schema.sql SANS les DROP TABLE, plus la colonne
-- profiles.is_top_boutique ajoutée directement en production.
--
-- Cette migration décrit des tables qui existent DÉJÀ en production.
-- Ne pas l'exécuter sur la prod : la marquer comme appliquée avec
--   npx supabase migration repair --status applied 20260913000000
-- Elle sert à recréer la base à l'identique en local ou sur un nouveau projet.
-- ==============================================================================

-- Activer l'extension pour les UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. TABLES
-- ==============================================================================

-- Table: profiles (liée à auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  bio TEXT,
  phone TEXT,
  location TEXT,
  rating_avg DECIMAL(3,2) DEFAULT 0.00,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Colonne ajoutée en production hors fichier (utilisée par la home et le profil vendeur)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_top_boutique BOOLEAN NOT NULL DEFAULT false;

-- Table: categories
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: listings (Annonces)
CREATE TABLE listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand TEXT,
  size TEXT,
  condition TEXT,
  color TEXT,
  price INTEGER NOT NULL, -- Prix en FCFA
  currency TEXT DEFAULT 'FCFA',
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'reserved', 'sold', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: listing_images
CREATE TABLE listing_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: favorites
CREATE TABLE favorites (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);

-- Table: followers
CREATE TABLE followers (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);

-- Table: conversations
CREATE TABLE conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(listing_id, buyer_id) -- Une seule conversation par article et acheteur
);

-- Table: messages
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Table: addresses
CREATE TABLE addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  label TEXT, -- ex: "Maison", "Travail"
  address_line TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: orders
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  buyer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total_amount INTEGER NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('wave', 'orange_money', 'cod', 'card')),
  delivery_address_id UUID REFERENCES addresses(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: reviews
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reviewed_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(order_id, reviewer_id)
);

-- ==============================================================================
-- 2. POLITIQUES DE SÉCURITÉ (RLS)
-- ==============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Categories are viewable by everyone." ON categories FOR SELECT USING (true);

CREATE POLICY "Active listings are viewable by everyone." ON listings FOR SELECT USING (status = 'active' OR auth.uid() = seller_id);
CREATE POLICY "Users can insert their own listings." ON listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Users can update own listings." ON listings FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Listing images are viewable by everyone." ON listing_images FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert images" ON listing_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own favorites." ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites." ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites." ON favorites FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Followers are viewable by everyone." ON followers FOR SELECT USING (true);
CREATE POLICY "Users can insert their own follows." ON followers FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete their own follows." ON followers FOR DELETE USING (auth.uid() = follower_id);

CREATE POLICY "Participants can view conversations." ON conversations FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Users can insert conversations." ON conversations FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Participants can view messages." ON messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM conversations c WHERE c.id = messages.conversation_id AND (c.buyer_id = auth.uid() OR c.seller_id = auth.uid())
  )
);
CREATE POLICY "Senders can insert messages." ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Participants can view orders." ON orders FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can insert orders." ON orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can view their own addresses." ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own addresses." ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses." ON addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses." ON addresses FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Reviews are viewable by everyone." ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews." ON reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- ==============================================================================
-- 3. TRIGGERS (Création auto du profil)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url, cover_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'cover_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- 4. DONNÉES DE RÉFÉRENCE - Catégories principales
-- ==============================================================================
INSERT INTO categories (name, slug) VALUES
('Femmes', 'femmes'),
('Hommes', 'hommes'),
('Enfants', 'enfants'),
('Beauté', 'beaute'),
('Marques', 'marques'),
('Sports', 'sports')
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 5. REALTIME (messagerie)
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
