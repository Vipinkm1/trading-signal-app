require("dotenv").config();

const express = require("express");
const cors = require("cors");

const signalRoutes = require("./routes/signalRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/signals", signalRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});