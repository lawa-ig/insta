const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => res.sendStatus(200));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

//routes here