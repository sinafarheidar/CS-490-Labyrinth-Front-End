import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GussingtonBowser12!",
  database: "sys",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

app.get("/data", (req, res) => {
  const query = "SELECT * FROM logs";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export {};
