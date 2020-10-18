const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use();
const mongoose = require('mongoose');

const passport = require("passport");
app.use(passport.initialize());

mongoose.connect('mongodb://vaibhav:vaibhav123@ds149056.mlab.com:49056/ryda', (err, db) => {
   
    if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  
  

});

app.use(cors())

console.log('Connected to MongoDB server');
  app.listen(3006, () => {
    console.log('Server running on port 3006!')
  });
  
module.exports = app ;

 const routes = require('./config/routes');

 const ROUTE_PREFIX = '/api/v1';
 app.use(ROUTE_PREFIX, routes);

 // initialize passport service
 const api = require('./api')
 api.services.PassportService.initializePassport()



