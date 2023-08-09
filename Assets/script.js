
var currencyRates = function(){
    var inputRequestUrl = "https://api.currencylayer.com/live?access_key=8ee7c486fccf59cf7db683a14a0f03c4";
    fetch(inputRequestUrl)
    .then(function (response) {
        console.log("currency Api \n"+ response.status);
        return response.json();
    })
    // .then(function (data) {
    //   latitude = data.coord.lat;
    //   longitude = data.coord.lon;
    //   console.log(latitude);
    //   console.log(longitude);
    //   getData(longitude,latitude);
    //   $(".results").css("display","block");
    // });
}
currencyRates();

var getProductsInfo = function() {
    var inputRequestUrl = "https://fakestoreapi.com/products";
    fetch(inputRequestUrl)
    .then(function (response) {
        console.log("products Api \n"+response.status);
        return response.json();
    }).then(function (data) {
          for(var i = 0; i < 10; i++){
            var product  = `<li class="product">
            <img src="${data[i].image}" alt=""> 
            <h2>${data[i].title}</h2>
            <p class="productDescription">${data[i].description}</p>
            <span class="price">$${data[i].price}</span>
            <button>Add to Cart</button>
            </li> `;
            console.log(product);
            $("#productList").append(product);
            $(".productDescription").css("display","none");
          }
        });
}

getProductsInfo();