const genres = require("./routes/genres");
const home = require("./routes/home");

const express = require("express");
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", home);
app.use("/api/genres", genres);

// HTTP Listen to Port

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
