const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const app = express();

// Set up view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/students', (req, res) => {
    res.render("students");
});

app.get('/teachers', (req, res) => {
    res.render("teachers");
});

// Connect to MongoDB
async function main(){
    const uri = "mongodb+srv://bfox40:Collegesucks2020!!!@majormelons.0qr9i.mongodb.net/?retryWrites=true&w=majority&appName=MajorMelons";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// Passport configuration
passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

// Login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



