function Machine(Nickels, Dimes, Quarters)
{
    nickelsStored = Nickels;
    dimesStored = Dimes;
    quartersStored = Quarters;
    this.Money = nickelsStored * 5 + dimesStored * 10 + quartersStored * 25;

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
    	if(coinQueue["Total"] == 0 && canGiveChange())
            return String("INSERT COINS");
        else {
            if(coinQueue["Total"] == 0)
                return String("EXACT CHANGE ONLY");
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
                        storeCoins();
                        resetQueue();
                        makeChange(0);
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
                        storeCoins();
                        resetQueue();
                        makeChange(1);
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
                        storeCoins();
                        resetQueue();
                        makeChange(2);
                        return "THANK YOU";
                        
                    }
                    else
                        return "SOLD OUT";
                }
            break;
            default:
            break;}
    }

/* Going for a very simple approach. Highest possible demonination first, then second highest possible
etc. */
    function makeChange(Item){
        
        var cost;
        var difference;
        var quartersBack = 0;
        var dimesBack = 0;
        var nickelsBack = 0;
        var change = new Array(3);

        var temp;

        if(Item == 0)
            cost = 100;
        if(Item == 1)
            cost = 50;
        if(Item == 2)
            cost = 65;

        difference = coinQueue["Total"] - cost;

        if(difference < 0)
            difference *= -1;

        if(difference > this.Money)
            return false;

        temp = Math.floor(difference / 25);

        if(quartersStored > 0 && quartersStored >= temp){
            quartersBack = temp;
            quartersStored -= temp;
            difference -= temp * 25;
        }

        if(quartersStored > 0 && quartersStored < temp){
            quartersBack = quartersStored;
            difference -= quartersStored * 25;
            quartersStored = 0;
        }

        temp = Math.floor(difference / 10);

        if(dimesStored > 0 && dimesStored >= temp){
            dimesBack = temp;
            dimesStored -= temp;
            difference -= temp * 10;
        }

        if(dimesStored > 0 && dimesStored < temp){
            dimesBack = dimesStored;
            difference -= dimesStored * 10;
            dimesStored = 0;
        }

        temp = Math.floor(difference / 5);

        if(nickelsStored > 0 && nickelsStored >= temp){
            nickelsBack = temp;
            nickelsStored -= temp;
            difference -= temp * 5;
        }

        if(nickelsStored > 0 && nickelsStored < temp){
            nickelsBack = nickelsStored;
            difference -= nickelsStored * 5;
            nickelsStored = 0;
        }

        change[0] = quartersBack;
        change[1] = dimesBack;
        change[2] = nickelsBack;

        if(difference == 0)
            return change;
        else
            return false;

    }

    function storeCoins(){

        nickelsStored += coinQueue["Nickel"];
        dimesStored += coinQueue["Dime"];
        quartersStored += coinQueue["Quarter"];
    }

    function canGiveChange(){
        return (makeChange(0) && makeChange(1)) && makeChange(2);
    }

    return{
    	insertCoin: insertCoin,
    	coinReturn: coinReturn,
    	resetQueue: resetQueue,
    	readTotal: readTotal,
    	displayMessage: displayMessage,
    	queueCount: queueCount,
        makePurchase: makePurchase,
        storeCoins: storeCoins,
        makeChange: makeChange,
        canGiveChange: canGiveChange
    };
}

module.exports = Machine;