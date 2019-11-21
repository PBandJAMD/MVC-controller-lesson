# MVC! Controller!

![Imgur](https://media.giphy.com/media/6IKKaXzULZJFm/giphy.gif)

### Completion:
The entire project (Make the Giant Squid at the bottom of this page proud!)

#### What is MVC?

MVC is the structured format for a fullstack application. MVC stands for:

- Models: Dedicated to interacting with the database
- Views: Dedicated to managing views for the user to interact with
- Controllers: Dedicated to communicating between the user, server, and database

![Imgur](http://www.techgeekbuzz.com/wp-content/uploads/2019/06/MVC-Architecture.png)

![Imgur](https://medium.com/@noufel.gouirhate/create-your-own-mvc-framework-in-php-af7bd1f0ca19)

## Part 1: Setting up Express & Mustache

So I handed you a few files (in the form of text on this readme.md), just be sure to double check that you're copying the text correctly and **possibly eliminating some white space that it creates.**

1. Create homework directory: `mkdir monster-media`
2. `cd monster-media`
3. `touch app.js`
3. `npm init -y` (the -y sets the default settings)
4. `npm install express --save` (The `--save` option adds the module as a dependency in your package.json file. This allows anyone looking at your app (i.e. a dev team member) to be able to see what your app is "made of" and if they clone your app and run `npm i` all dependencies will be installed.)
5. `npm install mustache-express --save`



Take a look at the package.json file. Express and Mustache should be included as a dependencies:

```json
  "dependencies": {
    "express": "^4.17.1",
    "mustache-express": "^1.3.0"
  }
```

Let's start coding in `app.js`:

```javascript
// app.js

const express = require('express'),
      app = express(),
      mustacheExpress = require('mustache-express'),
      port = process.env.PORT || 8000;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   res.render("index");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
```

## Part 2: Setting up View

Now you're ready to create a basic view to test that the server can respond to a user request! Let's also make some folders to get ready for MVC!

```bash
mkdir models controllers views
```

```bash
touch views/index.html
```

we should also add to our index page, so we know that our server is running

#### ./views/index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Monster Mash</title>
</head>
<body>
  <h1>Server Online</h1>
  <!-- won't lead anywhere until the homework is complete -->
  <a href="/monsters">Show me a list of monsters!!</a>
</body>
</html>
```

Let's test out our app:
```bash
node app.js
```

Navigate to `http://localhost:8000` in the browser, and you should see something in the browser!

## Part 3: Setting up Model

This time around, we won't be learning about the Model, because we will attach a database to our apps in the future. So for now, just enter the following command in your terminal

```bash
touch models/monster.js
```

or otherwise create a file called `monster.js` within the models folder. Note that the name `monster` is singular, this is a common naming convention for MVC. Models get singular names, while controllers get plural names.

In monster.js, please enter the following script

####./models/monster.js

```javascript
const monsterData = require("../data/monsterData");

const getMonsterNames = () => {
    return monsterData.monsters.map((monster) => monster.name);
};

const getMonsterInfo = (name) => {
    return monsterData
        .monsters
        .filter((monster) => {
          return monster.name === name;
        })[0];
}

module.exports = {
    getMonsterNames: getMonsterNames,
    getMonsterInfo: getMonsterInfo
};
```

You can spend time reading the code on your own, figuring out how data flows through our app (user request > app.js > Controllers > Models > Controllers > Views > user). This file is basically connecting to our "database" and either populating a list of monster names, or individual monster info, depending on what the Controllers decide. Let's set up some local data for this file to connect to

```bash
mkdir data
```

```bash
touch data/monsterData.js
```

And now add the following code to this file:

#### ./data/monsterData.js

```javascript
const monsterData = {

    owners: [{
        name: "Tims",
        monsters: [
            "giantSquid", "rageful porpoise", "large mushroom"
        ]
    }, {
        name: "Jared",
        monsters: [
            "giantSquid", "mollusk", "sphinx"
        ]
    }, {
        name: "Trevor",
        monsters: [
            "giantSquid", "dragon", "orange snake"
        ]
    }, {
        name: "Matt",
        monsters: [
            "giantSquid", "rageful porpoise", "swamp demon"
        ]
    }],

    monsters: [{
        name: "giantSquid",
        powers: ["radioactivity", "aqueous"]
    }, {
        name: "rageful porpoise",
        powers: ["aqueous", "vicious bite"]
    }, {
        name: "swamp demon",
        powers: ["aqueous", "blood thirst"]
    }, {
        name: "dragon",
        powers: ["fire breathing", "flight", "vicious bite"]
    }, {
        name: "sphinx",
        powers: ["hardening into a statue", "flight"]
    }]

};

module.exports = monsterData;
```

NOTE: COPYING THE FOLLOWING CODE MAY CAUSE ERRORS DUE TO WHITESPACE. Be sure after copying and pasting this code into your text editor, to delete empty lines and replace them by hitting enter, in the case that you run the server and you're getting an error that looks something like

```bash
/Users/briancarela/code/testing/aroundtheworld/models/monster.js:2
​
^

SyntaxError: Invalid or unexpected token
```


## Part 4: Setting up Controllers - Core Lesson

So before setting up the controller, we should set up a Route. This means adding some code to app.js that will redirect users if they go to an extension. In this case the extention will be "/monsters"

#### app.js

```javascript
const monsters = require('./controllers/monsters');
app.use('/monsters', monsters);
```

Place these 2 lines above the line that begins with `app.get('/', ...` This way, if users to go `localhost:8000/monsters` the Controllers will handle that request instead of sending people back to our index.html

Time to add our Controllers!

```bash
touch controllers/monsters.js
```

Again, `monsters.js` is plural because it's a controller file, not a model file. Place the following code on the file, and please read the comments

#### ./controllers/monsters.js

```javascript
const express = require("express"),
    router = express.Router(),
    monsters = require("../models/monster");
// above is how we handle routing, and have the methods from the Model available to us

// After a user goes to localhost:8000/monsters/ , that default URL response gets handled here
router.get("/", (req, res) => {
    // The model requests data and converts it into a list of Monster names
    const monsterNames = monsters.getMonsterNames();
    // Render monsters.html and template it using the list we get back
    res.render("monsters", { monsterNames: monsterNames })
});

// After a user goes to a url such as localhost:8000/monsters/dragon , the string 'dragon' at the end of the URL will be used to grab data from our 'database' and render a page with the info
router.get("/:name", (req, res) => {
    // The model is used to search the database and return with the appropriate information
    const monsterInfo = monsters
        .getMonsterInfo(req.params.name);
    console.log('monsterInfo:');
    console.log(monsterInfo);
    // If the monster lives in the database...
    if (monsterInfo) {
        // ...render monster.html (singular) with it's info
        res.render("monster", monsterInfo);
    } else {
        // ...otherwise, tell the terminal that nothing was found
        console.log("no info found for monster " + req.params.name);
    }
});

// export so that it's available on app.js
module.exports = router;
```

## Part 5: Setting up the final Views

Time to go back to the terminal and create new files

```bash
touch views/monsters.html views/monster.html
```

NOTE: MONSTERS (plural) IS THE LIST OF MONSTERS. MONSTER (singular) IS INFORMATION ABOUT ONE MONSTER ONLY

Place the following code on the appropriate files

#### ./views/monster.html

```html
<!doctype html>
<html lang="en">

<head>
    <title>{{name}}</title>
</head>

<body>
    <h1>{{name}}</h1>
    <div class="container">
      <h2>Powers:</h2>
        {{#powers}}
        <p>{{.}}</p>
        {{/powers}}
    </div>
</body>
</html>
```

#### ./views/monsters.html

```html
<!doctype html>
<html lang="en">

<head>
    <title>The Monsters</title>
</head>

<body>
    <h1>Here are the Monsters</h1>
    <div class="container">
        {{#monsterNames}}
        <p>
          <a href="/monsters/{{.}}">{{.}}</a>
        </p>
        {{/monsterNames}}
    </div>
</body>
</html>
```

## Part 6: Testing

It's finally time to test our app!

```bash
node app.js
```

Navigate to localhost:8000 in your browser and click on the links to make sure it all works!

CONGRATULATIONS!! You just made a Fullstack application while learning how controllers work! If you have errors, make sure to look at the correct file, and see which line the error begins with. Remember to go back and read these instructions very carefully in case you missed something. 

![Imgur](http://giphygifs.s3.amazonaws.com/media/2LtirSCxAC0ve/giphy.gif)

Be sure to check under your bed for monsters, and sleep tight!!
