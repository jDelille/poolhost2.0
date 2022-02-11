const router = require("express").Router();
const UserPicks = require("../models/userPicksModel");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const picks = await UserPicks.find({ user: req.user });
    res.json(picks);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { picks } = req.body;
    // validation
    if (!picks) {
      return res.status(400).json({
        errorMessage: "You need to add some picks.",
      });
    }

    const newPicks = new UserPicks({
      picks,
      user: req.user,
    });

    const savedPicks = await newPicks.save();

    res.json(savedPicks);
  } catch (err) {
    res.status(500).send("error adding picks.");
  }
});

module.exports = router;
