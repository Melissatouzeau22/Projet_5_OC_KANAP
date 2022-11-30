// <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
// <div class="cart__item__img">
//   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
// </div>
// <div class="cart__item__content">
//   <div class="cart__item__content__description">
//     <h2>Nom du produit</h2>
//     <p>Vert</p>
//     <p>42,00 €</p>
//   </div>
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
function addToCart(cart) {
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
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  article.appendChild(cartItemContent);
  //creer card_item_content_description //
  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  cartItemContent.appendChild(description);
  return article;
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

function makeCartItemContent(name, price, color) {
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");

  const description = document.createElement("div");
  description.classList.add("cart__item__content__description");
  cartItemContent.appendChild(description);

  const h2 = document.createElement("h2");
  h2.textContent = element.name;
  const p = document.createElement("p");
  p.textContent = element.color;
  const p2 = document.createElement("p");
  p2.textContent = element.price = " €";
  description.appendChild(h2);
  description.appendChlid(p);
  description.appendChild(p2);
}
