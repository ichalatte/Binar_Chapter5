const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  const name = req.query.name || "Games";
  console.log(name);
  res.render("games", {
    title: "Try Games",
    name: name,
  });
});

module.exports = router;
