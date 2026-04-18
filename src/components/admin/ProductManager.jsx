import { useState, useEffect, useCallback } from "react";
import supabaseAdmin from "../../lib/supabaseAdmin";
import AdminModal from "./AdminModal";

const emptyForm = { name: "", description: "", price: "", category_slug: "", image: "", is_active: true };

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    const [prodRes, catRes] = await Promise.all([
      supabaseAdmin.from("products").select("*").order("id"),
      supabaseAdmin.from("categories").select("slug, name").order("name"),
    ]);
    if (prodRes.error) setError(prodRes.error.message);
    else setProducts(prodRes.data);
    if (catRes.error) setError(catRes.error.message);
    else setCategories(catRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm, category_slug: categories[0]?.slug || "" });
    setError("");
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditing(product.id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      category_slug: product.category_slug,
      image: product.image || "",
      is_active: product.is_active,
    });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    if (!form.name.trim()) {
      setError("Le nom est obligatoire");
      setSaving(false);
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: parseFloat(form.price) || 0,
      category_slug: form.category_slug,
      image: form.image.trim() || null,
      is_active: form.is_active,
    };

    if (editing) {
      const { error } = await supabaseAdmin
        .from("products")
        .update(payload)
        .eq("id", editing);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabaseAdmin
        .from("products")
        .insert(payload);
      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    setShowForm(false);
    setSaving(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setConfirmDelete(null);
      fetchData();
    }
  };

  const toggleActive = async (product) => {
    const { error } = await supabaseAdmin
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);
    if (error) setError(error.message);
    else fetchData();
  };

  const catName = (slug) => categories.find((c) => c.slug === slug)?.name || slug;

  if (loading) return <div className="admin-loading">Chargement...</div>;

  return (
    <section>
      <div className="admin-section-header">
        <h2>
          Produits
          <span className="admin-count">({products.length})</span>
        </h2>
        <button className="btn btn-primary" onClick={openAdd}>
          + Ajouter
        </button>
      </div>

      {products.length === 0 ? (
        <div className="admin-empty">
          <p>Aucun produit. Cliquez sur "+ Ajouter" pour en créer un.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="admin-table__img" />
                    ) : (
                      <div className="admin-table__img" style={{ background: "#f5d5e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#6b5860" }}>
                        —
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                    {product.description && (
                      <br />
                    )}
                    <span style={{ fontSize: "0.8rem", color: "#6b5860" }}>
                      {product.description?.substring(0, 60)}{product.description?.length > 60 ? "..." : ""}
                    </span>
                  </td>
                  <td>{catName(product.category_slug)}</td>
                  <td>{Number(product.price).toFixed(3)} DT</td>
                  <td>
                    <label className="admin-toggle" title={product.is_active ? "Actif — cliquer pour désactiver" : "Inactif — cliquer pour activer"}>
                      <input
                        type="checkbox"
                        checked={product.is_active}
                        onChange={() => toggleActive(product)}
                      />
                      <span className="admin-toggle__slider" />
                    </label>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-btn-icon" onClick={() => openEdit(product)} title="Modifier">
                        ✏️
                      </button>
                      <button className="admin-btn-icon danger" onClick={() => setConfirmDelete(product)} title="Supprimer">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit modal */}
      {showForm && (
        <AdminModal
          title={editing ? "Modifier le produit" : "Nouveau produit"}
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Enregistrement..." : editing ? "Enregistrer" : "Créer"}
              </button>
            </>
          }
        >
          <div className="admin-field">
            <label htmlFor="prod-name">Nom</label>
            <input
              id="prod-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nom du produit"
              required
            />
          </div>
          <div className="admin-field">
            <label htmlFor="prod-desc">Description</label>
            <textarea
              id="prod-desc"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description du produit"
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="admin-field" style={{ flex: 1 }}>
              <label htmlFor="prod-price">Prix (DT)</label>
              <input
                id="prod-price"
                type="number"
                step="0.001"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.000"
              />
            </div>
            <div className="admin-field" style={{ flex: 1 }}>
              <label htmlFor="prod-cat">Catégorie</label>
              <select
                id="prod-cat"
                value={form.category_slug}
                onChange={(e) => setForm({ ...form, category_slug: e.target.value })}
              >
                <option value="">— Choisir —</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label htmlFor="prod-image">URL de l'image</label>
            <input
              id="prod-image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/mon-produit.jpg"
            />
            <p className="admin-field__hint">Chemin relatif (/images/...) ou URL complète</p>
          </div>
          {editing && (
            <div className="admin-field">
              <label className="admin-toggle" style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                />
                <span className="admin-toggle__slider" />
                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{form.is_active ? "Actif" : "Inactif"}</span>
              </label>
            </div>
          )}
          {error && <p className="admin-login__error">{error}</p>}
        </AdminModal>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <AdminModal
          title="Supprimer le produit"
          onClose={() => setConfirmDelete(null)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Annuler</button>
              <button
                className="btn btn-primary"
                style={{ background: "#d32f2f" }}
                onClick={() => handleDelete(confirmDelete.id)}
              >
                Supprimer
              </button>
            </>
          }
        >
          <div className="admin-confirm__text">
            <p>Voulez-vous vraiment supprimer <strong>{confirmDelete.name}</strong> ?</p>
            <span className="admin-confirm__warning">Cette action est irréversible.</span>
          </div>
        </AdminModal>
      )}

      {error && !showForm && !confirmDelete && (
        <p className="admin-login__error" style={{ marginTop: "12px" }}>{error}</p>
      )}
    </section>
  );
}
