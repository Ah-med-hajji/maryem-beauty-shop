-- =============================================
-- Maryem Beauty Shop — Supabase Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- ── Categories ──
CREATE TABLE IF NOT EXISTS categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Products ──
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 3) NOT NULL DEFAULT 0,
  category_slug TEXT NOT NULL REFERENCES categories(slug) ON DELETE RESTRICT,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ──
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public read active products" ON products
  FOR SELECT USING (true);

-- =============================================
-- Seed Data
-- =============================================

-- Categories
INSERT INTO categories (slug, name, description) VALUES
  ('maquillage', 'Maquillage', 'Sublimez votre regard et vos lèvres avec nos produits maquillage professionnels'),
  ('soin-peau', 'Soin de la Peau', 'Prenez soin de votre peau avec nos soins hydratants et nourrissants'),
  ('soin-capillaire', 'Soin Capillaire', 'Révélez la beauté de vos cheveux avec nos soins capillaires expert'),
  ('parfums', 'Parfums', 'Enveloppez-vous de fragrances envoûtantes et inoubliables'),
  ('lingerie', 'Lingerie', 'Découvrez notre lingerie féminine alliant confort, élégance et raffinement')
ON CONFLICT (slug) DO NOTHING;

-- Products (explicit IDs to match existing cart references)
INSERT INTO products (id, name, description, price, category_slug, image, is_active) VALUES
  (1,  'Mascara Vioryle', 'Mascara longue tenue pour des cils volumineux et parfaitement définis.', 6.000, 'maquillage', '/images/mascara-vioryle.jpg', true),
  (2,  'Vernis à Ongles Vioryle', 'Vernis à ongles haute tenue avec une brillance éclatante et un séchage rapide.', 3.000, 'maquillage', '/images/vernis-ongles-vioryle.jpg', true),
  (3,  'Mascara Vioryle Noir Intense', 'Mascara intensément noir pour un regard captivant et des cils allongés.', 6.000, 'maquillage', '/images/mascara-vioryle-noir.jpg', true),
  (4,  'Rouge à Lèvres Satiné', 'Rouge à lèvres avec une finition satinée et un confort longue durée tout au long de la journée.', 8.000, 'maquillage', '/images/rouge-levres-satine.jpg', true),
  (5,  'Gloss à Lèvres Brillant', 'Gloss transparent pour des lèvres brillantes, hydratées et irrésistibles.', 5.000, 'maquillage', '/images/gloss-levres.jpg', true),
  (6,  'Crème Hydratante Visage', 'Crème hydratante légère qui laisse le visage doux, lumineux et parfaitement nourri.', 9.000, 'soin-peau', '/images/creme-hydratante.jpg', true),
  (7,  'Sérum Visage Éclat', 'Sérum illuminant concentré pour un teint rayonnant, uniforme et plein de vitalité.', 15.000, 'soin-peau', '/images/serum-visage.jpg', true),
  (8,  'Huile Corps Nourrissante', 'Huile sèche nourrissante pour un corps satiné, parfumé et sublimé au quotidien.', 10.000, 'soin-peau', '/images/huile-corps.jpg', true),
  (9,  'Masque Capillaire Réparateur', 'Masque réparateur profond pour des cheveux forts, soyeux et revitalisés.', 12.000, 'soin-capillaire', '/images/masque-capillaire.jpg', true),
  (10, 'Shampooing Doux', 'Shampooing doux pour un nettoyage respectueux et des cheveux éclatants de santé.', 7.000, 'soin-capillaire', '/images/shampooing-doux.jpg', true),
  (11, 'Coffret Parfum Dior Sauvage & Armani Si', 'Coffret duo de parfums emblématiques — Dior Sauvage pour lui et Armani Si pour elle.', 13.000, 'parfums', '/images/parfum-dior-armani.jpg', true),
  (12, 'Déodorant Spray She', 'Déodorant spray féminin avec une fragrance fraîche, délicate et enveloppante.', 7.000, 'parfums', '/images/deodorant-she.jpg', true),
  (13, 'Soutien-gorge Bambino', 'Soutien-gorge confortable et élégant, doux au toucher pour un port quotidien.', 0.0, 'lingerie', '/images/soutien-gorge-bambino.jpg', true),
  (14, 'Soutien-gorge Rose Lovers', 'Soutien-gorge blanc avec détails floraux, féminin et raffiné pour une allure romantique.', 0.0, 'lingerie', '/images/soutien-gorge-rose-lovers.jpg', true),
  (15, 'Soutien-gorge MOLLYSENA Beyond Comfort', 'Soutien-gorge MOLLYSENA alliant confort absolu et maintien parfait pour une féminité assumée.', 0.0, 'lingerie', '/images/soutien-gorge-mollysena.jpg', true)
ON CONFLICT DO NOTHING;

-- Reset the sequence so new products get IDs starting after the seed data
SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 0) FROM products));

-- =============================================
-- Storage: product-images bucket
-- =============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to product images
CREATE POLICY "Public read product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow service_role to upload/delete
CREATE POLICY "Admin upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'service_role');

CREATE POLICY "Admin update product images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'service_role');

CREATE POLICY "Admin delete product images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'service_role');
