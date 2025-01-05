const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root12",
  database: "ecommerce",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

// Routes

// Categories CRUD
app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/categories", (req, res) => {
  const { categoryName } = req.body;
  const sql = "INSERT INTO categories (categoryName) VALUES (?)";
  db.query(sql, [categoryName], (err, result) => {
    if (err) throw err;
    res.json({ message: "Category added!", categoryId: result.insertId });
  });
});

app.put("/categories/:id", (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const sql = "UPDATE categories SET categoryName = ? WHERE categoryId = ?";
  db.query(sql, [categoryName, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Category updated!" });
  });
});

app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE categoryId = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Category deleted!" });
  });
});

// Products CRUD with Pagination
app.get("/products", (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const offset = (page - 1) * pageSize;
  const sql = `
    SELECT p.productId, p.productName, c.categoryName, p.categoryId 
    FROM products p 
    INNER JOIN categories c ON p.categoryId = c.categoryId 
    LIMIT ?, ?`;
  db.query(sql, [parseInt(offset), parseInt(pageSize)], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/products", (req, res) => {
  const { productName, categoryId } = req.body;
  const sql = "INSERT INTO products (productName, categoryId) VALUES (?, ?)";
  db.query(sql, [productName, categoryId], (err, result) => {
    if (err) throw err;
    res.json({ message: "Product added!", productId: result.insertId });
  });
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { productName, categoryId } = req.body;
  const sql = "UPDATE products SET productName = ?, categoryId = ? WHERE productId = ?";
  db.query(sql, [productName, categoryId, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Product updated!" });
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE productId = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Product deleted!" });
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
