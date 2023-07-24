let items_array = [
  { name: "carrots", id: 1, count: 1 },
  { name: "spinach", id: 2, count: 1 },
  { name: "cookies", id: 3, count: 1 },
  { name: "lettuce", id: 4, count: 1 },
  { name: "avocado", id: 5, count: 1 },
];

let cart = [];

function appendNode(parent, element) {
  parent.appendChild(element);
}

function getDiv(container) {
  return document.getElementById(container);
}

function createNode(node) {
  let element = document.createElement(node);
  return element;
}

function displayItems(items, container) {
  let items_container = getDiv(container);
  items_container.innerHTML = "";

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    let item_node = createNode("li");
    item_node.setAttribute("id", item.id);

    if (item.count > 0) {
      item_node.innerHTML = `${item.name} 
            <span id="badge">${item.count}</span>`;
      appendNode(items_container, item_node);
    }
  }
}

displayItems(items_array, "items");
displayItems(cart, "cart");

getDiv("items").addEventListener("click", function (event) {
  let item_tag = event.target.closest("li")?.tagName;
  let item_id = event.target.id;

  if (item_tag === "LI") {
    let item = items_array.filter(function (item) {
      return item.id == item_id;
    })[0];

    let item_in_cart = cart.filter(function (item) {
      return item.id == item_id;
    })[0];

    if (!item_in_cart) {
      if (item) {
        cart.push({ ...item });
      }
    } else {
      item_in_cart.count++;
    }

    displayItems(cart, "cart");
  }
});

getDiv("cart").addEventListener("click", function (event) {
  let item_tag = event.target.closest("li")?.tagName;
  let item_id = event.target.id;

  if (item_tag === "LI") {
    let item_in_cart = cart.filter(function (item) {
      return item.id == item_id;
    })[0];

    if (item_in_cart) {
      item_in_cart.count--;
      if (item_in_cart.count == 0) {
        let index = cart.indexOf(item_in_cart);
        cart.splice(index, 1);
      }
    }

    console.log(cart);
    displayItems(cart, "cart");
  }
});
