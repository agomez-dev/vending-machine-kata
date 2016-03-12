describe("Machine", function() {

  var Coin = require("../src/Coin");
  var Inventory = require("../src/Inventory");
  var Machine = require("../src/Machine");
  var machine;
  var nickel = new Coin(5);
  var dime = new Coin(10);
  var quarter = new Coin(25);
  var penny = new Coin(1);

  beforeEach(function() {
    machine = new Machine(10, 10, 10);
    
  }); 

  describe("for individual coins", function() {

    it("should display initial state of INSERT COINS", function() {
      expect(machine.displayMessage()).toEqual("INSERT COINS");
    });

    it("should accept nickels", function() {
      machine.insertCoin(nickel);
      expect(machine.readTotal()).toEqual(5);
      expect(machine.displayMessage()).toEqual("5");
    });

    it("should accept dimes", function() {
      machine.insertCoin(dime);
      expect(machine.readTotal()).toEqual(10);
      expect(machine.displayMessage()).toEqual("10");
    });

    it("should accept quarters", function() {
      machine.insertCoin(quarter);
      expect(machine.readTotal()).toEqual(25);
      expect(machine.displayMessage()).toEqual("25");
    });

    it("should reject pennies", function() {
      machine.insertCoin(penny);
      expect(machine.readTotal()).toEqual(0);
      expect(machine.displayMessage()).toEqual("INSERT COINS");
    });

  });

  describe("for multiple coins", function() {

    it("should display correct total of 15", function() {
      machine.insertCoin(nickel);
      machine.insertCoin(nickel);
      machine.insertCoin(nickel);
      expect(machine.readTotal()).toEqual(15);
      expect(machine.displayMessage()).toEqual("15");
    });

    it("should display correct total of 35", function() {
      machine.insertCoin(dime);
      machine.insertCoin(dime);
      machine.insertCoin(dime);
      machine.insertCoin(nickel);
      expect(machine.readTotal()).toEqual(35);
      expect(machine.displayMessage()).toEqual("35");
    });

    it("should display correct total of 50", function() {
      machine.insertCoin(quarter);
      machine.insertCoin(dime);
      machine.insertCoin(dime);
      machine.insertCoin(nickel);
      expect(machine.readTotal()).toEqual(50);
      expect(machine.displayMessage()).toEqual("50");
    });

  });

  beforeEach(function() {
    machine = new Machine(0, 0, 0);
    
  }); 

  describe("counts coins correctly", function() {

    it("count three dimes, nothing else", function() {
      machine.insertCoin(nickel);
      machine.insertCoin(nickel);
      machine.insertCoin(nickel);
      expect(machine.queueCount(nickel)).toEqual(3);
      expect(machine.queueCount(quarter)).toEqual(0);
      expect(machine.queueCount(dime)).toEqual(0);
    });

    it("counts one of each", function() {
      machine.insertCoin(nickel);
      machine.insertCoin(dime);
      machine.insertCoin(quarter);
      expect(machine.queueCount(nickel)).toEqual(1);
      expect(machine.queueCount(quarter)).toEqual(1);
      expect(machine.queueCount(dime)).toEqual(1);
    });

    it("empties correctly", function() {
      machine.insertCoin(nickel);
      machine.insertCoin(dime);
      machine.insertCoin(quarter);
      machine.insertCoin(nickel);
      machine.insertCoin(dime);
      machine.insertCoin(quarter);
      expect(machine.queueCount(nickel)).toEqual(2);
      expect(machine.queueCount(quarter)).toEqual(2);
      expect(machine.queueCount(dime)).toEqual(2);
      machine.resetQueue();
      expect(machine.queueCount(nickel)).toEqual(0);
      expect(machine.queueCount(quarter)).toEqual(0);
      expect(machine.queueCount(dime)).toEqual(0);
      expect(machine.displayMessage()).toEqual("INSERT COINS");

    });

  });

beforeEach(function() {
    inventory = new Inventory(3, 3, 3);
    machine = new Machine(5, 5, 5);  
  }); 

  describe("computes change", function() {

    it("can give correct change", function(){
      expect(machine.checkChange(65)).toBeTruthy();
    });

    it("can give correct change", function(){
      machine = new Machine(1, 3, 0);
      expect(machine.checkChange(30)).toEqual({ Dime: 3, Quarter: 0, Nickel: 0 });
    });

    it("can give correct change", function(){
      machine = new Machine(4, 0, 3);
      expect(machine.checkChange(95)).toEqual({ Quarter: 3, Nickel: 4, Dime: 0 });
    });

    it("identifies EXACT CHANGE ONLY states correctly", function(){
      machine = new Machine(0, 0, 0);
      expect(machine.checkChange(95)).toBeFalsy;
      expect(machine.displayMessage()).toEqual("EXACT CHANGE ONLY");
    })

    /*TO DO
    Alters storedCoin count appropriately
    */
  });

  describe("purchase transactions", function() {

      /*TO DO
      Test change given out correctly

      Test messages (PRICE, SOLD OUT, THANK YOU) being displayed correctly and appropriately
      */
  });

});