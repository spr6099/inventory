import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import ItemDetail from "./pages/ItemDetail";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg"
          >
            Inventory Dashboard
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-white font-medium">
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Home
            </Link>
            {/* <Link
              to="/inventory"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Inventory
            </Link> */}
            <Link
              to="/add"
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition duration-200"
            >
              + Add Item
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-indigo-700 px-6 pb-4 space-y-3 text-white">
            <Link
              to="/"
              className="block hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {/* <Link
              to="/inventory"
              className="block hover:text-yellow-300"
              onClick={() => setMenuOpen(false)}
            >
              Inventory
            </Link> */}
            <Link
              to="/add"
              className="block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              + Add Item
            </Link>
          </div>
        )}
      </header>

      <main className="container mt-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </main>
    </div>
  );
}
