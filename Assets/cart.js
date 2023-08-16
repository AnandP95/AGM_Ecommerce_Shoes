


$(document).ready(function() {
<<<<<<< HEAD

    /* select elements using Jquery*/

    /* select the cart items list*/ 
    var cartItemsList = $("#cart-items");

    /* select the cart total element*/ 
=======
    var   cartItemsList = $("#cart-items");
>>>>>>> b585b4bcc026cc7e73a024df34558cbc480f284b
    var cartTotal = $("#cart-total");

    /* Retrieve the data from local storage */ 
    var storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    /* set a function to update the cart */ 
    function updateCart() {

        /* clear the cart items previous list*/ 
        cartItemsList.empty();
  
        /* Set a loop for the stored the cart*/ 
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
            /* set a  update quantity when quantity changes */ 
          item.quantity = parseInt($(this).val());
          updateCart();
        });
  
        cartItemEl.append(quantityEl);
  
        var price = parseFloat(item.price.slice(1));
        var priceEl = $("<span>").text(`$${(price * item.quantity).toFixed(2)}`);
        cartItemEl.append(priceEl);
  
        cartItemsList.append(cartItemEl);
      });
  

      /* calculate and display the all items including total into the cart*/ 
      var total = storedCart.reduce((acc, item) => acc + parseFloat(item.price.slice(1)) * item.quantity, 0);
      cartTotal.text(`Total: $${total.toFixed(2)}`);
    }
  
    updateCart();
  });
  



  $(function(){
      var currencyConverter = function(country,symbol){
          var inputRequestUrl = "http://api.currencylayer.com/live?access_key=8ee7c486fccf59cf7db683a14a0f03c4";
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
              
          });
      }
  
      // TODO: create function to do the math. 
      // it will get the prices from the local storage
      //  and for each one mult by the rate that was taken in as a perameter
      // it will only reset the value of the price in the html not in the local starage
      // that way if the user chooses another country to change currency again 
      // we still have the USD prices in the local storage. 
  
  
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
  
  
<<<<<<< HEAD
  
=======
  
>>>>>>> b585b4bcc026cc7e73a024df34558cbc480f284b
