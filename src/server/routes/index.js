const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');

router.get('/', (request, response, next) => {
  DbContacts.getContacts()
  .then((contacts) => { response.render('index', { contacts }) }).catch(next)
})

router.use('/contacts', contacts); // /contacts/search

module.exports = router;