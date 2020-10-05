const express = require("express");
const app = express();
const apiRouter = require('./mysql/api-server')
const cors = require('cors')
const path = require("path");
const port = process.env.PORT || 5400;
const cookie_parser = require("cookie-parser");
// app.use(express.static(path.join(__dirname, "Public")));
app.set('view engine', 'ejs');
app.use(cookie_parser());
// app.use(cors())

app.use(express.static(path.join(__dirname, 'client','build')));

app.use("/api", apiRouter);
// app.use('/forms',formRoute);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});





app.listen(port, () => {
    console.log(`listining on port ${port}`);
});