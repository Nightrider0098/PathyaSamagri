const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const apiRouter = require('./mysql/api-server')
const cors = require('cors')
const path = require("path");
const port = process.env.PORT || 5400;
const cookie_parser = require("cookie-parser");
const session = require("express-session")
const redis = require('redis')


let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "Public")));


app.use(cookie_parser());
app.use(cors())

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: "cats", resave: true, saveUninitialized: true
}));


// app.use(express.static(path.join(__dirname, 'client','build')));

app.use("/api", apiRouter);
// app.use('/forms',formRoute);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});





app.listen(port, () => {
    console.log(`listining on port ${port}`);
});