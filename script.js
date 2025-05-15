let money_click_value = 1.0;
let assist_rate = 0;
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
assist_started = false;

let assists = {
    pen: { price: 10, rate: 0.1, active: false, id: "pen-assist" },
    printAndPress: { price: 50, rate: 1, active: false, id: "print-assist" },
    printer: { price: 200, rate: 5, active: false, id: "printer-assist" },
    moneyTree: { price: 1000, rate: 20, active: false, id: "tree-assist" },
    farm: { price: 5000, rate: 100, active: false, id: "farm-assist" },
};



function moneyMint() {
    let count = parseFloat(document.getElementById("money-total").textContent);
    count = count + money_click_value;
    document.getElementById("money-total").textContent = count;

    createFallingDollar();
}

function penUpgrade1() {
    let count = parseFloat(document.getElementById("money-total").textContent);
    if (count >= 10 && !document.getElementById("pen-upgrade-1").classList.contains("bought")) {
        count = count - 10;
        document.getElementById("money-total").textContent = count;
        document.getElementById("pen-upgrade-1").classList.remove("not_bought");
        document.getElementById("pen-upgrade-1").classList.add("bought");
        money_click_value = 2.0;
    }
}

function penUpgrade2() {
    let count = parseFloat(document.getElementById("money-total").textContent);
    if (count >= 10 && !document.getElementById("pen-upgrade-2").classList.contains("bought")) {
        count = count - 10;
        document.getElementById("money-total").textContent = count;
        document.getElementById("pen-upgrade-2").classList.remove("not_bought");
        document.getElementById("pen-upgrade-2").classList.add("bought");
        money_click_value = 4.0;
    }
}

function buyAssist(assistId) {
    const assist = assists[assistId];
    let money_total = parseFloat(document.getElementById("money-total").textContent);
    if (money_total >= assist.price && !assist.active) {
        money_total -= assist.price;
        assist.active = true;
        updateMoneyTotal(money_total);

        assist_rate += assist.rate;
        document.getElementById(assist.id).classList.remove("not_bought");
        document.getElementById(assist.id).classList.add("bought");
    }

    if (assist_started === false) {
        assist_started = true;
        addAssist();
    }
}

function updateMoneyTotal(money_total) {
    document.getElementById("money-total").textContent = money_total.toFixed(1);
}

function addAssist() {
    setInterval(() => {
            money_total = parseFloat(document.getElementById("money-total").textContent);
            money_total += assist_rate;
            updateMoneyTotal(money_total);
        }, 1000); 
}

function createFallingDollar() {
    const moneyClicker = document.querySelector('.money-clicker');
    const dollar = document.createElement('div');
    dollar.classList.add('falling-dollar');

    // Randomize the starting position
    dollar.style.left = Math.floor(Math.random() * (vw * (2/3) - 100) - (vw * (1/3) + 100)) + 'px';
    dollar.style.top = '0px';

    // Append the dollar to the money-clicker section
    moneyClicker.appendChild(dollar);

    setTimeout(() => {
        dollar.remove();
    }, 2500); // Wait for 2.5 seconds before removing the dollar
}