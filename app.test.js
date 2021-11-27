const supertest = require("supertest");
const app = require("./app");

test("Tests whether /tickets returns the response where key=tags is an array of length 3", async () => {
  await supertest(app)
    .get("/tickets")
    .expect(200)
    .then((response) => {
      var tickets = response.body.tickets;
      // Check type and length
      expect(Array.isArray(tickets)).toBeTruthy();
      expect(tickets.length).toEqual(100);

      // Check data
      var i;
      for (i = 0; i < tickets.length; i++) {
        expect(Array.isArray(tickets[0].tags)).toBeTruthy();
        expect(tickets[0].tags.length).toBe(3);
      }
    });
});
