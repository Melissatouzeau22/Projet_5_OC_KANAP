// <!--  <article>

// <div>
//   <div class="cart__item__content__settings">
//     <div class="cart__item__content__settings__quantity">
//       <p>Qté : </p>
//       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//     </div>
//     <div class="cart__item__content__settings__delete">
//       <p class="deleteItem">Supprimer</p>
//     </div>
//   </div>
// </div>
// </article> -->

const wrapper = document.getElementById("cart__items");
const cart = getCart();
displayItems();

async function displayItems() {
  for (const product of cart) {
    const article = await makeArticle(product);
    wrapper.appendChild(article);
  }
}

function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = [];
  }
  return cart;
}

// sauvegarde le panier dans le localStorage //
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function getProduct(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  return await response.json();
}

async function makeArticle(element) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = element.id;
  article.dataset.color = element.color;
  const product = await getProduct(element.id);
  console.log(product);
  const image = makeImage(product.imageUrl, product.altTxt);
  article.appendChild(image);

  // creer card_item_content //
  const content = makeCartItemContent(
    product.name,
    product.price,
    element.color,
    element.quantity
  );
  article.appendChild(content);
  return article;
  // cart__item__content__settings//
}
function makeImage(url, alt) {
  const image = document.createElement("img");
  image.src = url;
  image.alt = alt;
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("cart__item__img");
  imageContainer.appendChild(image);
  return imageContainer;
}

function makeCartItemContent(name, price, color, quantity) {
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");

  const description = makeContentDescription(name, color, price);
  cartItemContent.appendChild(description);

  const settings = makeContentSettings(quantity);
  cartItemContent.appendChild(settings);

  return cartItemContent;
}

function makeContentDescription(name, color, price) {
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  const title = document.createElement("h2");
  title.textContent = name;
  description.appendChild(title);

  const colorElement = document.createElement("p");
  colorElement.textContent = color;
  description.appendChild(colorElement);

  const priceElement = document.createElement("p");
  priceElement.textContent = price + " €";
  description.appendChild(priceElement);
  return description;
}

function makeContentSettings(quantity) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  const settingsQuantity = document.createElement("div");
  settingsQuantity.classList.add("cart__item__content__settings__quantity");
  settings.appendChild(settingsQuantity);

  const settingsDelete = document.createElement("div");
  settingsDelete.classList.add("cart__item__content__settings__delete");
  settings.appendChild(settingsDelete);

  const quantityElement = document.createElement("p");
  quantityElement.textContent = "Qté : ";
  settingsQuantity.appendChild(quantityElement);

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.classList.add("itemQuantity");
  quantityInput.name = "itemQuantity";
  quantityInput.min = 1;
  quantityInput.max = 100;
  quantityInput.value = quantity;
  settingsQuantity.appendChild(quantityInput);

  const deleteElement = document.createElement("p");
  deleteElement.classList.add("deleteItem");
  deleteElement.textContent = "Supprimer";
  settingsDelete.appendChild(deleteElement);
  return settings;
}
