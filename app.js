//listen for the click event from submit icon
let add = document.querySelector("#submit");
add.addEventListener("click", function() {
  if (this.innerText == "Update") {
    this.innerText = "Add";
    this.style.background = "rgb(248, 246, 246)";
  }
  saveItems();
});

// this function display item details from the array saved in local storage

const displayItems = () => {
  let container = document.querySelector("#grid");

  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));

  container.innerHTML = "";

  itemInfos.forEach(function(el) {
    const name = document.createElement("div");
    const quantity = document.createElement("div");
    const description = document.createElement("div");
    // const id = document.createElement("div");
    const category = document.createElement("div");
    const date = document.createElement("div");

    name.textContent = el.name;
    quantity.textContent = el.quantity;
    description.textContent = el.description;
    // id.textContent = el.id;
    category.textContent = el.category;
    date.textContent = el.today;

    if (el.completed === true) {
      name.className = "done";
    } else {
      name.classList.remove("done");
    }

    name.addEventListener("click", taskCompleted);

    let buttons = document.createElement("div"),
      edit = document.createElement("button"),
      del = document.createElement("button");
    del.id = el.id;
    edit.id = el.id2;
    edit.innerText = "edit";
    del.innerText = "delete";
    edit.addEventListener("click", editItem);
    del.addEventListener("click", deleteItem);

    buttons.appendChild(del);
    buttons.appendChild(edit);
    container.appendChild(name);
    container.appendChild(quantity);
    container.appendChild(description);
    container.appendChild(category);
    container.appendChild(date);
    container.appendChild(buttons);
  });
};

// this function delete items from the list
const deleteItem = function(e) {
  //Get  from localStorage
  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));
  // // Loop through the bookmarks
  for (let i = 0; i < itemInfos.length; i++) {
    if (itemInfos[i].id == this.id) {
      //     // Remove from array
      itemInfos.splice(i, 1);
    }
  }
  // // Re-set back to localStorage
  localStorage.setItem("itemInfos", JSON.stringify(itemInfos));

  // // Re-fetch item
  displayItems();
};

// this function save input value to the local storage

const saveItems = function(e) {
  let name = document.querySelector("#input1").value;
  let quantity = document.querySelector("#input3").value;
  let description = document.querySelector("#input2").value;
  let category = document.querySelector("#shoes").value;
  let date = new Date();
  let completed = false;
  let today = date.toDateString();
  let id = Math.random()
    .toString(36)
    .substring(5);
  let id2 = generateID();

  function generateID() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  if (!name || !quantity || !description|| !category) {
    alert("Please add your inventories!!");
    return false;
  }

  // create an objects to push inside an array
  let itemInfo = {
    name,
    quantity,
    description,
    completed,
    category,
    id,
    id2,
    today
  };

  if (localStorage.getItem("itemInfos") === null) {
    // Init the empty array
    let itemInfos = [];

    // Add to array
    itemInfos.push(itemInfo);
    // Set to localStorage
    localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
  } else {
    // Get item from localStorage
    let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));
    // Add item to array
    itemInfos.push(itemInfo);
    // Re-set back to localStorage
    localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
  }

  document.querySelector("#myForm").reset();

  displayItems();
};
// to edit item from the shopping list
const editItem = e => {
  let name = document.querySelector("#input1");
  let quantity = document.querySelector("#input3");
  let description = document.querySelector("#input2");
  let category = document.querySelector("#shoes");
  let addButton = document.querySelector("#submit");

  // let name = document.querySelector("#input1").value;
  // let quantity = document.querySelector("#input3").value;
  // let description = document.querySelector("#input2").value;
  // let category = document.querySelector("#shoes").value;

  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));

  for (let i = 0; i < itemInfos.length; i++) {
    if (itemInfos[i].id2 == e.target.id) {
      name.value += itemInfos[i].name;
      quantity.value += itemInfos[i].quantity;
      description.value += itemInfos[i].description;
      category.value += itemInfos[i].category;

      itemInfos.splice(i, 1);

      addButton.innerText = "Update";
      addButton.style.background = "rgb(18, 203, 196)";
    }
  }
  localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
};
// to check the task done
const taskCompleted = e => {
  console.log(e);
  // this.classList.toggle("done");
  let itemInfos = JSON.parse(localStorage.getItem("itemInfos"));
  let p = e.target.nextSibling.nextSibling.nextSibling;

  itemInfos.forEach((el, i) => {
    if (el.id == p.innerText) {
      el.completed = !el.completed;
    }
  });

  localStorage.setItem("itemInfos", JSON.stringify(itemInfos));
  displayItems();
};
displayItems();





// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}