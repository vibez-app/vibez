/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const express = require("express");
const cors = require("cors");
// const db = require('./db');


const  app = express();
const port = 3000;




app.use(cors());


app.use(express.static(path.resolve(__dirname, '../dist')));
// parsing request body
app.use(express.json());



// test firebase
// app.get('/testFirebase', async (req, res) =>{
//   const userAdded = await db.collection('users').add({
//     name: 'test3',
//     biography: 'test 3 bio',
//     instagramLink: 'test3sLink',
//     phoneNumber: 123456789
//   })
//   return res.send(200).json(userAdded);
// })



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




module.exports = app.listen(port,  () => console.log("Example app listening on port 3000!"));