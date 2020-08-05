const express = require('express');
const morgan = require('morgan');
// const routes = require('./routes/posts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const main = require('./views/main');
const { db } = require('./models');
const models = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  try {
    res.send(main(''));
  }
  catch(err) {
    next(err);
  }
});

db.authenticate().
then(() => {
  console.log('connected to the database');
});

const init = async() => {
  await models.db.sync({force: true});

  const PORT = 3000;

  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
  });
}

init();
