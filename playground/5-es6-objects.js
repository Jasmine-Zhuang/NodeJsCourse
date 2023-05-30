//Object property shorthand
const name = 'Jas'
const userAge = 21
const user = {
    // name: name,
    name,
    age:userAge,
    location:'Toronto'
}
console.log(user)

//Object destructuring
const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice:undefined
}

// const label = product.label
// const stock = product.stock

//rename label to productLabel
//set default rating =5, only =5 if no rating in product
// const {label:productLabel, stock, rating = 5} = product
// console.log(productLabel, stock, rating)

//destructure in input parameter
const transaction = (type, {label, stock} = {}) =>{
    console.log(type,label,stock)
}
transaction('order', product)