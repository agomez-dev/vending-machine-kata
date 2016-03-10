describe("Inventory", function() {

  var Inventory = require("../src/Inventory.js");

  describe("creation", function() {

    it("should generate an inventory", function() {
      var inventory = new Inventory(3, 3, 3);

      expect(inventory.colaCount()).toEqual(3);
      expect(inventory.candyCount()).toEqual(3);
      expect(inventory.chipsCount()).toEqual(3);
    });

  });

  describe("purchases", function() {

    var inventory = new Inventory(3, 3, 3);

    it("should succesfully sell a cola", function() {
      var purchase = inventory.purchase(0);
      expect(purchase.Item).toEqual("Cola");
      expect(purchase.Cost).toEqual(1);
      expect(inventory.colaCount()).toEqual(2);
    });

    it("should succesfully sell chips", function() {
      
      var purchase = inventory.purchase(1);
      expect(purchase.Item).toEqual("Chips");
      expect(purchase.Cost).toEqual(0.50);
      expect(inventory.chipsCount()).toEqual(2);
    });

    it("should succesfully sell a candy", function() {
      var purchase = inventory.purchase(2);
      expect(purchase.Item).toEqual("Candy");
      expect(purchase.Cost).toEqual(0.65);
      expect(inventory.candyCount()).toEqual(2);
    });

    it("should tell you the item you picked is sold out", function() {
      var inventory = new Inventory(3, 3, 0);
      var purchase = inventory.purchase(2);
      expect(purchase.Item).toEqual("SOLD OUT");
      expect(purchase.Cost).toEqual(0);
      expect(inventory.candyCount()).toEqual(0);
    });

  });


});