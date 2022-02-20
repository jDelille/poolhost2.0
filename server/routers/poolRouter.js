const router = require("express").Router();
const Picks = require("../models/userPicksModel");
const auth = require("../middleware/auth");

// GET ALL PICKS
router.get("/", auth, async (req, res) => {
 try {
   const picks = await Picks.find();
   res.json(picks);
 } catch (err) {
   res.status(500).send();
 }
});

module.exports = router;
