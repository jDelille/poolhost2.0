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

app.use('/loggedIn', require("./routers/loggedInRouter"));

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
  "https://sports.yahoo.com/site/api/resource/sports.graphite.leagueOdds;count=50;dataType=graphite;dates=current%2Ccurrent%2B1%2Ccurrent%2B2%2Ccurrent%2B3%2Ccurrent%2B4%2Ccurrent%2B5%2Ccurrent%2B6;endpoint=graphite;league=nba?bkt=%5B%22xray-us-sports-betting-2%22%2C%22Fanatics_vs_BreakingT_desktop_test%22%5D&device=desktop&intl=us&lang=en-US&prid=em3gfrph0lm1l&region=US&site=sports&tz=America%2FPhoenix&ver=1.0.8775&returnMeta=true"
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