// Récupération de l'orderId du produit via l'URL
const orderId = new URL(window.location).searchParams.get("order__id");

// Affichage du numéro de la commande
function displayOrderId(products) {
  document.getElementById("orderId").innerText = `${products}`;
}
displayOrderId(orderId);
