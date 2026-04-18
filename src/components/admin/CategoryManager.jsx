import { useState, useEffect, useCallback } from "react";
import supabaseAdmin from "../../lib/supabaseAdmin";
import AdminModal from "./AdminModal";

const emptyForm = { slug: "", name: "", description: "" };

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    if (!supabaseAdmin) {
      setError("Supabase non configuré. Vérifiez les variables d'environnement.");
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("categories")
        .select("slug, name, description, products:products(count)")
        .order("name");
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err.message || "Erreur lors du chargement des catégories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat.slug);
    setForm({ slug: cat.slug, name: cat.name, description: cat.description || "" });
    setError("");
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    if (!form.slug.trim() || !form.name.trim()) {
      setError("Le slug et le nom sont obligatoires");
      setSaving(false);
      return;
    }

    try {
      if (editing) {
        const { error } = await supabaseAdmin
          .from("categories")
          .update({ name: form.name.trim(), description: form.description.trim() || null })
          .eq("slug", editing);
        if (error) throw error;
      } else {
        const { error } = await supabaseAdmin
          .from("categories")
          .insert({ slug: form.slug.trim(), name: form.name.trim(), description: form.description.trim() || null });
        if (error) throw error;
      }
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      const { error } = await supabaseAdmin.from("categories").delete().eq("slug", slug);
      if (error) throw error;
      setConfirmDelete(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="admin-loading">Chargement...</div>;

  if (error && categories.length === 0) {
    return (
      <section>
        <div className="admin-section-header">
          <h2>Catégories</h2>
          <button className="btn btn-primary" onClick={openAdd}>+ Ajouter</button>
        </div>
        <div className="admin-empty">
          <p style={{ color: "#d32f2f" }}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="admin-section-header">
        <h2>
          Catégories
          <span className="admin-count">({categories.length})</span>
        </h2>
        <button className="btn btn-primary" onClick={openAdd}>
          + Ajouter
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="admin-empty">
          <p>Aucune catégorie. Cliquez sur "+ Ajouter" pour en créer une.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Slug</th>
                <th>Nom</th>
                <th>Produits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.slug}>
                  <td><code>{cat.slug}</code></td>
                  <td>{cat.name}</td>
                  <td>{cat.products?.[0]?.count ?? 0}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-btn-icon" onClick={() => openEdit(cat)} title="Modifier">
                        ✏️
                      </button>
                      <button className="admin-btn-icon danger" onClick={() => setConfirmDelete(cat)} title="Supprimer">
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
          title={editing ? "Modifier la catégorie" : "Nouvelle catégorie"}
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
          {!editing && (
            <div className="admin-field">
              <label htmlFor="cat-slug">Slug (identifiant unique)</label>
              <input
                id="cat-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.replace(/[^a-z0-9-]/g, "") })}
                placeholder="ex: maquillage"
                required
              />
              <p className="admin-field__hint">Lettres minuscules, chiffres et tirets uniquement</p>
            </div>
          )}
          <div className="admin-field">
            <label htmlFor="cat-name">Nom</label>
            <input
              id="cat-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="ex: Maquillage"
              required
            />
          </div>
          <div className="admin-field">
            <label htmlFor="cat-desc">Description</label>
            <textarea
              id="cat-desc"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Description de la catégorie"
            />
          </div>
          {error && <p className="admin-login__error">{error}</p>}
        </AdminModal>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <AdminModal
          title="Supprimer la catégorie"
          onClose={() => setConfirmDelete(null)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setConfirmDelete(null)}>Annuler</button>
              <button
                className="btn btn-primary"
                style={{ background: "#d32f2f" }}
                onClick={() => handleDelete(confirmDelete.slug)}
                disabled={(confirmDelete.products?.[0]?.count ?? 0) > 0}
              >
                Supprimer
              </button>
            </>
          }
        >
          <div className="admin-confirm__text">
            <p>Voulez-vous vraiment supprimer la catégorie <strong>{confirmDelete.name}</strong> ?</p>
            {(confirmDelete.products?.[0]?.count ?? 0) > 0 && (
              <span className="admin-confirm__warning">
                Impossible : cette catégorie contient {confirmDelete.products[0].count} produit(s).
                Déplacez-les d'abord.
              </span>
            )}
          </div>
        </AdminModal>
      )}
    </section>
  );
}
