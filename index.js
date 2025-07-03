import express from "express";
import bodyParser from "body-parser";
import bookRoutes from "./routes/books.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Path setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.redirect("/books");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
