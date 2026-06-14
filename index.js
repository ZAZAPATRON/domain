const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// MongoDB bağlantısı
mongoose.connect("mongodb://localhost:27017/oyunDB");

// Session
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth
passport.use(new GoogleStrategy({
    clientID: "GOOGLE_CLIENT_ID",
    clientSecret: "GOOGLE_CLIENT_SECRET",
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Kullanıcı veritabanına kaydedilir
    return done(null, profile);
}));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => { res.redirect("/oyun"); });

app.get("/", (req, res) => res.send("Ana Sayfa - Kale Kurma Oyunu"));
app.get("/oyun", (req, res) => res.send("Kale kurma ekranı"));

app.listen(3000, () => console.log("Server çalışıyor: http://localhost:3000"));
