/* For the purposes of this project, we assume that the inventory is static, but can be initialized at will
by passing the desired amount of each as parameters */

/* I feel like my implementation lends itself more naturally to an Item object than an Inventory object, but
I'm just going to leave it this way for now */

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
        else{
            return false;
        }
    }

    function colaCount(){
        return List[0];
    }

    function colaCost(){
        return 100;
    }

    function chipsCount(){
        return List[1];

    }

    function chipsCost(){
        return 50;
    }

    function candyCount(){
        return List[2];
    }

    function candyCost(){
        return 65;
    }


    return{
    	purchase: purchase,
        chipsCount: chipsCount,
        candyCount: candyCount,
        colaCount: colaCount,
        colaCost: colaCost,
        candyCost: candyCost,
        chipsCost: chipsCost
    };
}

module.exports = Inventory;