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
    db.collection('tasks').findOne({_id: new ObjectId('6477ae18eddeeb39fbe11325')}, (error, task) => {
        console.log(task)
    })
    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        console.log(tasks)
    })


    // db.collection('users').findOne({_id: new ObjectId("6477afbed0eb8051853f83b8")}, (error, user) => {//get the first one if there's duplicate
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    //return a cursor 
    // db.collection('users').find({age: 21}).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({age: 21}).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('users').insertOne({
    //     _id : id ,name: "Mia", age: 21
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user.')
    //     }
    //     console.log(result.insertedId)
    // })
    // db.collection('users').insertMany([
    //     {name: 'Jen', age:28}, {name: 'Ben', age: 19}], (error, result) => {
    //         if(error){
    //             return console.log('Unable to insert documents')
    //         }
    //         console.log(result)
    //     })
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },
    //     {
    //         description: 'Pot plants',
    //         completed: false
    //     },
    //     {
    //         description: 'Renew inspection',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert tasks')
    //     }
    //     console.log(result)
    // })

})