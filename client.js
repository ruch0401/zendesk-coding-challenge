$(document).ready(function () {
  console.log("Ready!");

  var perPage = 25;

  // client side API call to node server => calls the zendesk /tickets API to fetch a list of tickets
  $(".get-tickets").on("click", () => {
    $.ajax({
      url: "http://localhost:3000/tickets",
      method: "GET",
      headers: { "Content-Type": "text/html" },
    }).then(
      function (data) {
        console.log(data);
        ticket_details = data.tickets;
        $(".ticket-list-wrapper").empty();
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
  });

  // adding eventListener to a button to render a form
  $(".enter-ticket-details").on("click", () => {
    renderForm();
  });

  // render form to enter ticket details
  function renderForm() {
    $(".form-placeholder").append(
      `<form action="http://localhost:3000/ticket" method="post">
      <label for="subject-id">Subject</label>
      <input type="text" name="subject" id="subject-id">
      <label for="comment-id">Comment</label>
      <input type="text" name="comment" id="comment-id">
      <button type="submit">Create Ticket</button>
    </form>`
    );
  }

  // function to process and render tickets list
  function renderTicketDetails(ticket) {
    $(".ticket-list-wrapper").append(
      `
      <div class="ticket-list-item">
      <button class="accordion" id="${ticket.id}">${ticket.id}. ${
        ticket.subject
      }</button>
      <div class="panel">
      ${renderTableForTicketData(ticket)}
      </div>
    </div>
      `
    );
    attachAccordion(ticket.id);
  }

  // Helper method to attach accordion to the HTML div
  function attachAccordion(id) {
    var acc = document.getElementById(`${id}`);
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 5 + "px";
      }
    });
  }

  // function to handle pagination if the number of tickets are greater than 25
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

  // function to handle and render errors
  function renderErrorHandling(error) {
    var responseJson = error.responseJSON;
    var statusCode = responseJson.statusCode;
    var errorMessage = JSON.parse(responseJson.message).error;
    $(".error-handling").append(
      `
      <p>Error: ${errorMessage}</p>
      `
    );
  }

  // function for displaying the total and this page ticket counter
  function displayCounterStatus(count) {
    $(".counter").empty();
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

  // function for rendering ticket data in a table
  function renderTableForTicketData(ticket) {
    return `
      <table>
  <tr>
    <th>Description</th>
    <th>Created at</th>
    <th>Updated at</th>
    <th>Tags</th>
    <th>Status</th>
    <th>Priority</th>
    <th>Type</th>
  </tr>
  <tr>
    <td>${ticket.description}</td>
    <td>${new Date(ticket.created_at)}</td>
    <td>${new Date(ticket.updated_at)}</td>
    <td>${ticket.tags}</td>
    <td>${ticket.status}</td>
    <td>${ticket.priority}</td>
    <td>${ticket.type}</td>
  </tr>
</table>
`;
  }

  // function for rendering ticket data in a paragraph. Currently this is not used anywhere but is saved in case of future use
  function renderParagraphForTicketData(ticket) {
    return `<p>${ticket.description}</p>
    <p><b>Created at: </b>${new Date(ticket.created_at)}</p>
    <p><b>Updated at: </b>${new Date(ticket.updated_at)}</p>
    <p><b>Tags: </b>${ticket.tags}</p>
    <p><b>Status: </b>${ticket.status}</p>
    <p><b>Priorty: </b>${ticket.priority}</p>
    <p><b>Type: </b>${ticket.type}</p>`;
  }
});
