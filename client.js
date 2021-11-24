$(document).ready(function () {
  localStorage.clear();
  $.ajax({
    url: "http://localhost:3000/tickets",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).done(function (data) {
    console.log(data);
  });
});
