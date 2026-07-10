const express = require("express");
const passport = require("passport");

const {
  googleLogin,
  googleCallback,
} = require("../controllers/auth.controller");

const router = express.Router();

// Step 1: Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// Step 2: Google redirects back here
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallback,
);

module.exports = router;
