let money_click_value = 1;

function moneyMint() {
    let count = parseInt(document.getElementById("money-total").textContent);
    count = count + money_click_value;
    document.getElementById("money-total").textContent = count;
}

function penUpgrade1() {
    let count = parseInt(document.getElementById("money-total").textContent);
    if (count >= 10) {
        count = count - 10;
        document.getElementById("money-total").textContent = count;
        document.getElementById("pen-upgrade-1").style.display = "none";
        document.getElementById("pen-upgrade-2").style.display = "block";
        money_click_value = 2;
    }
}

function penUpgrade2() {
    money_click_value = 4;
}