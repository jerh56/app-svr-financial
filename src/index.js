const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI } = process.env;

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


mongoose.connect(MONGODB_URI || process.env.MONGODB_URI,{ });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Routes
app.use(require('./routes/index'));

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
