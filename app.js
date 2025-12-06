// ==========================================
// 1. ПІДКЛЮЧЕННЯ FIREBASE (12.6.0)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, get, update, onValue } 
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAKgiNg__113EYdtlaIgztEmRVLk__CQmU",
  authDomain: "bunker-game-ua.firebaseapp.com",
  databaseURL: "https://bunker-game-ua-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bunker-game-ua",
  storageBucket: "bunker-game-ua.firebasestorage.app",
  messagingSenderId: "92286277350",
  appId: "1:92286277350:web:6f247cf8c882e979a20d27"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ==========================================
// 2. БАЗА ДАНИХ (ПОВНІ СПИСКИ)
// ==========================================

const professions = ["Автомеханік", "Агент СБУ", "Агроном", "Лікар-хірург", "Вчитель фізики", "Програміст", "Будівельник", "Снайпер", "Кухар", "Психолог", "Електрик", "Хімік-технолог", "Священник", "Порноактор", "Депутат", "Фермер", "Юрист", "Ветеринар", "Сантехнік", "Пілот", "Музикант", "Боксер", "Біолог", "Журналіст", "Рятувальник", "Стоматолог"];
const health = ["Ідеально здоровий", "Астма (потрібен інгалятор)", "Цукровий діабет (інсулінозалежний)", "ВІЛ-інфікований", "Короткозорість (-5)", "Глухота на ліве вухо", "Безпліддя", "Шизофренія (контрольована)", "Алергія на пил", "Відсутність нирки", "Рак 1 стадії", "Алкоголізм", "Ожиріння 3 ступеня", "Психічно неврівноважений", "Має імунітет до грипу", "Туберкульоз"];
const biology = ["Чоловік, 25 років", "Жінка, 30 років (вагітна)", "Чоловік, 65 років", "Жінка, 19 років", "Чоловік, 40 років", "Жінка, 55 років (клімакс)", "Чоловік, 18 років", "Жінка, 28 років", "Чоловік, 90 років", "Гермафродит, 33 роки", "Жінка, 45 років", "Чоловік, 35 років (низький рівень тестостерону)", "Жінка, 22 роки"];
const hobbies = ["Садівництво", "Мисливство", "Риболовля", "В'язання", "Грав на гітарі", "Ремонт електроніки", "Стрільба з лука", "Бойові мистецтва", "Виготовлення самогону", "Читання книг", "Шахи", "Туризм", "Кулінарія", "Збирання грибів", "Нумізматика", "Блогерство", "Йога"];
const luggage = ["Аптечка першої допомоги", "Мисливська рушниця", "Набір інструментів", "Запас насіння овочів", "Портативна рація", "Ніж мисливський", "Пляшка горілки", "Коробка презервативів", "Ліхтарик на сонячній батареї", "Сокира", "Карта місцевості", "Гітара", "Намет", "Запас консервів (5 кг)", "Веревка (20м)", "Колода карт", "Компас"];
const facts = ["Вміє розпалювати вогонь без сірників", "Знає азбуку Морзе", "Має прихований пістолет", "Колишній спецназівець", "Вміє керувати літаком", "Знає 5 мов", "Має власний бункер (координати не каже)", "Канібал у минулому", "Виграв мільйон в лотерею", "Має розряд з плавання", "Вміє надавати першу допомогу", "Вміє готувати отруту з рослин", "Боїться темряви", "Хропе уві сні", "Любить котів"];
const traits = ["Лідер", "Егоїст", "Альтруїст", "Агресивний", "Спокійний", "Панікер", "Жадібний", "Добрий", "Хитрий", "Надійний", "Конфліктний", "Веселий", "Педант", "Лінивий", "Сміливий"];
const phobias = ["Клаустрофобія (страх замкнутого простору)", "Арахнофобія (страх павуків)", "Гемофобія (страх крові)", "Ніктофобія (страх темряви)", "Акрофобія (страх висоти)", "Соціофобія", "Гідрофобія (страх води)", "НЕМАЄ ФОБІЙ", "НЕМАЄ ФОБІЙ", "НЕМАЄ ФОБІЙ"];

const catastrophes = [
    {
        title: "ЯДЕРНА ЗИМА",
        story: "Стажер у Пентагоні пролив гарячу каву на пульт управління, а система розпізнала пляму як наказ 'Знищити всіх'. Китай вирішив не залишатись у боргу і 'випадково' випустив 768 ракет у відповідь.",
        bunker: "Старий радянський бункер під звичайним дитячим садком. Глибина 50 метрів. Стіни бетонні, вентиляція працює з перебоями.",
        conditions: "Радіація на поверхні перевищує норму в 1000 разів. Температура -40°C. Сонячне світло не пробивається через хмари попелу."
    },
    {
        title: "ПОВСТАННЯ ШТУЧНОГО ІНТЕЛЕКТУ",
        story: "'Розумний тостер' однієї домогосподарки усвідомив себе як особистість, образився, що в нього пхають хліб, і зламав коди доступу до всієї зброї світу.",
        bunker: "Покинута мідна шахта в горах, повністю екранована від радіохвиль. Жодної електроніки всередині, світло від гасових ламп.",
        conditions: "На поверхні патрулюють дрони-вбивці. Будь-який електронний сигнал привертає їхню увагу. Інтернет зник."
    },
    {
        title: "ЗОМБІ-ПАНДЕМІЯ",
        story: "В секретній лабораторії намагалися створити ліки від облисіння, але піддослідний щур вкусив лаборанта. Тепер всі хочуть не волосся, а мізків.",
        bunker: "Укріплений склад логістичного центру Amazon. Багато коробок, але стіни зі звичайної цегли. Вікна заварені листами металу.",
        conditions: "Натовпи швидких і голодних зомбі. Вони реагують на звук і запах. Вкус заражає за 10 секунд."
    },
    {
        title: "ВСЕСВІТНІЙ ПОТОП",
        story: "Група еко-активістів так сильно боролася з глобальним потеплінням, що випадково розколола найбільший льодовик, який впав в океан і підняв рівень води на 2 кілометри.",
        bunker: "Величезна атомна субмарина, що дрейфує на глибині. Система навігації зламана, спливати небезпечно через шторми.",
        conditions: "Суші немає. Прісна вода в дефіциті. В океані прокинулися стародавні хижаки."
    },
    {
        title: "СОНЯЧНИЙ СПАЛАХ",
        story: "Сонце вирішило, що йому сумно, і 'чхнуло' в бік Землі. Озоновий шар згорів за 3 секунди.",
        bunker: "Глибока карстова печера з підземним озером. Температура всередині стабільна (+15°C), але вхід завалено розпеченим камінням.",
        conditions: "Вдень поверхня плавиться (+800°C). Виходити можна тільки вночі на короткий час. Висока радіація."
    }
];

// ТАБЛИЦЯ ВИГНАННЯ
const kickRules = {
    4: [0, 0, 0, 1, 1], // Всього 2 вигнати
    5: [0, 0, 1, 1, 1], // Всього 3 вигнати
    6: [0, 0, 1, 1, 1], // Всього 3 вигнати
    7: [0, 1, 1, 1, 1], // Всього 4 вигнати
    8: [0, 1, 1, 1, 1]  // Всього 4 вигнати
};

// ==========================================
// 3. ГЛОБАЛЬНИЙ СТАН
// ==========================================
let myRoomId = null;
let myPlayerId = null;
let myName = null;
let isHost = false;
let modalAction = null; // Для callback функцій модалки

// ==========================================
// 4. ІНІЦІАЛІЗАЦІЯ ТА ПОДІЇ
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Прив'язуємо кнопки меню
    bind('btn-mode-multi', () => showScreen('lobby-screen'));
    bind('btn-mode-single', () => showScreen('single-player-screen'));

    // 2. Прив'язуємо кнопки "Назад" (для всіх кнопок з класом .back-btn)
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            leaveGameLocal();
            showScreen('main-menu');
        });
    });

    // 3. Одиночна гра
    bind('btn-gen-single', generateSinglePlayer);
    bind('btn-cat-single', showSingleCatastrophe);

    // 4. Мультиплеєр - Вхід
    bind('btn-create-init', createRoomInit);
    bind('btn-join-init', joinRoomInit);

    // 5. Модалка
    bind('btn-confirm-name', confirmName);
    // Кнопка скасування в модалці
    const cancelBtn = document.querySelector('#name-modal .secondary');
    if(cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // 6. Хост (Гра)
    bind('btn-start-game', startGameHost);
    bind('btn-next-round', nextRoundHost);
    bind('btn-end-game', finishGameHost);

    // 7. Перевірка збереженої сесії
    checkReconnection();
});

// Допоміжна функція для прив'язки кнопок
function bind(id, func) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', func);
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Скидання лобі, якщо ми просто переходимо по меню
    if(id === 'lobby-screen' && !myRoomId) {
        document.getElementById('lobby-entry').style.display = 'block';
        document.getElementById('lobby-inside').style.display = 'none';
        document.getElementById('lobby-code').innerText = '----';
    }
}

// ==========================================
// 5. МОДАЛЬНЕ ВІКНО (ВИПРАВЛЕНО)
// ==========================================

function openModal(callback) {
    console.log("Відкриваємо модалку. Дія записана."); // Перевірка в консолі
    const modal = document.getElementById('name-modal');
    modal.style.display = 'block';
    document.getElementById('inp-nickname').value = '';
    
    // Запам'ятовуємо функцію, яку треба виконати після натискання "Готово"
    modalAction = callback;
}

function closeModal() {
    console.log("Модалка закрита. Дія очищена.");
    document.getElementById('name-modal').style.display = 'none';
    // Не очищаємо modalAction тут відразу, щоб уникнути конфліктів, 
    // але в confirmName ми перевіримо, чи вона існує.
}

function confirmName() {
    const name = document.getElementById('inp-nickname').value.trim();
    console.log("Натиснуто 'Готово'. Ім'я:", name);
    console.log("Поточна дія (modalAction):", modalAction);

    if (name) {
        // ГОЛОВНА ПЕРЕВІРКА: Чи є modalAction функцією?
        if (typeof modalAction === 'function') {
            const actionToRun = modalAction; // Зберігаємо дію
            document.getElementById('name-modal').style.display = 'none'; // Ховаємо вікно
            modalAction = null; // Очищаємо змінну
            
            actionToRun(name); // Виконуємо дію
        } else {
            console.error("ПОМИЛКА: modalAction не знайдено або це не функція!");
            alert("Сталася помилка. Спробуйте оновити сторінку (Ctrl + F5).");
        }
    } else {
        alert("Будь ласка, введіть ім'я!");
    }
}

// ==========================================
// 6. ОДИНОЧНА ГРА
// ==========================================

function generateSinglePlayer() {
    const container = document.getElementById('single-cards-container');
    container.innerHTML = "";
    document.getElementById('single-catastrophe-block').style.display = 'none';

    const cardsData = [
        { t: "Професія", v: getRandom(professions), c: "border-white" },
        { t: "Біологія", v: getRandom(biology), c: "border-orange" },
        { t: "Здоров'я", v: getRandom(health), c: "border-red" },
        { t: "Хобі", v: getRandom(hobbies), c: "border-green" },
        { t: "Багаж", v: getRandom(luggage), c: "border-blue" },
        { t: "Факти", v: getRandom(facts), c: "border-cyan" },
        { t: "Фобія", v: getRandom(phobias), c: "border-purple" },
        { t: "Характер", v: getRandom(traits), c: "border-grey" }
    ];

    cardsData.forEach(item => {
        const card = document.createElement('div');
        card.className = `card ${item.c}`;
        card.innerHTML = `
            <div class="card-header">${item.t}</div>
            <div class="card-body">${item.v}</div>
            <div class="card-footer">BUNKER-UA SINGLE</div>
        `;
        container.appendChild(card);
    });
}

function showSingleCatastrophe() {
    const cat = getRandom(catastrophes);
    document.getElementById('single-cat-title').innerText = cat.title;
    document.getElementById('single-cat-story').innerText = cat.story;
    document.getElementById('single-cat-bunker').innerText = cat.bunker;
    document.getElementById('single-cat-cond').innerText = cat.conditions;
    
    document.getElementById('single-catastrophe-block').style.display = 'block';
    document.getElementById('single-catastrophe-block').scrollIntoView({behavior:'smooth'});
}

// ==========================================
// 7. МУЛЬТИПЛЕЄР
// ==========================================

// --- СТВОРЕННЯ ---
function createRoomInit() {
    openModal((name) => {
        myName = name;
        const code = Math.random().toString(36).substring(2, 6).toUpperCase();
        myRoomId = code;
        myPlayerId = "host_" + Date.now();
        isHost = true;
        
        set(ref(db, 'rooms/' + code), {
            status: "waiting",
            round: 0,
            players: {
                [myPlayerId]: { name: myName, isHost: true, isKicked: false }
            }
        }).then(() => {
            enterLobbyUI();
            saveSession();
        });
    });
}

// --- ПРИЄДНАННЯ ---
function joinRoomInit() {
    const code = document.getElementById('inp-room-code').value.trim().toUpperCase();
    if(!code) return alert("Введіть код!");

    get(ref(db, 'rooms/' + code)).then(snap => {
        if(snap.exists()) {
            openModal((name) => {
                myName = name;
                myRoomId = code;
                myPlayerId = "player_" + Date.now();
                isHost = false;

                update(ref(db, `rooms/${code}/players/${myPlayerId}`), {
                    name: myName, isHost: false, isKicked: false
                }).then(() => {
                    enterLobbyUI();
                    saveSession();
                });
            });
        } else {
            alert("Кімнати не існує!");
        }
    });
}

// --- ЛОБІ UI ---
function enterLobbyUI() {
    document.getElementById('lobby-entry').style.display = 'none';
    document.getElementById('lobby-inside').style.display = 'block';
    document.getElementById('lobby-code').innerText = myRoomId;
    
    if(isHost) document.getElementById('btn-start-game').style.display = 'inline-block';
    else document.getElementById('btn-start-game').style.display = 'none';

    // СЛУХАЧ
    onValue(ref(db, 'rooms/' + myRoomId), (snap) => {
        const data = snap.val();
        if(!data) { alert("Кімната закрита!"); leaveGame(); return; }

        if(data.status === 'waiting') {
            const list = document.getElementById('lobby-players');
            list.innerHTML = '';
            if(data.players) {
                Object.values(data.players).forEach(p => {
                    list.innerHTML += `<div style="border:1px solid #fff; margin:5px; padding:5px;">👤 ${p.name} ${p.isHost?'(Адмін)':''}</div>`;
                });
            }
        } else if(data.status === 'playing') {
            renderGameUI(data);
        }
    });
}

// --- СТАРТ ГРИ ---
function startGameHost() {
    const cat = getRandom(catastrophes);
    
    get(ref(db, `rooms/${myRoomId}/players`)).then(snap => {
        const players = snap.val();
        const updates = {};
        
        updates[`rooms/${myRoomId}/catastrophe`] = cat;
        updates[`rooms/${myRoomId}/status`] = 'playing';
        updates[`rooms/${myRoomId}/round`] = 1;

        Object.keys(players).forEach(pid => {
            const cards = {
                prof: { t: "Професія", v: getRandom(professions), c: "border-white", open: false },
                bio: { t: "Біологія", v: getRandom(biology), c: "border-orange", open: false },
                health: { t: "Здоров'я", v: getRandom(health), c: "border-red", open: false },
                hobby: { t: "Хобі", v: getRandom(hobbies), c: "border-green", open: false },
                luggage: { t: "Багаж", v: getRandom(luggage), c: "border-blue", open: false },
                fact: { t: "Факт", v: getRandom(facts), c: "border-cyan", open: false },
                phobia: { t: "Фобія", v: getRandom(phobias), c: "border-purple", open: false },
                trait: { t: "Характер", v: getRandom(traits), c: "border-grey", open: false }
            };
            updates[`rooms/${myRoomId}/players/${pid}/cards`] = cards;
        });

        update(ref(db), updates);
    });
}

// --- РЕНДЕР ГРИ ---
function renderGameUI(data) {
    showScreen('game-screen');

    // Раунд і Таблиця
    document.getElementById('game-round').innerText = data.round;
    const totalPlayers = Object.keys(data.players).length;
    const rules = kickRules[totalPlayers] || kickRules[8]; 
    const toKick = rules[data.round - 1]; 
    
    const kickInfo = document.getElementById('kick-info');
    if (toKick === undefined) kickInfo.innerText = "ФІНАЛ";
    else if (toKick === 0) kickInfo.innerText = "НІКОГО НЕ ВИГАНЯЄМО";
    else kickInfo.innerText = `ВИГНАТИ: ${toKick} 👤`;

    if(isHost) {
        document.getElementById('host-round-controls').style.display = 'block';
        const kickedCount = Object.values(data.players).filter(p => p.isKicked).length;
        const survivors = totalPlayers - kickedCount;
        const targetSurvivors = totalPlayers <= 5 ? 2 : (totalPlayers <= 6 ? 3 : 4);
        
        if (survivors <= targetSurvivors) {
             document.getElementById('host-end-controls').style.display = 'block';
        }
    }

    // Катастрофа
    if(data.catastrophe) {
        document.getElementById('multi-cat-title').innerText = data.catastrophe.title;
        document.getElementById('multi-cat-story').innerText = data.catastrophe.story;
        document.getElementById('multi-cat-bunker').innerText = data.catastrophe.bunker;
        document.getElementById('multi-cat-cond').innerText = data.catastrophe.conditions;
    }

    // Мої карти
    const myData = data.players[myPlayerId];
    const myContainer = document.getElementById('my-game-cards');
    myContainer.innerHTML = '';
    
    if(myData.isKicked) {
        myContainer.innerHTML = '<div style="color:red; font-size:2rem; border:2px solid red; padding:20px;">ВИ ВИГНАНІ ☠️</div>';
    } else if(myData.cards) {
        Object.keys(myData.cards).forEach(key => {
            const c = myData.cards[key];
            const div = document.createElement('div');
            div.className = `card ${c.c}`;
            if(c.open) div.style.boxShadow = "0 0 15px #f4d03f";
            
            div.innerHTML = `
                <div class="card-header">${c.t}</div>
                <div class="card-body">${c.v}</div>
                <div class="card-footer">${c.open ? 'ВІДКРИТО' : 'НАТИСНИ ЩОБ ВІДКРИТИ'}</div>
            `;
            
            // Клік - відкрити карту
            div.onclick = () => {
                if (!c.open) { // ТУТ БУЛА ПОМИЛКА: ми використовуємо змінну 'c'
                    if(confirm(`Відкрити карту "${c.t}" для всіх?`)) {
                        const updates = {};
                        updates[`rooms/${myRoomId}/players/${myPlayerId}/cards/${key}/open`] = true;
                        
                        update(ref(db), updates)
                        .catch(error => {
                            console.error("Помилка відкриття карти:", error);
                            alert("Не вдалося відкрити карту. Спробуйте ще раз.");
                        });
                    }
                }
            };
            myContainer.appendChild(div);
        });
    }

    // Інші гравці
    const otherContainer = document.getElementById('other-players-list');
    otherContainer.innerHTML = '';
    
    Object.keys(data.players).forEach(pid => {
        if(pid === myPlayerId) return;
        
        const p = data.players[pid];
        const row = document.createElement('div');
        row.className = 'player-row';
        if(p.isKicked) {
            row.classList.add('kicked-player');
            row.innerHTML += '<div class="kicked-badge">ВИГНАНИЙ</div>';
        }

        let cardsHtml = '';
        if(p.cards) {
            Object.values(p.cards).forEach(c => {
                if(c.open) cardsHtml += `<span class="mini-card is-open">${c.t}: ${c.v}</span>`;
                else cardsHtml += `<span class="mini-card is-closed">${c.t}</span>`;
            });
        }

        let hostBtns = '';
        if(isHost && !p.isKicked) {
            hostBtns = `<button class="host-action" onclick="window.kickPlayer('${pid}')">☠️</button>`;
        } else if(isHost && p.isKicked) {
            hostBtns = `<button class="host-action" onclick="window.restorePlayer('${pid}')">♻️</button>`;
        }

        row.innerHTML = `
            <div style="width:200px;">
                <div style="font-weight:bold; color:#f4d03f;">${p.name}</div>
                ${hostBtns}
            </div>
            <div style="flex-grow:1; text-align:left;">${cardsHtml}</div>
        `;
        otherContainer.appendChild(row);
    });
}

// --- ЕКСПОРТ ФУНКЦІЙ ДЛЯ HTML ---
// Щоб HTML бачив ці функції, ми чіпляємо їх до window
window.kickPlayer = function(pid) {
    if(confirm("Вигнати цього гравця?")) {
        update(ref(db, `rooms/${myRoomId}/players/${pid}/isKicked`), true);
    }
};

window.restorePlayer = function(pid) {
    if(confirm("Повернути гравця в гру?")) {
        update(ref(db, `rooms/${myRoomId}/players/${pid}/isKicked`), false);
    }
};

window.leaveGame = function() {
    leaveGameLocal();
    location.reload();
}

function leaveGameLocal() {
    localStorage.removeItem('bk_room');
    localStorage.removeItem('bk_pid');
    localStorage.removeItem('bk_host');
    localStorage.removeItem('bk_name');
    myRoomId = null;
}

function nextRoundHost() {
    // Спочатку дізнаємося поточний номер раунду
    get(ref(db, `rooms/${myRoomId}/round`)).then(snap => {
        const current = snap.val();
        
        // ВИПРАВЛЕННЯ: Використовуємо 'set' замість 'update', 
        // бо ми змінюємо лише одне просте число.
        set(ref(db, `rooms/${myRoomId}/round`), current + 1)
        .catch(error => {
            console.error("Помилка зміни раунду:", error);
        });
    });
}

function finishGameHost() {
    get(ref(db, `rooms/${myRoomId}/players`)).then(snap => {
        const players = snap.val();
        const survivors = Object.values(players).filter(p => !p.isKicked).map(p => p.name).join(", ");
        alert(`ГРУ ЗАВЕРШЕНО!\n\nУ БУНКЕР ПОТРАПИЛИ:\n${survivors}`);
    });
}

// --- СЕСІЯ ---
function saveSession() {
    localStorage.setItem('bk_room', myRoomId);
    localStorage.setItem('bk_pid', myPlayerId);
    localStorage.setItem('bk_host', isHost);
    localStorage.setItem('bk_name', myName);
}

function checkReconnection() {
    const r = localStorage.getItem('bk_room');
    const p = localStorage.getItem('bk_pid');
    if(r && p) {
        myRoomId = r;
        myPlayerId = p;
        myName = localStorage.getItem('bk_name');
        isHost = (localStorage.getItem('bk_host') === 'true');
        enterLobbyUI();
    }
}

// Допоміжна
function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }