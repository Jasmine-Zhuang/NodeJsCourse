const fs = require('fs')
// const book = {//object
//     title:'Ego is the Enemy',
//     author:'Ryan Holiday'
// }
// //convert object to string
// const bookJSON = JSON.stringify(book)
// // console.log(bookJSON)
// //convert string to object
// const parsedData = JSON.parse(bookJSON)
// // console.log(parsedData.author)

// //fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()//string
// const data = JSON.parse(dataJSON)//object
// console.log(data.title)

//challenge: read, override data, write file
const buffer = fs.readFileSync('1-json.json')
const data = JSON.parse(buffer.toString())
data.name = 'Jas'
data.age = 22
const newString = JSON.stringify(data)
fs.writeFileSync('1-json.json',newString)