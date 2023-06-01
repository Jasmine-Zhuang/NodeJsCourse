//CRUD: create read update delete
const{ MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.')
    } 
    const db = client.db(databaseName)
    const updatePromise = db.collection('users').update({
        _id: new ObjectId('6478ad88242c5400593e62b8')
    }, {
        $inc: {
            age: 1
        }
    })
    updatePromise.then((result)=>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})