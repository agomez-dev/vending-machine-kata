describe("Coin", function() {

  var Coin = require("../src/Coin.js");

  describe("creation", function() {
    it("should generate a penny with the proper size and weight", function() {

     var coin = new Coin(1);

      expect(coin.weight).toEqual(2.5);
      expect(coin.size).toEqual(0.750);
      expect(coin.name).toEqual("Penny");
      expect(coin.value).toEqual(1);
    });

    it("should generate a nickel with the proper size and weight", function() {
      var coin = new Coin(5);

      expect(coin.weight).toEqual(5);
      expect(coin.size).toEqual(0.835);
      expect(coin.name).toEqual("Nickel");
      expect(coin.value).toEqual(5);
    });

    it("should generate a dime with the proper size and weight", function() {
      var coin = new Coin(10);

      expect(coin.weight).toEqual(2.268);
      expect(coin.size).toEqual(0.705);
      expect(coin.name).toEqual("Dime");
      expect(coin.value).toEqual(10);
    });

    it("should generate a quarter with the proper size and weight", function() {
      var coin = new Coin(25);

      expect(coin.weight).toEqual(5.670);
      expect(coin.size).toEqual(0.955);
      expect(coin.name).toEqual("Quarter");
      expect(coin.value).toEqual(25);
    });
  });
});