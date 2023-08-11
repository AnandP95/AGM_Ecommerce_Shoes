


var getProductsInfo = function() {
    var inputRequestUrl = "https://fakestoreapi.com/products";
    fetch(inputRequestUrl)
    .then(function (response) {
        console.log("products Api \n"+response.status);
        return response.json();
    }).then(function (data) {
          for(var i = 0; i < 12; i++){
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
$("button").on("click", function(event){
    event.preventDefault();
    console.log("added to cart");
});