import React, { useEffect, useState } from "react";
import { fetchItems } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  async function load() {
    const res = await fetchItems(q, category);
    setItems(res);
  }

  useEffect(() => {
    load();
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    await load();
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📦 Inventory
        </h2>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
          Total Items:{" "}
          <span className="font-semibold text-gray-900">{items.length}</span>
        </div>
      </div>

      {/* -----------Search & Filter-------------- */}
      <form
        onSubmit={onSearch}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 Search name/category"
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 flex-1"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="📂 Filter category"
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors duration-200"
        >
          Search
        </button>
      </form>

      {/* -------------Items List----------- */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-indigo-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length > 0 ? (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="p-3 text-gray-600">{item.category}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right text-green-600 font-semibold">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <Link
                        to={`/item/${item.id}`}
                        className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${item.id}`}
                        className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-500"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*---------------- Mobile ------------------ */}
        <div className="sm:hidden p-4 space-y-4">
          {items.length > 0 ? (
            items.map((it) => (
              <div
                key={it.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{it.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      it.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {it.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Category: {it.category}</p>
                <p className="text-sm">Quantity: {it.quantity}</p>
                <p className="text-sm font-semibold text-green-700">
                  ₹{it.price.toFixed(2)}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <Link
                    to={`/item/${it.id}`}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${it.id}`}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-500"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}
