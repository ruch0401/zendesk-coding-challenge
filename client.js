$(document).ready(function () {
  console.log("Ready!");

  var ticket_count;

  $.ajax({
    url: "http://localhost:3000/tickets",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).done(function (data) {
    ticket_details = data.tickets;
    for (ticket of ticket_details) {
      buildDiv(ticket);
    }
  });

  $(".count-tickets").on("click", function (e) {
    $.ajax({
      url: "http://localhost:3000/ticket/count",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).done(function (data) {
      ticket_count = data.count.value;
      console.log("Number of tickets returned ", ticket_count);
      if (ticket_count > 25) {
        paginate();
      }
    });
  });

  // $(".fetch-tickets").on("click", function (e) {
  //   e.preventDefault();
  //   localStorage.clear();
  //   $.ajax({
  //     url: "http://localhost:3000/tickets",
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   }).done(function (data) {
  //     ticket_details = data.tickets;
  //     for (ticket of ticket_details) {
  //       console.log(ticket);
  //       buildDiv(ticket);
  //     }
  //   });
  // });

  function buildDiv(ticket) {
    $(".ticket-list-wrapper").append(
      `
      <div class="ticket-list-item">
      <button class="accordion" id="${ticket.id}">${ticket.subject}</button>
      <div class="panel">
        <p>${ticket.description}</p>
        <p>Created at: ${ticket.created_at}</p>
        <p>Updated at: ${ticket.updated_at}</p>
        <p>Tags: ${ticket.tags}</p>
        <p>Status: ${ticket.status}</p>
        <p>Priorty: ${ticket.priority}</p>
        <p>Type: ${ticket.type}</p>
      </div>
    </div>
      `
    );
    attachAccordion(ticket.id);
  }

  function attachAccordion(id) {
    var acc = document.getElementById(`${id}`);
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  function paginate() {
    var items = $(".ticket-list-wrapper .ticket-list-item");
    console.log("Items ", items);
    var numItems = items.length;
    var perPage = 25;

    items.slice(perPage).hide();

    $("#pagination-container").pagination({
      items: numItems,
      itemsOnPage: perPage,
      prevText: "&laquo;",
      nextText: "&raquo;",
      onPageClick: function (pageNumber) {
        var showFrom = perPage * (pageNumber - 1);
        var showTo = showFrom + perPage;
        items.hide().slice(showFrom, showTo).show();
      },
    });
  }
});
