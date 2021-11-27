$(document).ready(function () {
  console.log("Ready!");

  var perPage = 25;

  $.ajax({
    url: "http://localhost:3000/tickets",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then(
    function (data) {
      ticket_details = data.tickets;
      console.log(ticket_details);
      for (ticket of ticket_details) {
        renderTicketDetails(ticket);
      }
      if (ticket_details.length > perPage) {
        paginate();
      }
      displayCounterStatus(ticket_details.length);
    },
    function (error) {
      renderErrorHandling(error);
    }
  );

  function renderTicketDetails(ticket) {
    $(".ticket-list-wrapper").append(
      `
      <div class="ticket-list-item">
      <button class="accordion" id="${ticket.id}">${ticket.id}. ${ticket.subject}</button>
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
    var numItems = items.length;

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

  function renderErrorHandling(errorMessage) {
    var responseJson = error.responseJSON;
    var statusCode = responseJson.statusCode;
    var errorMessage = JSON.parse(responseJson.message).error;
    $(".error-handling").append(
      `
      <p>Error: ${errorMessage}</p>
      `
    );
  }

  function displayCounterStatus(count) {
    if (count > perPage) {
      $(".counter").append(
        `
        <p>${count} total tickets, ${perPage} displayed on this page</p>
        `
      );
    } else {
      $(".counter").append(
        `
        <p>${count} total tickets, ${count} displayed on this page</p>
        `
      );
    }
  }
});
