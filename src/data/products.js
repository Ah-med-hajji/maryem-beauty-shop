const products = [
  // Maquillage
  {
    id: 1,
    name: "Mascara Vioryle",
    description: "Mascara longue tenue pour des cils volumineux et parfaitement définis.",
    price: 6.000,
    category: "maquillage",
    image: "/images/mascara-vioryle.jpg",
  },
  {
    id: 2,
    name: "Vernis à Ongles Vioryle",
    description: "Vernis à ongles haute tenue avec une brillance éclatante et un séchage rapide.",
    price: 3.000,
    category: "maquillage",
    image: "/images/vernis-ongles-vioryle.jpg",
  },
  {
    id: 3,
    name: "Mascara Vioryle Noir Intense",
    description: "Mascara intensément noir pour un regard captivant et des cils allongés.",
    price: 6.000,
    category: "maquillage",
    image: "/images/mascara-vioryle-noir.jpg",
  },
  {
    id: 4,
    name: "Rouge à Lèvres Satiné",
    description: "Rouge à lèvres avec une finition satinée et un confort longue durée tout au long de la journée.",
    price: 8.000,
    category: "maquillage",
    image: "/images/rouge-levres-satine.jpg",
  },
  {
    id: 5,
    name: "Gloss à Lèvres Brillant",
    description: "Gloss transparent pour des lèvres brillantes, hydratées et irrésistibles.",
    price: 5.000,
    category: "maquillage",
    image: "/images/gloss-levres.jpg",
  },
  // Soin de la Peau
  {
    id: 6,
    name: "Crème Hydratante Visage",
    description: "Crème hydratante légère qui laisse le visage doux, lumineux et parfaitement nourri.",
    price: 9.000,
    category: "soin-peau",
    image: "/images/creme-hydratante.jpg",
  },
  {
    id: 7,
    name: "Sérum Visage Éclat",
    description: "Sérum illuminant concentré pour un teint rayonnant, uniforme et plein de vitalité.",
    price: 15.000,
    category: "soin-peau",
    image: "/images/serum-visage.jpg",
  },
  {
    id: 8,
    name: "Huile Corps Nourrissante",
    description: "Huile sèche nourrissante pour un corps satiné, parfumé et sublimé au quotidien.",
    price: 10.000,
    category: "soin-peau",
    image: "/images/huile-corps.jpg",
  },
  // Soin Capillaire
  {
    id: 9,
    name: "Masque Capillaire Réparateur",
    description: "Masque réparateur profond pour des cheveux forts, soyeux et revitalisés.",
    price: 12.000,
    category: "soin-capillaire",
    image: "/images/masque-capillaire.jpg",
  },
  {
    id: 10,
    name: "Shampooing Doux",
    description: "Shampooing doux pour un nettoyage respectueux et des cheveux éclatants de santé.",
    price: 7.000,
    category: "soin-capillaire",
    image: "/images/shampooing-doux.jpg",
  },
  // Parfums
  {
    id: 11,
    name: "Coffret Parfum Dior Sauvage & Armani Si",
    description: "Coffret duo de parfums emblématiques — Dior Sauvage pour lui et Armani Si pour elle.",
    price: 13.000,
    category: "parfums",
    image: "/images/parfum-dior-armani.jpg",
  },
  {
    id: 12,
    name: "Déodorant Spray She",
    description: "Déodorant spray féminin avec une fragrance fraîche, délicate et enveloppante.",
    price: 7.000,
    category: "parfums",
    image: "/images/deodorant-she.jpg",
  },
];

export const categories = [
  { id: "maquillage", name: "Maquillage", description: "Sublimez votre regard et vos lèvres avec nos produits maquillage professionnels" },
  { id: "soin-peau", name: "Soin de la Peau", description: "Prenez soin de votre peau avec nos soins hydratants et nourrissants" },
  { id: "soin-capillaire", name: "Soin Capillaire", description: "Révélez la beauté de vos cheveux avec nos soins capillaires expert" },
  { id: "parfums", name: "Parfums", description: "Enveloppez-vous de fragrances envoûtantes et inoubliables" },
];

export function getProductsByCategory(categoryId) {
  return products.filter((p) => p.category === categoryId);
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export default products;
