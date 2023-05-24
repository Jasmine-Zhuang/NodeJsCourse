// const square = function(x){
//     return x*x
// }
// const square = (x) => {
//     return x*x
// }
// const square = (x) => x*x
// console.log(square(4))

//Arrow function: No own this keyword binding
//If inner function, this, is the this from parent function
const event = {
    name: 'party',
    guestList: ['Jen','Mike', 'Andrew'],
    printGuestList() {
        console.log('Guest list for ' + this.name)
        this.guestList.forEach((guest)=>{
            console.log(guest + ' is attending '+this.name)
        })
    }
}
event.printGuestList()