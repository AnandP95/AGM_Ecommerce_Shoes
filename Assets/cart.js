var number = 0;

var priceList =[];
$(document).ready(function() {

    /* select elements using Jquery*/
    var cartItemsList = $("#cart-items");
    var cartTotal = $("#cart-total");
    var storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    function updateCart() {
        cartItemsList.empty();
       
  
      storedCart.forEach(item => {
        var cartItemEl = $("<li>");
  
        var titleArray = item.title.split(' ');
        var title = titleArray.length >= 3 ? `${titleArray[0]} ${titleArray[1]} ${titleArray[2]}...` : item.title;
        var nameEl = $("<span>").text(title);
        cartItemEl.append(nameEl);
  
        var quantityEl = $("<input>").attr({
          class: "product__quantity",
          type: "number",
          min: 1,
          max: 50,
          value: item.quantity
        }).on("input", function() {
          item.quantity = parseInt($(this).val());
          updateCart();
        });
  
        cartItemEl.append(quantityEl);
  
        var price = parseFloat(item.price.slice(1));
        var priceEl = `<span id='${number}'> $${(price * item.quantity).toFixed(2)} </span>`;
        number++;
        cartItemEl.append(priceEl);
  
        cartItemsList.append(cartItemEl);
      });
  
      var total = storedCart.reduce((acc, item) => acc + parseFloat(item.price.slice(1)) * item.quantity, 0);
      cartTotal.text(`Total: $${total.toFixed(2)}`);
    }
  
    updateCart();
  });
  



  $(function(){
      var currencyConverter = function(country,symbol){
          var inputRequestUrl = "https://api.currencylayer.com/live?access_key=2de5719aa0cdcbaca71c4f4a02eac6e1";
          //&currencies=AUD,EUR,GBP,PLN,EGP,ILS,BGN,COP
          fetch(inputRequestUrl)
          .then(function (response) {
              return response.json();
          }).then(function (data) {
              var rate =0;
              var countryList = Object.keys(data.quotes);
              var rateList = Object.values(data.quotes);
              for(var i = 0; i < countryList.length; i++){
                  // when it find the key for the currency the user chose 
                  // it will set the value of rate to the value of that key
                  // and then break out of the for loop 
                  if(country == countryList[i]){
                      rate = rateList[i];
                      break;
                  }
              }
              console.log(rate);
              // once we have the rate we can do the math. 
              // TODO: call the function that will do the math for us
              currencyMath(rate, symbol);
          });
      }
  
     
      var currencyMath = function(rate,symbol){

         // does the math for each item in the cart
        for(var i = 0; i < number; i++){
          var price = $(`#${i}`).text();
          price = parseFloat(price.slice(2));
          price = (price * rate).toFixed(2);
          console.log(price * rate);
          // resets the price tag in the html 
          $(`#${i}`).text(`${symbol} ${price}`);
        }
        
        // does math for the total price
        var total = $("#cart-total").text();
        total = parseFloat(total.slice(8));
        console.log(total);
        total = (total * rate).toFixed(2);
        console.log(total * rate);total
        $("#cart-total").text(`${symbol} ${total}`);
        
        //note that in if you change the quantity after a curren
        $( "#warning" ).dialog({
          modal: true
        });
      } 
  
  
      //creates the dropdown menu functionality
      $("#currencyOptions").selectmenu().selectmenu( "menuWidget" ).addClass( "overflow" );
  
      //when click on the change currency button 
      $("#convertCurrency").on('click',function(event){
          event.preventDefault();
          //gets the value from the option that was selected in the dropdown menu
          var chosenCurrency = $("#currencyOptions").val();
          // separates the country code from the symbol for the api search
          chosenCurrency = chosenCurrency.split(' ');
          console.log(chosenCurrency[0]);
          var countryCode = chosenCurrency[0];
          console.log(chosenCurrency[1]);
          var symbol = chosenCurrency[1];
          // calls the function that will use the api to get the current
          //  exchange rate for US dollars to the chosen currency
          currencyConverter(countryCode, symbol);
      });
  })
  
  
  