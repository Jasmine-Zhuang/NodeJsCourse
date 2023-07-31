const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

const user1Id = new mongoose.Types.ObjectId();
const user1 = {
  _id: user1Id,
  name: "Mike",
  email: "mike@test.com",
  password: "555what",
  tokens: [
    {
      token: jwt.sign({ _id: user1Id }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(user1).save();
});

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Blue",
      email: "blue@test.com",
      password: "Computer001",
    })
    .expect(201);
  // assert that db was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  // assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Blue",
      email: "blue@test.com",
    },
    token: user.tokens[0].token,
  });
  // assert user password should not saved in db
  expect(user.password).not.toBe("Computer001");
});

test("Should login existing user", async () => {
  const res = await request(app)
    .post("/users/login")
    .send({
      email: user1.email,
      password: user1.password,
    })
    .expect(200);
  const user = User.findById(user1Id);
  expect(res.body.token).toBe(user1.tokens[0].token);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "nonexistuser@email.com",
      password: user1.password,
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(user1Id);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/cat.jpeg")
    .expect(200);
  const user = await User.findById(user1Id);
  expect(user.avatar).toEqual(expect.any(Buffer))
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({
      name: 'Mia'
    }).expect(200);
  const user = await User.findById(user1Id);
  expect(user.name).toBe('Mia');
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send({
      location: 'Anywhere'
    })
    .expect(400);
});
