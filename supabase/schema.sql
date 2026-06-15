-- Malik Farms schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- farms
CREATE TABLE farms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  location TEXT,
  phone TEXT,
  whatsapp TEXT,
  theme_config JSONB DEFAULT '{}',
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO farms (slug, name, tagline, location, phone, whatsapp) VALUES
('malik', 'Malik Farms', 'Bakra Eid, sorted.', 'Pattoki, Punjab', '+92 300 1234567', '+92 300 1234567');

-- goats
CREATE TABLE goats (
  id TEXT PRIMARY KEY,
  farm_slug TEXT NOT NULL REFERENCES farms(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  teeth TEXT NOT NULL DEFAULT '2 daant',
  weight_kg INTEGER NOT NULL DEFAULT 0,
  price INTEGER NOT NULL DEFAULT 0,
  care_fee INTEGER NOT NULL DEFAULT 0,
  tag TEXT,
  reserved BOOLEAN NOT NULL DEFAULT FALSE,
  video_url TEXT,
  video_dur TEXT,
  photo_urls TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO goats (id, farm_slug, name, breed, teeth, weight_kg, price, care_fee, tag, reserved, video_dur) VALUES
('BTL-014', 'malik', 'Sultan',  'Beetal',        '2 daant', 62, 145000, 6000, 'Premium', false, '0:48'),
('TDY-007', 'malik', 'Moti',    'Teddy (Gujri)', '2 daant', 38,  78000, 4000, 'Popular', false, '0:36'),
('MKC-021', 'malik', 'Chand',   'Makhi Cheeni',  '4 daant', 54, 120000, 5500, NULL,      false, '0:41'),
('BTL-009', 'malik', 'Raja',    'Beetal',        '4 daant', 71, 175000, 6500, 'Heavy',   true,  '0:52'),
('BRB-033', 'malik', 'Kaala',   'Barbari',       '2 daant', 34,  69000, 3800, NULL,      false, '0:33'),
('NCH-005', 'malik', 'Heera',   'Nachi',         '2 daant', 45,  98000, 4800, 'New',     false, '0:44'),
('KMR-018', 'malik', 'Sheru',   'Kamori',        '4 daant', 58, 132000, 5800, NULL,      false, '0:39'),
('TDY-012', 'malik', 'Laddu',   'Teddy (Gujri)', '2 daant', 36,  74000, 4000, NULL,      true,  '0:31');

-- delivery videos (last year)
CREATE TABLE delivery_videos (
  id TEXT PRIMARY KEY,
  farm_slug TEXT NOT NULL REFERENCES farms(slug) ON DELETE CASCADE,
  title TEXT NOT NULL,
  breed TEXT NOT NULL,
  video_url TEXT,
  dur TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO delivery_videos (id, farm_slug, title, breed, dur) VALUES
('LY-01', 'malik', 'Khan family · Lahore',       'Beetal',       '1:12'),
('LY-02', 'malik', 'Sheikh family · Faisalabad', 'Makhi Cheeni', '0:58'),
('LY-03', 'malik', 'Butt family · Gujranwala',   'Teddy',        '1:04'),
('LY-04', 'malik', 'Malik family · Islamabad',   'Beetal',       '1:21'),
('LY-05', 'malik', 'Awan family · Rawalpindi',   'Nachi',        '0:49'),
('LY-06', 'malik', 'Chaudhry family · Sialkot',  'Kamori',       '1:08');

-- admin users
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  farm_slug TEXT NOT NULL REFERENCES farms(slug) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE goats ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read (anon key)
CREATE POLICY "public_read_farms" ON farms FOR SELECT USING (true);
CREATE POLICY "public_read_goats" ON goats FOR SELECT USING (true);
CREATE POLICY "public_read_delivery_videos" ON delivery_videos FOR SELECT USING (true);

-- Admin writes use service_role key which bypasses RLS — no extra policies needed
