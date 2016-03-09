function Coin(coinValue)
{
    switch(coinValue) {
    case 1:
        this.weight = 2.5;
        this.size = 0.750;
        this.name = "Penny";
        this.value = coinValue;
        break;
    case 5:
        this.weight = 5;
        this.size = 0.835;
        this.name = "Nickel";
        this.value = coinValue;
        break;
    case 10:
        this.weight = 2.268;
        this.size = 0.705;
        this.name = "Dime";
        this.value = coinValue;
        break;
    case 25:
        this.weight = 5.670;
        this.size = 0.955;
        this.name = "Quarter";
        this.value = coinValue;
        break;
    default:
        return null;
       }
}

module.exports = Coin;