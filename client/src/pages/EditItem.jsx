import React, { useEffect, useState } from "react";
import { fetchItem, updateItem } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditItem() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem(id).then(setForm).catch(()=>alert("Item not found"));
  }, [id]);

  if (!form) return <div>Loading...</div>;

  async function onSubmit(e) {
    e.preventDefault();
    await updateItem(id, form);
    navigate("/");
  }

  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h3 className="text-lg font-medium mb-4">Edit Item</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={form.category} onChange={e=>setForm({...form, category:e.target.value})} placeholder="Category" className="w-full p-2 border rounded" />
        <input type="number" value={form.quantity} onChange={e=>setForm({...form, quantity:Number(e.target.value)})} placeholder="Quantity" className="w-full p-2 border rounded" />
        <input type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} placeholder="Price" className="w-full p-2 border rounded" />
        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded" />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
