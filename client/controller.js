function AppController() {
  //call Appmodel from model.js
  this.model = new AppModel();
  this.model.startSession();

  this.startweb = function() {};

  this.shoeshotStart = function() {
    // //load the db in UI
    this.model.count();
    this.model.showObject();
    this.pre_render();
  };

  this.cartStart = function() {
    // //load the db in UI
    this.model.getSession();
    this.model.count();
  };

  //call Toggleitem from model.js
  this.toggle = new Shoeitem();

  //Event handler for index.html
  this.attachEventHandlers = function() {
    var self = this;

    $("#cart").click(function() {
      window.location.href = "cart.html";
    });

    $("#shopMore").click(function() {
      window.location.href = "index.html";
    });

    $("#buyall").click(function() {
      self.model.buyallitem();
      var cartsize = $("#cart_size");
      self.pre_render();
      if (cartsize.text() == 0) {
        self.showToastAdd();
      } else {
        self.showToast();
        cartsize.html("0");
      }
    });
  };

  //funtion to render the UI list from fetched DB
  this.render = function(filter) {
    var self = this;
    var list = $("#list");
    list.html("");

    for (var i in this.model.shoecollection) {
      var shoeitem = this.model.shoecollection[i];
      var index = this.model.shoecollection[i].id;

      var li = $("<li></li>");
      var shoeimage = $("<img></img>", { src: "img/" + shoeitem.img });
      var item = $("<span></span>", { class: "itemText content" }).text(
        shoeitem.itemname
      );
      var seller = $("<span></span>", { class: "sellerText content" }).text(
        shoeitem.sellername
      );
      var prize = $("<span></span>", { class: "prizeText content" }).text(
        "Rs:" + shoeitem.prize
      );

      var addToCart = $("<input />", {
        type: "button",
        value: "Add To Cart",
        class: "btn"
      });

      //call funtion for delete TODO item
      addToCart.click(
        function(id, i) {
          self.model.addToSession(id, i);
          self.model.count();
          self.pre_render();
          self.showToast();
        }.bind(null, index, i)
      );

      //append all element in li
      li.append("<div>");
      li.append(shoeimage);
      li.append("</div>");
      li.append("<div >");
      li.append(seller);
      li.append("</div>");
      li.append("<div>");
      li.append(item);
      li.append("</div>");
      li.append("<div >");
      li.append(prize);
      li.append("</div>");
      if (filter != "cart") {
        li.append("<div >");
        li.append(addToCart);
        li.append("</div>");
      }

      //update list:: list
      $("#list").append(li);
    }
  };

  this.attachEventHandlers();

  //pre_render function to call RENDER() untill all the Ajax funtion executed
  this.pre_render = function(filter) {
    var self = this;
    $(document).ajaxStop(function() {
      self.render(filter);
    });
  };

  this.showToast = function() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  };
  this.showToastAdd = function() {
    var x = document.getElementById("snackbarAdd");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  };
}
