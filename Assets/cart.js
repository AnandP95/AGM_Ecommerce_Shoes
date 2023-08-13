

$(document).ready(function() {
  var   cartItemsList = $("#cart-items");
  var cartTotal = $("#cart-total");

  var storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  
  /*  Display items in the cart */
storedCart.forEach(item => {
  var cartItemEl= $("<li>");

 

 var  nameEl = $("<span>").text(item.name);
  cartItemEl.append(nameEl);

     var  quantityEl = $("<span>").text(` ${item.quantity}`);
  cartItemEl.append(quantityEl);

  var  priceEl = $("<span>").text(`$${(item.price * item.quantity).toFixed(2)}`);
  cartItemEl.append(priceEl);

  cartItemsList.append(cartItemEl);
});


  /* Calculate and display total price */
  var  total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.text(`Total: $${total.toFixed(2)}`);
});
