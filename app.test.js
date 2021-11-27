const supertest = require("supertest");
const app = require("./app");

test("GET /tickets", async () => {
  const ticket = {
    id: 2,
    created_at: "2021-11-21T05:48:11Z",
    updated_at: "2021-11-21T05:48:11Z",
    description:
      "Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n\nAliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.",
    priority: null,
    status: "open",
    tags: ["est", "incididunt", "nisi"],
  };

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
