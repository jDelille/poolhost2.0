const router = require("express").Router();
const Picks = require("../models/userPicksModel");
const auth = require("../middleware/auth");


// GET PICKS
router.get("/", auth, async (req, res) => {
  try {
    const picks = await Picks.find({ user: req.user });
    res.json(picks);
  } catch (err) {
    res.status(500).send();
  }
});

// POST PICKS

router.post("/", auth, async (req, res) => {
  try {
    const {picks, email, username} = req.body;
    // validation
    if (!picks) {
      return res.status(400).json({
        errorMessage: "You need to add some picks.",
      });
    }

    const newPicks = new Picks({
      picks,
      user: req.user,
      email: email,
      username: username
    });

    const savedPicks = await newPicks.save();

    res.json(savedPicks);
  } catch (err) {
    res.status(500).send("error adding picks.");
  }
});

// EDIT PICKS 

router.put("/:id", auth, async (req, res) => {
  try {
    const { picks } =
      req.body;
    const picksId = req.params.id;

    // validation

    if (!picks) {
      return res.status(400).json({
        errorMessage: "You need to add picks",
      });
    }

    if (!picksId)
      return res.status(400).json({
        errorMessage:
          "Picks ID not given. Please contact the developer. Thank you.",
      });

    const originalPicks = await Trip.findById(tripId);
    if (!originalPicks)
      return res
        .status(400)
        .json({ errorMessage: "No snippet with this ID was found :( " });

    if (originalPicks.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    originalPicks.picks = picks;
   

    const savedPicks = await originalPicks.save();

    res.json(savedPicks);
  } catch (err) {
    res.status(500).send();
  }
});

// DELETE PICKS

router.delete("/:id", auth, async (req, res) => {
  try {
    const picksId = req.params.id;

    // validation

    if (!picksId)
      return res.status(400).json({
        errorMessage:
          "Pick ID not given. Please contact the developer. Thank you.",
      });

    const existingPicks = await Picks.findById(picksId);
    if (!existingPicks)
      return res
        .status(400)
        .json({ errorMessage: "No picks with this ID was found :( " });

    if (existingPicks.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    await existingPicks.delete();

    res.json(existingPicks);
  } catch (err) {
    res.status(500).send();
  }
});

// GET ALL PICKS IN COLLECTION

router.get("/", async (req, res) => {
  try {
    const picks = await Picks.get();

    res.json(picks);
  } catch (err) {
    res.status(500).send();
  }
});

// DELETE ALL PICKS IN COLLECTION

router.delete("/", auth, async (req, res) => {
  try {

    // validation

  

    const existingPicks = await Picks.remove()
    if (!existingPicks)
      return res
        .status(400)
        .json({ errorMessage: "No picks with this ID was found :( " });

    if (existingPicks.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    await existingPicks.delete();

    res.json(existingPicks);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
