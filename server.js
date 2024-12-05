const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory data storage (replace with a database in production)
let items = [
  { id: 1, name: "Item 1", description: "This is item 1" },
  { id: 2, name: "Item 2", description: "This is item 2" },
];

// CREATE: Add a new item
app.post("/api/items", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  const newItem = {
    id: items.length + 1,
    name,
    description,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// READ: Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// READ: Get a single item by ID
app.get("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// UPDATE: Update an item by ID
app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (name) item.name = name;
  if (description) item.description = description;

  res.json(item);
});

// DELETE: Delete an item by ID
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  items.splice(itemIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
