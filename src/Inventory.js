/* For the purposes of this project, we assume that the inventory is static, but can be initialized at will
by passing the desired amount of each as parameters */

function Inventory(Cola, Chips, Candy)
{
    var List = new Array(3);

    List[0] = Cola;
    List[1] = Chips;
    List[2] = Candy;

    function purchase(Item) {

        if(List[Item] > 0){
            List[Item] -= 1;
            return true;
        }
        else
        {
        return false;
        }
    }

    function colaCount(){
        return List[0];
    }

    function chipsCount(){
        return List[1];

    }

    function candyCount(){
        return List[2];
    }
    return{
    	purchase: purchase,
        chipsCount: chipsCount,
        candyCount: candyCount,
        colaCount: colaCount
    };
}

module.exports = Inventory;