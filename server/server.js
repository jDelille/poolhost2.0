const express = require('express');
const axios = require('axios');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")

dotenv.config();

// set up express server
const app = express();
const PORT = 3333;

app.use(express.json());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/picks", require("./routers/userPicksRouter"));
app.use("/pool", require("./routers/poolRouter"));

app.use("/auth", require("./routers/userRouter"));

// connect to mongodb

mongoose.connect(
 process.env.MDB_CONNECT_STRING,
 {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 },
 (err) => {
   if (err) return console.error(err);
   console.log("Connected to MongoDB");
 }
);

//GAMEBAR API

app.get("/gamebar", async (req, res) => {
 const response = await axios.get(
   "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=basketball&league=nba"
 );
 const news = response.data;
 res.status(200).send(news);
});

// DISPLAY GAMES API

app.get("/games", async (req, res) => {
  const response = await axios.get(
    "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json"
  );
  const news = response.data;
  res.status(200).send(news);
 });



app.listen(PORT, () => console.log('Hello Master Bweem, the server is running on 3333.'))