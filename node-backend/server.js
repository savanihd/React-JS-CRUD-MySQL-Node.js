const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'node_api',
  password: 'root',
});

// List Posts
app.get("/api/posts", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const sortBy = req.query.sortBy || 'id';
    const order = req.query.order === "desc" ? "DESC" : "ASC";

    const search = req.query.search || "";
    console.log(search);
    const searchTerm = `%${search}%`;
    let params = [limit, offset];

    let countQuery = "SELECT COUNT(*) as total FROM posts";
    let dataQuery = `SELECT * FROM posts ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;
    // console.log(dataQuery);

    if(search !== ""){
        countQuery = "SELECT COUNT(*) as total FROM posts WHERE title LIKE ? OR body LIKE ?";
        dataQuery = `SELECT * FROM posts WHERE title LIKE ? OR body LIKE ? ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;
        params = [searchTerm, searchTerm, limit, offset];
    }

    db.query(countQuery, search !== "" ? [searchTerm, searchTerm] : [], (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const total = countResult[0].total;
        const totalPages = Math.ceil(total/limit);

        db.query(dataQuery, params, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            
            res.json({
                data: rows,
                page,
                totalPages,
                total
            });
        });

    });
});

// Create Post
app.post("/api/posts", (req, res) => {
    const {title, body} = req.body;
    db.query("INSERT INTO posts (title, body) values (?, ?)", [title, body], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({id: result.insertId, title:title, body:body});
    });
});

// List Posts
app.get("/api/posts/:id", (req, res) => {
    db.query("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows[0]);
    });
});

// Update Post
app.put("/api/posts/:id", (req, res) => {
    const {title, body} = req.body;
    db.query("UPDATE posts SET title = ?, body = ? where id = ?", [title, body, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({id: req.params.id, title:title, body:body});
    });
});

// Delete post
app.delete("/api/posts/:id", (req, res) => {
    db.query("DELETE from posts WHERE id = ?", [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({"message": "Post deleted"});
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});