const express = require("express");
const path = require('path');
require("dotenv").config();
const { FE_ENDPOINT } = process.env
const PORT = process.env.port || 3000;
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({origin: ['https://localhost:5173',FE_ENDPOINT],
    credentials: true 
    // cors gives permission for front end to access the backend
}));

app.get('/',(req,res) => {
    res.status(200).send("ok")
})

let apiRouter = require('./src/routes/index');
app.use('/',apiRouter);


app.listen(PORT, () => {
    console.log(`server is running on https://localhost:${PORT}`)
})