function AppController() {
  //call Appmodel from model.js
  this.model = new AppModel();
  this.model.startSession();

  this.startweb = function() {};

  this.shoeshotStart = function() {
    // //load the db in UI
    this.model.showObject();
  };

  this.cartStart = function() {
    // //load the db in UI
    this.model.getSession();
  };

  //call Toggleitem from model.js
  this.toggle = new Shoeitem();

  //Event handler for index.html
  this.attachEventHandlers = function() {
    var self = this;

    //event handler for Show Completed TODO
    $("#done").click(function() {
      console.log("qwertyuio");
      self.model.showObject();
    });

    $("#cart").click(function() {
      window.location.href = "cart.html";
    });

    $("#buyall").click(function() {
      self.model.buyallitem();
      self.pre_render();

      //self.pre_render();
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
      var item = $("<span></span>").text(shoeitem.itemname);
      var seller = $("<span></span>").text(shoeitem.sellername);
      var prize = $("<span></span>").text(shoeitem.prize);

      var addToCart = $("<input />", {
        type: "button",
        value: "Add To Cart",
        class: "libutton"
      });

      //call funtion for delete TODO item
      addToCart.click(
        function(id, i) {
          self.model.addToSession(id, i);
        }.bind(null, index, i)
      );

      //append all element in li
      li.append("<div>");
      li.append(shoeimage);
      li.append("</div>");
      li.append("<div>");
      li.append(item);
      li.append("</div>");
      li.append("<div >");
      li.append(seller);
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
}
