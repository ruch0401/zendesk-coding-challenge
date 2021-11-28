const supertest = require("supertest");
const app = require("./app");

test("Tests whether /tickets returns the response which is an array", async () => {
  await supertest(app)
    .get("/tickets")
    .expect(200)
    .then((response) => {
      var tickets = response.body.tickets;
      // Check type and length
      expect(Array.isArray(tickets)).toBeTruthy();
    });
});

test("Tests whether /tickets returns the response where key=tags is an array of length 3", async () => {
  await supertest(app)
    .get("/tickets")
    .expect(200)
    .then((response) => {
      var tickets = response.body.tickets;
      var i;
      for (i = 0; i < tickets.length; i++) {
        expect(Array.isArray(tickets[0].tags)).toBeTruthy();
        expect(tickets[0].tags.length).toBe(3);
      }
    });
});

// This test takes into consideration that # of tickets returned will be greater than 75
test("Tests whether the response from /tickets is paginated if count of tickets is greater than 25", async () => {
  await supertest(app)
    .get("/tickets")
    .expect(200)
    .then((response) => {
      var tickets = response.body.tickets;
      expect(tickets.length / 25).toBe(4);
    });
});
