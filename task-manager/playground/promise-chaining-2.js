require('../src/db/mongoose')
const Task = require('../src/models/task')


Task.findByIdAndRemove('6478dfc8453d0519417db5d3').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((result) => {
    console.log(result)
}).catch((e)=>{
    console.log(e)
})