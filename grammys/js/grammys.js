$(document).ready(function () {
  fetch('data/grammys.json', { method: 'GET', mode: 'no-cors' }).then(function (response) {
    return response.json();
  }).then(function (grammyJson) {
    console.log(grammyJson);
  })
})
