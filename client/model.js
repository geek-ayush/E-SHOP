function Shoeitem(id, img, itemname, sellername, prize) {
  this.id = id;
  this.img = img;
  this.itemname = itemname;
  this.sellername = sellername;
  this.prize = prize;
}

function AppModel() {
  this.input = "";
  this.shoecollection = [];

  //show all the data from Shoe Shop
  this.showObject = function() {
    var self = this;
    $.ajax({
      url: "server/get.php",
      data: {
        filter: "all"
      },
      success: function(result) {
        var log = JSON.stringify(result.data);
        self.shoecollection = JSON.parse(log);
        console.log(self.shoecollection);
      }
    });
  };

  this.count = function() {
    var self = this;
    $.ajax({
      url: "server/getSession.php",
      success: function(result) {
        var log = JSON.stringify(result);
        var daa = JSON.parse(log);
        var length = daa.data.length;
        var cartsize = $("#cart_size");
        cartsize.html(length);
      }
    });
  };
  //start the session
  this.startSession = function() {
    var self = this;
    console.log;
    $.ajax({
      url: "server/startSession.php",
      data: {
        id: null
      },
      success: function(result) {
        console.log("session started");
      }
    });
  };

  //add item to session
  this.addToSession = function(id) {
    console.log(id);
    $.ajax({
      url: "server/startSession.php?id=" + id,
      success: function(data) {
        console.log("item added");
      }
    });
  };

  //add item to session
  this.removeFromSession = function(i) {
    var self = this;
    $.ajax({
      url: "server/removeFromSession.php?id=" + i,
      success: function(data) {
        self.shoecollection.splice(i, 1);
        self.count();
      }
    });
  };

  //get item from session
  this.getSession = function() {
    var self = this;
    $.ajax({
      url: "server/getSession.php",
      success: function(result) {
        var log = JSON.stringify(result);
        var daa = JSON.parse(log);
        self.shoecollection = daa.data;
      }
    });
  };

  //buy all item from cart
  this.buyallitem = function() {
    var self = this;
    $.ajax({
      url: "server/buySession.php",
      success: function(result) {
        self.shoecollection = [];
        console.log(self.shoecollection.length);
      }
    });
  };

  //handel ajax error
  this.errorlog = function(data) {
    var errorMsg = data.statusText;
    var errorStatus = data.status;
    console.log(errorMsg + " " + errorStatus);
  };
}
