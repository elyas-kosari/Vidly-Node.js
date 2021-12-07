const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Thriller" },
];

// HTTP GET

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  if (!genre)
    return res
      .status(404)
      .send(`There is no genre with the ID of ${req.params.id}`);
  res.send(genre);
});

// HTTP POSt

router.post("/", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

// HTTP PUT

router.put("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  if (!genre)
    return res
      .status(404)
      .send(`There is no genre with the ID of ${req.params.id}`);

  if (req.body.name.length < 3)
    return res.status(400).send("Genre name must be more than 3 characters");

  genre.name = req.body.name;
  res.send(genre);
});

// HTTP DELETE

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  if (!genre)
    return res
      .status(404)
      .send(`There is no genre with the ID of ${req.params.id}`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;
