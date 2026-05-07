let state = {
    day: 1,
    energy: 100,
    oxygen: 100,
    morale: 100,
    alive: true
};

let inventory = [];


const story = [
    "День 1. Ви прокинулись на Марсі...",
    "База виглядає покинутою...",
    "Системи працюють нестабільно...",
    "Зв'язок із Землею втрачено..."
];


function gameLoop() {
    if (!state.alive) return;

    state.day++;

    
    state.energy -= rand(2, 6);
    state.oxygen -= rand(3, 7);
    state.morale -= rand(1, 4);

    randomEvent();

    update();
}


setInterval(gameLoop, 5000);


function randomEvent() {
    let r = Math.random();

    if (r < 0.3) {
        addText("️ Пилова буря!");
        state.energy -= 10;
    } 
    else if (r < 0.6) {
        addText(" Отримано сигнал...");
        state.morale += 5;
    } 
    else {
        addText(" Ви автоматично ремонтуєте систему");
        state.energy += 5;
    }
}


function explore() {
    let items = [" батарея", " їжа", " зразок"];
    let item = items[rand(0, items.length - 1)];

    inventory.push(item);

    state.energy -= 10;
    state.oxygen -= 5;

    addText("Ви знайшли: " + item);
    update();
}

function rest() {
    state.energy += 15;
    state.morale += 5;
    state.oxygen -= 5;

    addText("Ви відпочили");
    update();
}


function addText(text) {
    let el = document.getElementById("storyText");
    el.innerHTML = text;
}


function update() {
    document.getElementById("stats").innerHTML =
        ` День: ${state.day}<br>
          Енергія: ${state.energy}<br>
          Кисень: ${state.oxygen}<br>
          Мораль: ${state.morale}<br>
          ${inventory.join(", ")}`;

    checkGameOver();
    updateBackground();
}


function checkGameOver() {
    if (state.oxygen <= 0) {
        endGame(" Ви задихнулись");
    }
    if (state.energy <= 0) {
        endGame(" База без енергії");
    }
}

function endGame(text) {
    state.alive = false;
    addText(text);
}


function updateBackground() {
    if (state.day % 2 === 0) {
        document.body.style.background = "black";
    } else {
        document.body.style.background = "darkred";
    }
}


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


update();
addText(" Система запущена...");
