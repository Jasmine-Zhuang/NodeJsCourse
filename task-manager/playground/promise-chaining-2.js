require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('6478dfc8453d0519417db5d3').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result) => {
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}
deleteTaskAndCount('647a2e4d44dee3dbdb9162bf').then((count) => {
    console.log(count)
}).catch((e)=>{
    console.log(e)
})