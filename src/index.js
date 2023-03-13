require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const trackRoutes = require("./routes/track")
const requireAuth = require("./middlewares/requireAuth")

const app = express();

const mongoURI = "mongodb+srv://kelzvictoria:rM2YFoYtD3qXe5m8@cluster0.bozfbqk.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(mongoURI);
mongoose.connection.on('connected', () => console.log('Mongo DB connected.'))
mongoose.connection.on('error', (err) => console.error('Error connecting to Mongo DB', err))

app.get("/", requireAuth, (req,res) => {
    res.send(`Your email is ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('Listening on 3000');
})