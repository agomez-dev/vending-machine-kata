/* For a better user experience, the machine should, in the case that not enough money
is inserted to purchase a selected item, prioritze telling the customer that the item is sold out. */

function Machine(Nickels, Dimes, Quarters)
{
    var storedCoins = {};

    storedCoins["Nickel"] = Nickels;
    storedCoins["Dime"] = Dimes;
    storedCoins["Quarter"] = Quarters;

    this.Money = storedCoins["Nickel"] * 5 + storedCoins["Dime"] * 10 + storedCoins["Quarter"]* 25;

    var notEnoughMoneyString = "PRICE";
    var notEnoughItemString = "SOLD OUT";
    var successString = "THANK YOU";
    var defaultString = "INSERT COINS";
    var notEnoughChangeString = "EXACT CHANGE ONLY";

    var coinQueue = {};
    var coinMap = {};

    resetQueue();

    var nickelWeight = 5;
	var nickelSize = 0.835;
    var nickelVal = 5;

	var dimeWeight = 2.268;
	var dimeSize = 0.705;
    var dimeVal = 10;

	var quarterWeight = 5.670;
	var quarterSize = 0.955;
    var quarterVal = 25;

    coinMap[nickelWeight] = "Nickel";
	coinMap[nickelSize] = "Nickel";
    coinMap[nickelVal] = "Nickel";

	coinMap[dimeWeight] = "Dime";
	coinMap[dimeSize] = "Dime";
    coinMap[dimeVal] = "Dime";

	coinMap[quarterWeight] = "Quarter";
	coinMap[quarterSize] = "Quarter";
    coinMap[quarterVal] = "Quarter";

    

    function insertCoin(Coin){

    	if(coinMap[String(Coin.weight)] ==  coinMap[String(Coin.size)] && coinMap[String(Coin.size)] != undefined){
    		coinQueue[Coin.name] += 1;
    		coinQueue["Total"] += Coin.value;
    	} else{
            $("textarea#CoinReturn").val(JSON.stringify(Coin.name));
        }

    }

    function coinReturn(){
        $("textarea#CoinReturn").val(JSON.stringify(coinQueue));
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

    function displayMessage(Message){
    	if(coinQueue["Total"] == 0 && !exactChangeOnly())
            return String("INSERT COINS");
        else {
            if(coinQueue["Total"] == 0 && exactChangeOnly())
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

/*Some of this following code could be extracted into a helper method. There's
a lot of repetition here */

    function makePurchase(Item){

        var change;
        switch(Item){
            case 0:
                if(Inventory.colaCount() <= 0){
                    return notEnoughItemString;
                }
                if(coinQueue["Total"] < Inventory.colaCost()){
                    return notEnoughMoneyString;
                } else{
                    if (Inventory.purchase(Item)){
                        storeCoins();
                        change = checkChange(calcChangeNeeded(Inventory.colaCost()));
                        resetQueue();
                        $("textarea#CoinReturn").val(JSON.stringify(coinQueue));
                        return successString;
                    }
                }
            break;
            case 1:
                if(Inventory.chipsCount() <= 0){
                    return notEnoughItemString;
                }
                if(coinQueue["Total"] < Inventory.chipsCost()){
                    return notEnoughMoneyString;
                } else{
                    if (Inventory.purchase(Item)){
                        storeCoins();
                        change = checkChange(calcChangeNeeded(Inventory.colaCost()));
                        resetQueue();
                        $("textarea#CoinReturn").val(JSON.stringify(change));
                        return successString;
                        
                    }
                }
                
            break;
            case 2:
                if(Inventory.candyCount() <= 0){
                    return notEnoughItemString;
                }
                if(coinQueue["Total"] < Inventory.candyCost()){
                    return notEnoughMoneyString;
                } else{
                    if (Inventory.purchase(Item)){
                        storeCoins();
                        change = checkChange(calcChangeNeeded(Inventory.colaCost()));
                        resetQueue();
                        $("textarea#CoinReturn").val(JSON.stringify(change));
                        return successString;
                    }
                }
            break;
            default:
            break;
        }
    }

    function calcChangeNeeded(ItemCost){
        return coinQueue["Total"] - ItemCost;
    }

    function checkChange(changeNeeded){

        var denominationOrderArray =  [[ 25, 10, 5 ],
                                      [ 25, 5, 10 ],
                                      [ 10, 25, 5 ],
                                      [ 10, 5, 25 ],
                                      [ 5, 25, 10 ],
                                      [ 5, 10, 25 ]];
        var result;
        var translatedResult;

        for(var i = 0; i < 6; i++){

            result = makeChange(changeNeeded, denominationOrderArray[i]);
            if(result){
                return result;
            }
        }
        return false;
    }

/* Brute forcing this, because I don't want to spend too much time on this and there are only 
six possible combinations */
    function makeChange(changeNeeded, denominationOrder){
        
        var temp;
        var results = {};

/* Some of this could go into a helper function */

        temp = Math.floor(changeNeeded/denominationOrder[0]);

        if(storedCoins[coinMap[denominationOrder[0]]] < temp){
            return false;
        } else{
            results[coinMap[denominationOrder[0]]] = temp;
            changeNeeded -= temp * denominationOrder[0];
        }

        if(changeNeeded <= 0){
            return results;
        } 

        temp = Math.floor(changeNeeded/denominationOrder[1]);

        if(storedCoins[coinMap[denominationOrder[1]]] < temp){
            return false;
        } else{
            results[coinMap[denominationOrder[1]]] = temp;
            changeNeeded -= temp * denominationOrder[1];
        }

        if(changeNeeded <= 0){
            return results;
        } 

        temp = Math.floor(changeNeeded/denominationOrder[2]);

        if(storedCoins[coinMap[denominationOrder[2]]] < temp){
            return false;
        } else{
            results[coinMap[denominationOrder[2]]] = temp;
            changeNeeded -= temp * denominationOrder[2];
        }

/*More of a sanity check than anything else */
        if(changeNeeded <= 0){
            return results;
        } else{
            return false;
        }
    }

    function storeCoins(){

        storedCoins["Nickel"] += coinQueue["Nickel"];
        storedCoins["Dime"] += coinQueue["Dime"];
        storedCoins["Quarter"] += coinQueue["Quarter"];
    }

    function exactChangeOnly(){
        if(checkChange(100) && checkChange(65) && checkChange(50))
            return false;
        else
            return true;
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
        checkChange: checkChange,
        exactChangeOnly: exactChangeOnly
    };
}

module.exports = Machine;