// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         // resolve('success_data')
//         reject('Things went wrong')
//     }, 2000)
// })
// doWorkPromise.then((result) => {
//     console.log('Success',result)
// }).catch((error) => {
//     console.log("Error",error)
// })
// //                         fullfilled
// //                       / 
// //Promise -- pending -->
// //                       \
// //                          rejected



const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}
// //Can be improved using promises chaining
// add(1,2).then((sum)=>{
//     console.log(sum)
//     add(sum, 3).then((sum2)=>{
//         console.log(sum2)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }).catch((e)=>{
//     console.log(e)
// })

//promise chaining
add(1,1).then((sum)=>{
    console.log(sum)
    return add(sum, 4)
}).then((sum2)=>{
    console.log(sum2)
}).catch((e)=>{
    console.log(e)
})