import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Michael2013!",
    database: "bookstore",
});

app.get("/", (req, res) => {
    res.json("This is the backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM bookstore.books";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO bookstore.books(`title`, `description`, `price`, `cover`) VALUES (?, ?, ?, ?)";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM bookstore.books WHERE id = ? ";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE bookstore.books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("Connected to backend");
});
