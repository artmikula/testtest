const express = require("express");
const cors = require("cors");
const pool = require("./db");
const db = require("./db");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Testing... success");
});

app.get("/users/:username", async (req, res) => {
  let conn;
  const userID = req.params.username;
  try {
    conn = await pool.getConnection();
    let query = `select * from users WHERE username="${userID}"`;
    let rows = await conn.query(query);
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.get("/verify/:username", async (req, res) => {
  let conn;
  const userID = req.params.username;
  try {
    conn = await pool.getConnection();
    let query = `SELECT password FROM users WHERE username="${userID}"`;
    let rows = await conn.query(query);
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.post("/adduser", async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;

  let conn;
  try {
    conn = await pool.getConnection();
    let query = `INSERT into USERS (username, password) VALUES ("${user}", "${password}")`;
    let rows = await conn.query(query);
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
