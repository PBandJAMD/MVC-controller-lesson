const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

const monsters = require('./controllers/monsters');

const port = process.env.PORT || 8000;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use('/monsters', monsters);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
