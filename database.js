const { MongoClient } = require('mongodb')
var ObjectId = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://localhost:27017';


// Use connect method to connect to the server

const connectdb = (dbName) => {
    return MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true }).then(client => client.db(dbName))
}
// const temp = () => {connectdb('testdb').then(db=>db.repairDatabase())}
// temp()

// function getAllBlogs () {
//     return connectdb().then(db => {
//         return db.collection('blogs').find()
//     }).then(blogsCursor => blogsCursor.toArray())
// }

const getAllBlogs = () => 
connectdb('testdb')
.then(db => db.collection('blogs').find())
.then(b => b.toArray())

// delete all blogs
const removeAllBlogs = () => 
connectdb('testdb')
.then(db => db.collection('blogs').deleteMany({}))

// delete a blog
const deleteBlog = blogId => 
connectdb('testdb')
.then(db => db.collection('blogs').deleteOne({_id : ObjectId(blogId)}))
.catch(err => console.log(err))

const insertBlog = blog =>
connectdb('testdb')
.then(db => db.collection('blogs'))
.then(collection => collection.insertOne(blog))

const user = {
    username: 'admin',
    password: 'password'
}

const insertuser = (user) =>
 connectdb('userdb')
 .then(db => db.collection('usercollection'))
 .then(collection => collection.insertOne(user))


// get data from usercollection
const getAllUsers = () =>
  connectdb('userdb')
  .then(db => db.collection('usercollection'))
  .then(collection => collection.find())
  .then(cursor => cursor.toArray())
//   .then(array => array.forEach(user => console.log(user)))

//   getAllUsers()
  
//   insertuser(user)

//   readuser()
// removeAllBlogs()

module.exports = {
    getAllBlogs,
    insertBlog,
    getAllUsers,
    deleteBlog,
    removeAllBlogs
}