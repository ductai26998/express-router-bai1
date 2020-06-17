// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var db = require('./db');
var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/books', bookRoute);
app.use('/users', userRoute);

app.get("/", (request, response) => {
  response.render('books/index', {
    books: db.get('books').value()
  });
});

// listen for requests :)
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
