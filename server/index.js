const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();

const { connectDB } = require('./db');
const routes = require('./routes');

const assetFolder = path.join(__dirname, '..', 'build');

const PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(assetFolder));

app.get('/', (req, res) => {
  res.sendFile(assetFolder + '/index.html');
});

app.use('/api', routes);

connectDB((err) => {
  if (err) {
    return console.log('MongoDB Error:', err);
  }

  console.log('MongoDB Connected Successfully');


  app.listen(PORT, () => console.log('Listening on port 3001'));
});
