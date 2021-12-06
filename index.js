const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");

const logger = require("./logger");

const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use(logger);

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Thriller" },
];

// HTTP GET

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  if (!genre)
    return res
      .status(404)
      .send(`There is no genre with the ID of ${req.params.id}`);
  res.send(genre);
});

// HTTP POSt

app.post("/api/genres", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

// HTTP PUT

app.put("/api/genres/:id", (req, res) => {
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

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  if (!genre)
    return res
      .status(404)
      .send(`There is no genre with the ID of ${req.params.id}`);

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// HTTP Listen to Port

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
