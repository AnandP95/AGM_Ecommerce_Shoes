

$(document).ready(function() {

  var cart = [];
  var cartTotal = $("#cart-total");

  /* set a event handler for click on add to cart button */
  $(".CartBtn").on("click", function() {
    var productId = $(this).data("product-id");
    var productName = $(this).siblings("h2").text();
    var productPrice = parseFloat($(this).siblings(".price").text().replace("$", ""));

    var cartItem = {

      /* create cart item object here  */
      id: productId,
      
      name: productName,
      price: productPrice,
      quantity: 1
    };

    var existingItem = cart.findIndex(item => item.id === productId);
    if (existingItem !== -1) {
      cart[existingItem].quantity++;
    } else {
      cart.push(cartItem);
    }

    /*store the updated cart  */
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTotal();
    updateCartUI();
  });


  /* function to update the cart total  */
  function updateCartTotal() {
    var  total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotal.text('Total: $${total.toFixed(2)}');
  }

  function updateCartUI() {
      const cartItemsList = $("#cart-items");
      cartItemsList.empty();
    

      cart.forEach(item => {
        var cartItemElement = $("<li>");
    
        
    
        var itemDetails = $("<span>").text(`${item.name} <br> ${item.quantity}  $${(item.price * item.quantity).toFixed(2)}`);
        cartItemElement.append(itemDetails);
    
        cartItemsList.append(cartItemElement);
      });
    }
    
});
