const express = require('express')
const bodyParser = require('body-parser')
const dbContacts = require('./db/contacts')
const app = express()
const routes = require('./server/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use('/', routes)

app.use((error, request, response, next) => {
 response.status(500).send(`
  ERROR: ${error.message}\n\n${error.stack}
  `)
})

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})