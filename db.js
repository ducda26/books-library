const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')

var db = low(adapter)
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write();

db.defaults({ books: []})
  .write();

module.exports = db;