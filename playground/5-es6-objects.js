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
const {label:productLabel, stock} = product
console.log(productLabel, stock)