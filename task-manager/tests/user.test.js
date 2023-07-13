const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const user1 = {
    name: 'Mike',
    email: 'mike@test.com',
    password: '555what'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(user1).save()
})

test('Should signup a new user', async () => {
    await request(app).post("/users").send({
        name: "Blue",
        email: "blue@test.com",
        password: "Computer001",
      }).expect(201)
})

test("Should login existing user", async () => {
  await request(app).post("/users/login").send({
      email: user1.email,
      password: user1.password
    }).expect(200)
})

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: 'nonexistuser@email.com',
      password: user1.password,
    }).expect(400)
})