/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const express = require("express");
const cors = require("cors");
require('dotenv').config()

const spotifyController = require('./controllers/spotifyController')

const app = express();
const port = 3000;

app.get('/login', spotifyController.getApprove);

app.get('/spotify', spotifyController.checkApprove, spotifyController.getToken, (req, res) => { 
  
})


app.use(cors());


app.use(express.static(path.resolve(__dirname, '../dist')));
// parsing request body
app.use(express.json());





// catch-all route handler for any requests to an unknown route
app.use((req,res)=> res.sendStatus(404));

//  express global error handler

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErrObj = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }, 
  };
  
  const errorObj = Object.assign(defaultErrObj, {message: {err}})
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
})




module.exports = app.listen(port,  () => console.log("Vibez listening on port 3000!"));