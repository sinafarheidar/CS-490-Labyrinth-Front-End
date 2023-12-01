import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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

app.get("/logs", (req, res) => {
  const query = "SELECT * FROM logs";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.post("/log", (req, res) => {
  const action = "Successful Edit";
  const dateCreated = new Date();
  const IPAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"] || "";
  const OS = parseOS(userAgent);

  const query =
    "INSERT INTO textFiles (IPAddress, OS, Action, date_created) VALUES (?, ?, ?, ?)";
  db.query(query, [IPAddress, OS, action, dateCreated]);
});

app.get("/keys/:pathKey", (req, res) => {
  const pathKey = req.params.pathKey;
  const query = "SELECT COUNT(*) AS count FROM pathKeys WHERE `pathKey` = ?";

  db.query(query, [pathKey], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    const count = results[0].count;
    if (count > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});

app.get("/file/:fileid", (req, res) => {
  const fileName = req.params.fileid;
  const query = "SELECT * FROM textFiles WHERE id = ?";
  db.query(query, [fileName], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) return res.status(404).send("File not found");

    const fileData = results[0].fileData.toString("utf8");
    console.log(fileData);
    res.send(fileData);
  });
});

app.get("/files", (req, res) => {
  const query = "SELECT id, fileName FROM textFiles";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }

    res.send(results);
  });
});

app.post("/update-file", (req, res) => {
  const { fileId, fileContent } = req.body;
  const fileIdNum = parseInt(fileId);

  const query = `UPDATE textFiles SET fileData = ? WHERE id = ?`;

  db.query(query, [fileContent, fileIdNum], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json("Server error during file update");
    } else if (results.affectedRows === 0) {
      res.status(404).json("File not found or no changes made");
    } else {
      res.status(200).json("File updated successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const parseOS = (userAgent: string): string => {
  if (userAgent.includes("Win")) return "Windows";
  if (userAgent.includes("Mac")) return "MacOS";
  if (userAgent.includes("X11")) return "UNIX";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("like Mac")) return "iOS";
  return "Unknown OS";
};

export {};
