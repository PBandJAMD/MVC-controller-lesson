const express = require('express'),
  router = express.Router(),
  monsters = require('../models/monster');
// above is how we handle routing, and have the methods from the Model available to us

// After a user goes to localhost:8000/monsters/ , that default URL response gets handled here
router.get('/', (req, res) => {
  // The model requests data and converts it into a list of Monster names
  const monsterNames = monsters.getMonsterNames();
  // Render monsters.html and template it using the list we get back
  res.render('monsters', { monsterNames: monsterNames });
});

// After a user goes to a url such as localhost:8000/monsters/dragon , the string 'dragon' at the end of the URL will be used to grab data from our 'database' and render a page with the info
router.get('/:name', (req, res) => {
  // The model is used to search the database and return with the appropriate information
  const monsterInfo = monsters.getMonsterInfo(req.params.name);
  console.log('monsterInfo:');
  console.log(monsterInfo);
  // If the monster lives in the database...
  if (monsterInfo) {
    // ...render monster.html (singular) with it's info
    res.render('monster', monsterInfo);
  } else {
    // ...otherwise, tell the terminal that nothing was found
    console.log('no info found for monster ' + req.params.name);
  }
});

// export so that it's available on app.js
module.exports = router;
