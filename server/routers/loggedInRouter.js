const router = require("express").Router();
const Users = require("../models/userModel");
const auth = require("../middleware/auth");

// GET ALL PICKS
router.get("/:id", auth, async (req, res) => {
 try {
  const userId = req.params.id;
   const user = await Users.findById(userId);
   res.json(user);
 } catch (err) {
   res.status(500).send();
 }
});

module.exports = router;