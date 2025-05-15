let money_click_value = 1.0;
let assist_rate = 0;
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
assist_started = false;

let upgrades = {
    upgrade1: { 
        price: 10, effect: () => { money_click_value = 2.0; }, 
        active: false, 
        id: "upgrade1", 
        label: "Double Decker Printer", 
        tooltip: "Upgrade to a Double Decker Printer to double your earnings. Cost: $10" },
    upgrade2: { 
        price: 50, effect: () => { assist_rate += 1.0; }, 
        active: false, 
        id: "upgrade2", 
        label: "Colored Ink", 
        tooltip: "Colored Ink: Generates $1 per second. Cost: $50" },
    upgrade3: { 
        price: 10, effect: () => { money_click_value = 4.0; }, 
        active: false, 
        id: "upgrade3", 
        label: "Quad Decker Printer", 
        tooltip: "Upgrade to a Quad Decker Printer to quadruple your earnings. Cost: $10" },
    upgrade4: { 
        price: 200, effect: () => { assist_rate += 5.0; }, 
        active: false, 
        id: "upgrade4", 
        label: "Full Light Spectrum Colored Ink", 
        tooltip: "Full Light Spectrum Colored Ink: Generates $5 per second. Cost: $200" },
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
        price: 50,
        rate: 1,
        active: false,
        id: "assist2",
        label: "Old Photocopier ($50)",
        tooltip: "Old Photocopier: Generates $1 per second. Cost: $50"
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
        tooltip: "Money Plants: Generates $20 per second. Cost: $1000"
    },
    assist5: {
        price: 5000,
        rate: 100,
        active: false,
        id: "assist5",
        label: "Money Trees ($5000)",
        tooltip: "Money Trees: Generates $100 per second. Cost: $5000"
    }
};

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
});

function moneyMint() {
    let count = parseFloat(document.getElementById("money-total").textContent);
    count = count + money_click_value;
    document.getElementById("money-total").textContent = count;

    createFallingDollar();
}

function double_printer_upgrade() {
    let count = parseFloat(document.getElementById("money-total").textContent);
    if (count >= 10 && !document.getElementById("double-decker-printer-upgrade").classList.contains("bought")) {
        count = count - 10;
        document.getElementById("money-total").textContent = count;
        document.getElementById("double-decker-printer-upgrade").classList.remove("not_bought");
        document.getElementById("double-decker-printer-upgrade").classList.add("bought");
        money_click_value = 2.0;
    }
}

function quad_printer_upgrade() {
    let count = parseFloat(document.getElementById("money-total").textContent);
    if (count >= 10 && !document.getElementById("quad-decker-printer-upgrade").classList.contains("bought")) {
        count = count - 10;
        document.getElementById("money-total").textContent = count;
        document.getElementById("quad-decker-printer-upgrade").classList.remove("not_bought");
        document.getElementById("quad-decker-printer-upgrade").classList.add("bought");
        money_click_value = 4.0;
    }
}

function buyUpgrade(upgradeId) {
    const upgrade = upgrades[upgradeId];
    let money_total = parseFloat(document.getElementById("money-total").textContent);
    if (money_total >= upgrade.price && !upgrade.active) {
        money_total -= upgrade.price;
        upgrade.active = true;
        updateMoneyTotal(money_total);

        document.getElementById(upgrade.id).classList.remove("not_bought");
        document.getElementById(upgrade.id).classList.add("bought");

        upgrade.effect();
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