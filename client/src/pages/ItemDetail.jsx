import React, { useEffect, useState } from "react";
import { fetchItem } from "../api";
import { useParams, Link } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchItem(id).then(setItem).catch(()=>alert("Item not found"));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h3 className="text-2xl font-semibold mb-2">{item.name}</h3>
      <div className="text-sm text-gray-600 mb-4">Category: {item.category}</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><strong>Quantity</strong><div>{item.quantity}</div></div>
        <div><strong>Price</strong><div>{item.price.toFixed(2)}</div></div>
      </div>
      <div className="mb-4"><strong>Status</strong><div>{item.status}</div></div>
      <div className="mb-4"><strong>Description</strong><div>{item.description || "—"}</div></div>
      <div className="flex gap-2">
        <Link to={`/edit/${item.id}`} className="px-3 py-1 bg-indigo-600 text-white rounded">Edit</Link>
        <Link to="/" className="px-3 py-1 border rounded">Back</Link>
      </div>
    </div>
  );
}
