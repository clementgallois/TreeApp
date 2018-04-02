// server.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

const server = require('http').createServer(app);
const parseArgs = require('minimist');


const config = require('./config.js');
const mongoUrl = `mongodb://${config.db.address}:${config.db.port}/${config.db.name}`;
const args = parseArgs(process.argv.slice(2));
let importFile;
if (args.import){
  if (typeof args.import !== 'string'){
  // eslint-disable-next-line no-console
    console.log('Error: import file not found');
    return;
  }
  importFile = args.import;
}
mongoose.connect(mongoUrl); // connect to our database

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error'));
// eslint-disable-next-line no-console
db.once('open', () => { console.log('Connection succeeded.');});

if (importFile){
  const Tree = require('./app/models/tree.js');
  const csv=require('csvtojson');
  let treesToInsert = [];
  try{
    csv()
      .fromFile(importFile)
      .on('json',(jsonObj)=>{
        jsonObj.location = {type:'Point', coordinates:[jsonObj.longitude, jsonObj.latitude]};
        delete jsonObj.longitude;
        delete jsonObj.latitude;
        treesToInsert.push(jsonObj);
      })
      .on('done',(error) => {
        if (error){
          throw error;
        }
        Tree.insertMany(treesToInsert);
        // eslint-disable-next-line no-console
        console.log(`Successfully imported ${importFile}`);
      });
  }
  catch(err){
    // eslint-disable-next-line no-console
    console.log(err);
    return;
  }
}

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

//console.log(process.argv.slice(2)) see minimist lib

// routes
require('./app/routes.js')(app); // api routes

// launch
server.listen(config.app.port, config.app.address);
// eslint-disable-next-line no-console
console.log(`Listening on ${config.app.address}:${config.app.port}`);
