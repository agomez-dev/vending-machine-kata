/* For the purposes of this project, we assume that the inventory is static, but can be initialized at will
by passing the desired amount of each as parameters */

function Inventory(Cola, Chips, Candy)
{
    var List = new Array(3);
    var Purchase = {Item: "", Cost: ""};

    for(var i = 0; i < 3; i++) {
        List[i] = new Array(2);
    }

    List[0][1] = 1;
    List[1][1] = 0.50;
    List[2][1] = 0.65;

    List[0][0] = Cola;
    List[1][0] = Chips;
    List[2][0] = Candy;

    function purchase(Item) {

        if(List[Item][0] > 0){
            List[Item][0] -= 1;
        }
        else
        {
        return Purchase = {Item: "SOLD OUT", Cost: 0};
        }

        switch(Item) {
    case 0:
        Purchase = {Item: "Cola", Cost: List[Item][1]};
        return Purchase;
    case 1:
        Purchase = {Item: "Chips", Cost: List[Item][1]};
        return Purchase;
    case 2:
        Purchase = {Item: "Candy", Cost: List[Item][1]};
        return Purchase;
    default:
        break;
       }
    }

    function colaCount(){
        return List[0][0];
    }

    function chipsCount(){
        return List[1][0];

    }

    function candyCount(){
        return List[2][0];
    }
    return{
    	purchase: purchase,
        chipsCount: chipsCount,
        candyCount: candyCount,
        colaCount: colaCount
    };
}

module.exports = Inventory;