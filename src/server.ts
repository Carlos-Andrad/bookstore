import express from "express";
import pool from "./config/database";

const app = express();
const PORT = 3010;

app.use(express.json());

// Rota para obter todos os usuários
app.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Rota para adicionar um novo usuário
app.post("/users", async (req, res) => {
  const { name, email, tel, passwordHash } = req.body;
  try {
    const queryText =
      "INSERT INTO users(name, email, tel, passwordHash) VALUES($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(queryText, [
      name,
      email,
      tel,
      passwordHash,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar usuário" });
  }
});

// Rota para obter todos os livros
app.get("/book", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM book");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

// Rota para adicionar um novo livro
app.post("/book", async (req, res) => {
  const { title, author, price, category } = req.body;
  try {
    const queryText =
      "INSERT INTO book(title, author, price, category) VALUES($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(queryText, [
      title,
      author,
      price,
      category,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar livro" });
  }
});


// Rota para obter todos as lojas
app.get("/store", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM store");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar lojas" });
  }
});

// Rota para adicionar uma nova loja
app.post("/store", async (req, res) => {
  const { cep, tel } = req.body;
  try {
    const queryText = "INSERT INTO store(cep, tel) VALUES($1, $2) RETURNING *";
    const { rows } = await pool.query(queryText, [cep, tel]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar loja" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


