const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordConfirm, username, favoriteTeam } =
      req.body;

    // validation

    if (!email || !password || !passwordConfirm || !username)
      return res.status(400).json({
        errorMessage: "Please enter all required fields.",
      });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters",
      });

    if (password !== passwordConfirm)
      return res.status(400).json({
        errorMessage: "Passwords do not match",
      });

    // no duplicate emails

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash passwords

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save the user in the database

    const newUser = new User({
      email,
      passwordHash,
      username,
      favoriteTeam,
    });

    const savedUser = await newUser.save();

    // create a JWT token

    const token = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite:
          process.env.NODE_ENV === "development"
            ? "lax"
            : process.env.NODE_ENV === "production" && "none",
        secure:
          process.env.NODE_ENV === "development"
            ? "false"
            : process.env.NODE_ENV === "production" && "true",
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation

    if (!email || !password)
      return res.status(400).json({
        errorMessage: "Please enter all required fields.",
      });

    // get user account

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(400).json({
        errorMessage: "Wrong email or password.",
      });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!correctPassword)
      return res.status(401).json({
        errorMessage: "Wrong email or password",
      });

    // create a JWT token

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite:
          process.env.NODE_ENV === "development"
            ? "lax"
            : process.env.NODE_ENV === "production" && "none",
        secure:
          process.env.NODE_ENV === "development"
            ? "false"
            : process.env.NODE_ENV === "production" && "true",
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(null);

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);

    res.json(validatedUser.id);
  } catch (err) {
    return res.json(null);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.params.id;

    // validation

    // if (!description && !code) {
    //   return res
    //     .status(400)
    //     .json({
    //       errorMessage: "You need to enter a description or some code.",
    //     });
    // }

    if (!userId)
      return res.status(400).json({
        errorMessage:
          "User ID not given. Please contact the developer. Thank you.",
      });

    const originalUser = await User.findById(userId);
    if (!originalUser)
      return res
        .status(400)
        .json({ errorMessage: "No User with this ID was found :( " });

    if (originalUser.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    originalUser.username = username;
    // originalUser.description = description;
    // originalUser.code = code;
    // originalUser.category = category;

    const savedUser = await originalUser.save();

    res.json(savedUser);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        sameSite:
          process.env.NODE_ENV === "development"
            ? "lax"
            : process.env.NODE_ENV === "production" && "none",
        secure:
          process.env.NODE_ENV === "development"
            ? "false"
            : process.env.NODE_ENV === "production" && "true",
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    return res.json(null);
  }
});

module.exports = router;
