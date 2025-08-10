const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchItems(q, category) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const res = await fetch(`${BASE}/items?${params.toString()}`);
  return res.json();
}
export async function fetchItem(id) {
  const res = await fetch(`${BASE}/items/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}
export async function addItem(payload) {
  const res = await fetch(`${BASE}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
export async function updateItem(id, payload) {
  const res = await fetch(`${BASE}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
