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
        var cart = JSON.parse(localStorage.getItem("cart"))||[];

        var product = $(this).parents('.product');
        console.log(product);
        cart.push(
            {
                image: product.children('img').attr('src'),
                title: product.children('h2').text(),
                discription: product.children('p').text(),
                quantity: 1,
                price: product.children('span').text()
            }
        )

        var amountInCart = cart.length;
        // shows the amount of products in the cart next to the cart button in the nav bar
        $('#itemsInCart').text(amountInCart).css('color', 'tomato');
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
      });
})