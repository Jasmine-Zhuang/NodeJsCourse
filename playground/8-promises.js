const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        // resolve('success_data')
        reject('Things went wrong')
    }, 2000)
})
doWorkPromise.then((result) => {
    console.log('Success',result)
}).catch((error) => {
    console.log("Error",error)
})
//                         fullfilled
//                       / 
//Promise -- pending -->
//                       \
//                          rejected
