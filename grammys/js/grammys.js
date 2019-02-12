
$(document).ready(function () {
  var grammysData;
  fetch('https://enriquebarragan.mx/grammys/data/grammys.json', { method: 'GET', mode: 'cors' }).then(function (response) {
    return response.json();
  }).then(function (grammyJson) {
    grammysData = grammyJson.fields;
    // Add fields to select
    grammysData.forEach(field => {
      var o = new Option(field.field, field.field_id);
      $(o).html(field.field);
      $("#category_types").append(o);
    });

    // Set info for first category
    setCategory(grammysData[0]);
  })

  $('#category_types').change(function () {
    var selected_category = $('#category_types').val() - 1;
    setCategory(grammysData[selected_category]);
  })
})


function setCategory(field) {
  $('#field').text(field.field);
  $('#field_description').text(field.description || "");
  $('#categories').html(''); // remove previous categories
  var categories = field.categories;
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    let nominees_html = ""
    for (let nominee_index = 0; nominee_index < category.nominees.length; nominee_index++) {
      const nominee = category.nominees[nominee_index];
      let title;
      // Check for winner nominee
      if (nominee_index === category.winner_id) {
        title = `<h4 class="winner">${nominee.nominee}</h4><span>WINNER!</span>`
      } else {
        title = `<h4>${nominee.nominee}</h4>`
      }
      // Assemble nominee html
      nominees_html += `<li>
        ${title}
        <p>${nominee.artist}</p>
        <p>${nominee.info}</p>
      </li>
      `

    }

    // Assemble final category 
    let html = `
    <ul>
      <h3>${category.category_name}</h3>
        ${nominees_html}
      </ul>
    `
    // Skip hr on the last record
    if (index < categories.length - 1) {
      html += '<hr>'
    }

    // Append the current category
    $('#categories').append(html);
  }
}
