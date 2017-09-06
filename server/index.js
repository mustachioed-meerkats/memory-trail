'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.port || 3000;

if (!module.parent) { 
  app.listen(PORT, () => {
    console.log('Example app listening on port 3000!');
  });
}