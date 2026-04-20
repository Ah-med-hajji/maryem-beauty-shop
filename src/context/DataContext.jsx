import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import supabase from "../lib/supabase";
import staticProducts, { categories as staticCategories } from "../data/products";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

  const fetchData = useCallback(async () => {
    if (!supabase) {
      setProducts(staticProducts);
      setCategories(staticCategories);
      setLoading(false);
      return;
    }

    try {
      const [catRes, prodRes] = await Promise.all([
        supabase.from("categories").select("*").order("name"),
        supabase.from("products").select("*").eq("is_active", true).order("id"),
      ]);

      if (catRes.error) throw catRes.error;
      if (prodRes.error) throw prodRes.error;

      if (catRes.data.length > 0) {
        setCategories(catRes.data.map((c) => ({
          id: c.slug,
          name: c.name,
          description: c.description,
          icon: c.icon || "✨",
        })));
      } else if (isFirstLoad.current) {
        setCategories(staticCategories);
      }

      if (prodRes.data.length > 0) {
        setProducts(prodRes.data.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: Number(p.price),
          category: p.category_slug,
          image: p.image,
        })));
      } else if (isFirstLoad.current) {
        setProducts(staticProducts);
      }
    } catch (err) {
      console.warn("Supabase fetch failed:", err.message);
      if (isFirstLoad.current) {
        setProducts(staticProducts);
        setCategories(staticCategories);
      }
    } finally {
      setLoading(false);
      isFirstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getProductsByCategory = useCallback(
    (categoryId) => products.filter((p) => p.category === categoryId),
    [products]
  );

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        loading,
        getProductsByCategory,
        getProductById,
        refetch: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
