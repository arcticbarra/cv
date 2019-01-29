var checkboxes = document.querySelectorAll("input[type=checkbox]");

for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function (event) {
    this.nextElementSibling.classList.toggle('done');
    if (this.checked) {
      document.querySelector('#finished-list').appendChild(this.parentNode);
    } else {
      document.querySelector('#unfinished-list').appendChild(this.parentNode);
    }
  })
}

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    addTodo(input.value);
    input.value = '';
  }
})

function addTodo(todoText) {
  var node = document.createElement('li');
  node.innerHTML = `<input type="checkbox" name="todo" value="${document.querySelectorAll("input[type=checkbox]").length + 1}"><span>${todoText}</span>`;
  document.querySelector('#unfinished-list').appendChild(node);
  var checkbox = document.querySelector("#unfinished-list >li:last-child input").addEventListener('change', function (event) {
    this.nextElementSibling.classList.toggle('done');
    if (this.checked) {
      document.querySelector('#finished-list').appendChild(this.parentNode);
    } else {
      document.querySelector('#unfinished-list').appendChild(this.parentNode);
    }
  });
}
