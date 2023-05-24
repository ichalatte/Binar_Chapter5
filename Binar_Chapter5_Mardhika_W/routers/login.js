const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res, next) => {
  res.render("login", { title: "Login" });
});

router.post("/", (req, res, next) => {
  const { username, password } = req.body;

  // Membaca data pengguna dari file JSON
  const userData = JSON.parse(fs.readFileSync("user.json"));

  // Mencari pengguna dengan username yang cocok
  const user = userData.find((user) => user.username === username);

  if (user) {
    // Jika pengguna dengan username ditemukan
    if (user.password === password) {
      // Jika password cocok
      res.status(200).json({ message: "Login successful" });
    } else {
      // Jika password tidak cocok
      res.status(304).json({ message: "Invalid password" });
    }
  } else {
    // Jika pengguna dengan username tidak ditemukan
    res.status(401).json({ message: "Invalid username" });
  }
});

module.exports = router;
