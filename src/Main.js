var Penny = new Coin(1);
var Nickel = new Coin(5);
var Dime = new Coin(10);
var Quarter = new Coin(25);

var Inventory = new Inventory(10, 10, 10);

var Machine = new Machine(0, 0, 0);


$( document ).ready(function() {
$("#display").attr("placeholder", Machine.displayMessage());
$("#Penny").click(function(){
	Machine.insertCoin(Penny);
	$("#display").attr("placeholder", Machine.displayMessage());
});

$("#Nickel").click(function(){
	Machine.insertCoin(Nickel);
	$("#display").attr("placeholder", Machine.displayMessage());
});

$("#Dime").click(function(){
	Machine.insertCoin(Dime);
	$("#display").attr("placeholder", Machine.displayMessage());
});

$("#Quarter").click(function(){
	Machine.insertCoin(Quarter);
	$("#display").attr("placeholder", Machine.displayMessage());
});

$("#Return").click(function(){
	Machine.coinReturn();
	$("#display").attr("placeholder", Machine.displayMessage());
});

$("#Cola").click(function(){
	var Purchase = Machine.makePurchase(0);
	$("#display").attr("placeholder", Purchase);
	if(Purchase == "PRICE"){
	setTimeout(function(){
    $("#display").attr("placeholder", String(1.00));
}, 750);
}
	setTimeout(function(){
    $("#display").attr("placeholder", Machine.displayMessage());
}, 1500);

});

$("#Chips").click(function(){
	var Purchase = Machine.makePurchase(1);
	$("#display").attr("placeholder", Purchase);
	if(Purchase == "PRICE"){
	setTimeout(function(){
    $("#display").attr("placeholder", String(0.50.toFixed(2)));
}, 750);}
	setTimeout(function(){
    $("#display").attr("placeholder", Machine.displayMessage());
}, 1500);

});

$("#Candy").click(function(){
	var Purchase = Machine.makePurchase(2);
	$("#display").attr("placeholder", Purchase);
	if(Purchase == "PRICE"){
	setTimeout(function(){
    $("#display").attr("placeholder", String(0.65));
}, 750);}
	setTimeout(function(){
    $("#display").attr("placeholder", Machine.displayMessage());
}, 1500);
	
});

});