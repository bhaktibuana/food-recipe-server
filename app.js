const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./app/routes/index");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
