const express = require('express');
const axios = require('axios');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")

dotenv.config();

// set up express server
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://poolhost.netlify.app"],
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
  "https://api.nflpickwatch.com/v1/general/games/2021/129/nba"
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

 //https://fcast.espncdn.com/FastcastService/pubsub/profiles/12000/topic/event-basketball-nba/message/2309331/checkpoint


 app.get("/schedule", async (req, res) => {
  const response = await axios.get(
    "https://datacrunch.9c9media.ca/statsapi/sports/basketball/leagues/nba/scoreboard?brand=tsn"
  );
 
  const news = response.data;
  res.status(200).send(news);
 });


app.listen(PORT, () => console.log(`Hello Master Bweem, the server is running on ${PORT}.`))