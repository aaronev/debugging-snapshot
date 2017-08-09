const db = require('./db')

const createContact = (contact) =>
  db.query(`
    INSERT INTO
      contacts (first_name, last_name)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      contact.first_name,
      contact.last_name,
    ])
    .then(contact => contact[0])
    .catch(error => { throw error });

const getContacts = () => 
  db.query(`
    SELECT
      *
    FROM
      contacts
    `, [])
    .catch(error => { throw error })

const getContact = (contactId) =>
  db.one(`
    SELECT 
      * 
    FROM 
      contacts 
    WHERE 
      id=$1::int 
    LIMIT 1
    `,
    [contactId])
  .catch(error => { throw error });


const deleteContact = (contactId) =>
  db.query(`
    DELETE FROM
      contacts
    WHERE
      id=$1::int
    `, contactId)
    .catch(error => { throw error });

const searchForContact = function(searchQuery){
  return db.query(`
    SELECT
      *
    FROM
      contacts
    WHERE
      lower(last_name || ' ' || first_name) LIKE $1::text
    `,
    [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`])
    .catch(error => { throw error });
}

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchForContact
}