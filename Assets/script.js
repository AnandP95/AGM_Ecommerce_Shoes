$(function(){
    var getProductsInfo = function() {
        var inputRequestUrl = "https://fakestoreapi.com/products";
        fetch(inputRequestUrl)
        .then(function (response) {
            console.log("products Api \n"+response.status);
            return response.json();
        }).then(function (data) {
              for(var i = 8; i < 20; i++){
                var price = Intl.NumberFormat("symbol", {
                    style: "currency",
                    currency: "USD"
                    }).format(data[i].price);
                var product  = `<li class="product">
                <img src="${data[i].image}" alt=""> 
                <h2>${data[i].title}</h2>
                <p class="productDescription">${data[i].description}</p>
                <span class="price">${price}</span>
                <button class="addToCart" >Add to Cart</button>
                </li> `;
                // console.log(product);
                $("#productList").append(product);
                $(".productDescription").css("display","none");
              }
            });
    }
    
    getProductsInfo();
    
    // add functionality, when click on add to cart button it adds to local storage key called cart. 
    $(document).on("click", ".addToCart", function(){
        console.log("added to cart");
        var cart = JSON.parse(localStorage.getItem("shoppingCart"))||[];

        var product = $(this).parents('.product');
        console.log(product);
        cart.push(
            {
                image: product.children('img').attr('src'),
                title: product.children('h2').text(),
                discription: product.children('p').text(),
                price: product.children('span').text()
            }
        )

<<<<<<< HEAD
var getProductsInfo = function() {
    var inputRequestUrl = "https://fakestoreapi.com/products";
    fetch(inputRequestUrl)
    .then(function (response) {
        console.log("products Api \n"+response.status);
        return response.json();
    }).then(function (data) {
          for(var i = 0; i < 12; i++){
            var product  = `<li class="product">
            <img src="${data[i].image}" alt=""> 
            <h2>${data[i].title}</h2>
            <p class="productDescription">${data[i].description}</p>
            <span class="price">$${data[i].price}</span>
            <button class="addToCart" >Add to Cart</button>
            </li> `;
            // console.log(product);
            $("#productList").append(product);
            $(".productDescription").css("display","none");
          }
        });
}

getProductsInfo();

// add functionality, when click on add to cart button it adds to local storage key called cart. 
$("button").on("click", function(event){
    event.preventDefault();
    console.log("added to cart");
});


=======
        var amountInCart = cart.length;
        // shows the amount of products in the cart next to the cart button in the nav bar
        $('#itemsInCart').text(amountInCart).css('color', 'tomato');
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        console.log(cart);
      });
})
>>>>>>> c39112b32b253309a575d21a82cfb58725d62b01
