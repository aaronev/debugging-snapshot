const DbContacts = require('../../db/contacts')
const router = require('express').Router()

router.get('/new', (request, response) => {
  response.render('new')
})

router.post('/new', (request, response, next) => {
  DbContacts.createContact(request.body)
  .then(contact => { response.redirect(`/contacts/${contact.id}`) })
  .catch(next)
})

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  DbContacts.getContact(contactId)
  .then(contact => { response.render('show', { contact }) })
  .catch(next)
})

router.get('/:contactId/delete', (request, response, next) => {
  const contactId = request.params.contactId
  DbContacts.deleteContact(contactId)
  .then(contact => { response.redirect('/') })
  .catch(next)
})

router.post('/search', (request, response, next) => {
  const query = request.body.query
  DbContacts.searchForContact(query)
  .then(contacts => { response.render('index', { query, contacts }) })
  .catch(next)
})

module.exports = router