const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_PATH = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

function readData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return { items: [] };
  }
}
function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

app.get("/items", (req, res) => {
  const q = req.query.q ? req.query.q.toLowerCase() : null;
  const category = req.query.category ? req.query.category.toLowerCase() : null;
  const data = readData();
  let items = data.items || [];

  if (q) {
    items = items.filter(
      (it) =>
        it.name.toLowerCase().includes(q) ||
        (it.category && it.category.toLowerCase().includes(q)) ||
        (it.description && it.description.toLowerCase().includes(q))
    );
  }
  if (category) {
    items = items.filter((it) => it.category && it.category.toLowerCase() === category);
  }

  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const data = readData();
  const item = (data.items || []).find((i) => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/items", (req, res) => {
  const { name, category, quantity = 0, price = 0, description = "" } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const data = readData();
  const newItem = {
    id: uniqid("item_"),
    name,
    category: category || "Uncategorized",
    quantity: Number(quantity),
    price: Number(price),
    description,
    status: Number(quantity) > 20 ? "In Stock" : Number(quantity) > 0 ? "Low" : "Out of Stock"
  };

  data.items = data.items || [];
  data.items.push(newItem);
  writeData(data);

  res.status(201).json(newItem);
});

app.put("/items/:id", (req, res) => {
  const data = readData();
  const idx = data.items.findIndex((i) => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Item not found" });

  const item = data.items[idx];
  const { name, category, quantity, price, description } = req.body;

  item.name = name ?? item.name;
  item.category = category ?? item.category;
  item.quantity = quantity !== undefined ? Number(quantity) : item.quantity;
  item.price = price !== undefined ? Number(price) : item.price;
  item.description = description ?? item.description;
  item.status = item.quantity > 20 ? "In Stock" : item.quantity > 0 ? "Low" : "Out of Stock";

  data.items[idx] = item;
  writeData(data);

  res.json(item);
});


app.get("/", (req, res) => res.send({ ok: true, message: "Inventory API running" }));

app.listen(PORT, () => console.log(` backend running on http://localhost:${PORT}`));
