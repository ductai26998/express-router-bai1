var express = require('express');
var router = express.Router();
const shortid = require('shortid');

var db = require('../db');

// our default array of dreams
db.defaults({books: [],
            users: []})
  .write();

// https://expressjs.com/en/starter/basic-routing.html
router.get("/", (request, response) => {
  response.render('books/index', {
    books: db.get('books').value()
  });
});

router.get('/search', (request, response) => {
  var q = request.query.q;
  var matchedBooks = db.get('books').value().filter(function(book) {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  response.render('books/index', {
    books: matchedBooks
  });
});

router.get('/create', (request, response) => {
  response.render('books/create');
});

router.post('/create', (request, response) => {
  request.body.id = shortid.generate();
  db.get('books').push(request.body).write();
  response.redirect('/');
});

router.get("/:id/delete", (request, response) => {
  // var id = request.params.id;
  db.get('books').remove(request.params).write();
  response.redirect('/');
});

router.get('/:id/update', (request, response) => {
  response.render('books/update', {id: request.params.id});
});

router.post('/:id/update', (request, response) => {
  var id = request.params.id;
  db.get('books')
    .find({id: id})
    .assign({title: request.body.title})
    .write();
  response.redirect('/');
});


module.exports = router;
