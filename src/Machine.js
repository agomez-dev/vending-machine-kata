function Machine(Nickels, Dimes, Quarters)
{
    this.Nickels = Nickels;
    this.Dimes = Dimes;
    this.Quarters = Quarters;

    var coinQueue = {};

    resetQueue();

    var coinMap = {};

    var nickleWeight = 5;
	var nickleSize = 0.835;

	var dimeWeight = 2.268;
	var dimeSize = 0.705;

	var quarterWeight = 5.670;
	var quarterSize = 0.955;

    coinMap[nickleWeight] = "N";
	coinMap[nickleSize] = "N";

	coinMap[dimeWeight] = "D";
	coinMap[dimeSize] = "D";

	coinMap[quarterWeight] = "Q";
	coinMap[quarterSize] = "Q";

    

    function insertCoin(Coin){

    	if(coinMap[String(Coin.weight)] ==  coinMap[String(Coin.size)] && coinMap[String(Coin.size)] != undefined)
    	{
    		coinQueue[Coin.name] += 1;
    		coinQueue["Total"] += Coin.value;
    	}
    }

    function coinReturn(){
    	resetQueue();
    }

    function resetQueue(){
    	coinQueue["Nickel"] = 0;
	    coinQueue["Dime"] = 0;
	    coinQueue["Quarter"] = 0;
	    coinQueue["Total"] = 0;
    }

    function readTotal(){
    	return coinQueue["Total"];
    }

    function displayMessage(){
    	if(coinQueue["Total"] == 0)
            return String("INSERT COINS");
        else {
            if(coinQueue["Total"] < 100)
                return String(coinQueue["Total"]);
            else
                return String((coinQueue["Total"]/100).toFixed(2));
        }
    }

    function queueCount(Coin){
    	return coinQueue[Coin.name];
    }
/* Not a very DRY method, but this was towards the end of it */
    function makePurchase(Item){
        switch(Item){
            case 0:
                if(coinQueue["Total"] < 100){
                    return "PRICE";
                } else{
                    if (Inventory.purchase(Item)){
                        resetQueue();
                        return "THANK YOU";
                    }
                    else
                        return "SOLD OUT";
                }
            break;
            case 1:
                if(coinQueue["Total"] < 50){
                    return "PRICE";
                } else{
                    if (Inventory.purchase(Item)){
                        resetQueue();
                        return "THANK YOU";
                        
                    }
                    else
                        return "SOLD OUT";
                }
                
            break;
            case 2:
                if(coinQueue["Total"] < 65){
                    return "PRICE";
                } else{
                    if (Inventory.purchase(Item)){
                        resetQueue();
                        return "THANK YOU";
                        
                    }
                    else
                        return "SOLD OUT";
                }
            break;
            default:
            break;}
    }

    return{
    	insertCoin: insertCoin,
    	coinReturn: coinReturn,
    	resetQueue: resetQueue,
    	readTotal: readTotal,
    	displayMessage: displayMessage,
    	queueCount: queueCount,
        makePurchase: makePurchase
    };
}

module.exports = Machine;