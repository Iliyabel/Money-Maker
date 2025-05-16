let money_click_value = 1.0;
let assist_rate = 0;
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
assist_started = false;

let upgrades = {
    upgrade1: { 
        price: 20, effect: () => { money_click_value = 2.0; }, 
        active: false, 
        id: "upgrade1", 
        label: "Double Decker Printer", 
        tooltip: "Double decker printer to double the money from a click. [Cost: $20]",
        requiredAssist: ""},
    upgrade2: { 
        price: 50, effect: () => { assist_rate += 1.0; }, 
        active: false, 
        id: "upgrade2", 
        label: "Colored Ink", 
        tooltip: "Colored Ink -- fools more people. The 'Old Photocopier' generates twice as much per second. Requires 'Old Photocopier' to be bought. [Cost: $50]",
        requiredAssist: "assist2"},
    upgrade3: { 
        price: 100, effect: () => { money_click_value = 4.0; }, 
        active: false, 
        id: "upgrade3", 
        label: "Quad Decker Printer", 
        tooltip: "When the Double decker printer isn't enough, Quad Decker Printer doubles the money from a click once more. [Cost: $100]",
        requiredAssist: ""},
    upgrade4: { 
        price: 400, effect: () => { assist_rate += 5.0; }, 
        active: false, 
        id: "upgrade4", 
        label: "Full Light Spectrum Colored Ink", 
        tooltip: "Full Light Spectrum Colored Ink -- why limit yourself?? The 'Laser Copier' generates twice as much per second. Requires 'Laser Copier' to be bought. [Cost: $400]",
        requiredAssist: "assist3"}
};

let assists = {
    assist1: {
        price: 10,
        rate: 0.1,
        active: false,
        id: "assist1",
        label: "Auto Printer ($10)",
        tooltip: "Auto Printer: Generates $0.1 per second. Cost: $10"
    },
    assist2: {
        price: 100,
        rate: 1,
        active: false,
        id: "assist2",
        label: "Old Photocopier ($100)",
        tooltip: "Old Photocopier: The guy you bought it from found it in the trash. Generates $1 per second. Cost: $100"
    },
    assist3: {
        price: 200,
        rate: 5,
        active: false,
        id: "assist3",
        label: "Laser Copier ($200)",
        tooltip: "Laser Copier: Generates $5 per second. Cost: $200"
    },
    assist4: {
        price: 1000,
        rate: 20,
        active: false,
        id: "assist4",
        label: "Money Plants ($1000)",
        tooltip: "Money Plants: wasn't sure what else to add. Generates $20 per second. Cost: $1000"
    },
    assist5: {
        price: 5000,
        rate: 100,
        active: false,
        id: "assist5",
        label: "Money Trees ($5000)",
        tooltip: "Money Trees ain't just the perfect place for shade. Generates $100 per second. Cost: $5000"
    }
};

window.addEventListener("beforeunload", saveGame);

document.addEventListener("DOMContentLoaded", () => {
    // Load upgrades buttons
    Object.values(upgrades).forEach(upg => {
        const btn = document.getElementById(upg.id);
        if (btn) {
            btn.textContent = upg.label;
            btn.setAttribute("data-tooltip", upg.tooltip);
        }
    });

    // Load assists buttons
    Object.values(assists).forEach(ast => {
        const btn = document.getElementById(ast.id);
        if (btn) {
            btn.textContent = ast.label;
            btn.setAttribute("data-tooltip", ast.tooltip);
        }
    });

    loadGame();
});

function moneyMint() {
    let count = parseFloat(document.getElementById("money-total").textContent);
    count = count + money_click_value;
    document.getElementById("money-total").textContent = count;

    createFallingDollar();
}

function buyUpgrade(upgradeId) {
    const upgrade = upgrades[upgradeId];
    let money_total = parseFloat(document.getElementById("money-total").textContent);
    if (money_total >= upgrade.price && !upgrade.active) {

        // Check if the required assist is active
        if (upgrade.requiredAssist && !assists[upgrade.requiredAssist].active) {
            alert(`You need to buy the ${assists[upgrade.requiredAssist].label} first!`);
            return;
        }

        money_total -= upgrade.price;
        upgrade.active = true;
        updateMoneyTotal(money_total);

        document.getElementById(upgrade.id).classList.remove("not_bought");
        document.getElementById(upgrade.id).classList.add("bought");

        upgrade.effect();
        saveGame();
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
        saveGame();
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

            // Update the dollars per second display
            document.getElementById("assist-total").textContent = assist_rate.toFixed(1);
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

function saveGame() {
    const saveData = {
        money: parseFloat(document.getElementById("money-total").textContent),
        upgrades: Object.fromEntries(Object.entries(upgrades).map(([k, v]) => [k, v.active])),
        assists: Object.fromEntries(Object.entries(assists).map(([k, v]) => [k, v.active])),
    };
    localStorage.setItem("moneyPrinterSave", JSON.stringify(saveData));
}

function loadGame() {
    const saveData = JSON.parse(localStorage.getItem("moneyPrinterSave"));
    if (!saveData) return;

    // Restore money
    updateMoneyTotal(saveData.money);

    // Restore upgrades
    Object.entries(saveData.upgrades).forEach(([k, active]) => {
        if (upgrades[k]) {
            upgrades[k].active = active;
            const btn = document.getElementById(upgrades[k].id);
            if (active && btn) {
                btn.classList.remove("not_bought");
                btn.classList.add("bought");
                upgrades[k].effect();
            }
        }
    });

    // Restore assists and recalculate assist_rate
    assist_rate = 0;
    Object.entries(saveData.assists).forEach(([k, active]) => {
        if (assists[k]) {
            assists[k].active = active;
            const btn = document.getElementById(assists[k].id);
            if (active && btn) {
                btn.classList.remove("not_bought");
                btn.classList.add("bought");
                assist_rate += assists[k].rate;
            }
        }
    });

    // Re-apply upgrade effects
    Object.entries(saveData.upgrades).forEach(([k, active]) => {
        if (upgrades[k] && active) {
            upgrades[k].effect();
        }
    });

    // Update dollars per second display
    document.getElementById("assist-total").textContent = assist_rate.toFixed(1);

    // If any assist is active, start the interval
    if (assist_rate > 0) {
        assist_started = true;
        addAssist();
    }
}