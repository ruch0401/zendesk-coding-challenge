$(document).ready(function () {
  localStorage.clear();
  $.ajax({
    url: "http://localhost:3000/tickets",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).done(function (data) {
    const tickets_data = data.tickets;
    console.log(tickets_data);
    for (ticket of tickets_data) {
      buildDiv(ticket);
    }
  });
});

function buildDiv(ticket) {
  $(".ticket-container")
    .append(`<div class="ticket-div"><h2>${ticket.subject}</h2>
    
    <p>${ticket.tags}</p>
    <p>${ticket.created_at}</p>
    <p>${ticket.updated_at}</p>
    <p>${ticket.description}</p>
  <a href="${ticket.url}"></a></div></br>`);
}
