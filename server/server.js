const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const port = 8000;

dotenv.config();

const corsOptions = {
    origin: ["http://localhost:3000"],
    //allowedHeaders: ['Content-Type', 'Authorization'], // Allow Authorization header
    credentials: true
};

// SETTING UP EXPRESS SERVER
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//SET UP MIDDLEWARE
const authRouter = require('./routes/auth-route')
app.use('/auth', authRouter)

// SETUP ROUTERS AS MIDDLEWARE
const mapsRouter = require('./routes/maps-router')
app.use('/api', mapsRouter)

// SETTING UP MONGODB CONNECTIONS: 
const dbName = "maptropolis_db";
const uri = `mongodb+srv://jouyang02:CSE416cluster@cluster2.um8f5rs.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(
    console, "MongoDB Connection Error"));
db.on('connected', function() {
    console.log(`Connection Success: Connected to ${dbName} Database`);
});

app.listen(port, () => {
    console.log(`App is listening at port: ${port}`);
})

process.on('SIGINT', function() {
    if (db) {
        db.close()
            .then(console.log("\n SERVER CLOSED. DATABASE INSTANCE DISCONNECTED."))
            .catch((err) => console.log(err));
    }
    process.exit();
});