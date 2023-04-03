const express= require('express');
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
const route = require('./app/routes/route');
require('./app/helper/connection');
const dotenv = require('dotenv');
dotenv.config();

app.use('/',route)

const port = 5000
app.listen(port, () => console.log(` app listening on http://localhost:${port}`));
