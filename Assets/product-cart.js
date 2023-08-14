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

  var getProductsInfo = function() {
    var inputRequestUrl = "https://fakestoreapi.com/products";
    fetch(inputRequestUrl)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        for(var i = 0; i < 12; i++){
            var product = `<li class="product">
            <img src="${data[i].image}" alt=""> 
            <h2>${data[i].title}</h2>
            <p class="productDescription">${data[i].description}</p>
            <span class="price">$${data[i].price}</span>
            <button class="addToCart" data-id="${data[i].id}">Add to Cart</button>
            </li> `;
            $("#productList").append(product);
            $(".productDescription").css("display","none");
        }
    });
}

getProductsInfo();


$("body").on("click", ".addToCart", function(event) {
  event.preventDefault();
  var productId = $(this).data("id");
  
  // Add product to cart (localStorage)
  var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  cart.push(productId);
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  
  // Update items count next to cart button
  var amountInCart = cart.length;
  $('#itemsInCart').text(amountInCart).css('color', 'tomato');
  console.log(cart);
});
