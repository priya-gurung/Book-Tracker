import express from "express";
import pool from "../config.js";
import axios from "axios";
import exp from "constants";
const router = express.Router();

//view all books
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM books ORDER BY created_at DESC");
        res.render("books", {books: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error fetching books");
    }
});

//form to add new book
router.get("/new", (req, res) =>{
    res.render("addBook");
});

//add new book
router.post("/", async (req, res) => {
    const {title, author, rating, notes, read_date} = req.body;
    try{
        const coverRes = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
        const coverID = coverRes.data.docs[0].cover_i;
        const cover_url= coverID?`https://covers.openlibrary.org/b/id/${coverID}-L.jpg`:null;

        await pool.query(
            "INSERT INTO books (title, author, rating, notes, read_date, cover_url) VALUES ($1, $2, $3, $4, $5, $6)",
            [title, author, rating, notes, read_date, cover_url]
        );
        res.redirect("/books");
    } catch (err){
        console.error(err);
        res.send("Error adding book");
    }
});

export default router;