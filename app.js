// ==========================================
// 1. ПІДКЛЮЧЕННЯ FIREBASE (Версія 12.6.0)
// ==========================================
// Ми беремо функції прямо з серверів Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, set, get, update, onValue, push, child } 
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Твої налаштування (Config)
const firebaseConfig = {
  apiKey: "AIzaSyAKgiNg__113EYdtlaIgztEmRVLk__CQmU",
  authDomain: "bunker-game-ua.firebaseapp.com",
  databaseURL: "https://bunker-game-ua-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bunker-game-ua",
  storageBucket: "bunker-game-ua.firebasestorage.app",
  messagingSenderId: "92286277350",
  appId: "1:92286277350:web:6f247cf8c882e979a20d27"
};

// Запускаємо Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// ==========================================
// 2. БАЗА ДАНИХ ГРИ (Списки)
// ==========================================

const professions = [
    "автомеханік", "агент СБУ", "агент ЦРУ", "агроном", "адвокат", "актор",
    "акушер-гінеколог", "альпініст", "археолог", "архітектор", "астролог",
    "астронавт", "банкір", "бариста", "бармен", "бібліотекар", "бізнесмен",
    "біолог", "блогер", "боєць спецназу", "боксер", "бортпровідник", "ботанік",
    "бухгалтер", "ветеринар", "візажист", "військовослужбовець", "географ",
    "геолог", "вантажник", "дайвер", "далекобійник", "депутат", "детектив",
    "діджей", "дизайнер", "лісоруб", "журналіст", "інженер", "інфекціоніст",
    "касир", "кілер", "кінолог", "клоун", "кондитер", "косметолог", "ліфтер",
    "маркетолог", "машиніст", "модель", "м’ясник", "окуліст", "онколог",
    "офіціант", "охоронець", "перукар", "патологоанатом", "співак", "пілот",
    "письменник", "кухар", "пожежник", "поліцейський", "порноактор",
    "президент", "програміст", "продавець морозива", "прокурор", "психолог",
    "сантехнік", "зварювальник", "священник", "суддя", "тату-майстер",
    "учитель", "учений", "фермер", "фізик-ядерник", "хірург", "шахтар"
];

const luggage = [
    "автомобільний акамулятор", "аптечка", "бездротова колонка", "будильник",
    "пляшка шампанського", "гайковий ключ", "газовий пальник", "гітара",
    "грудна дитина", "дідусева рушниця", "10 медичних масок", "щоденник",
    "запальничка", "карта місцевості", "касети з фільмами", "компас",
    "консерви", "коробок сірників", "льодоруб і трос", "лук і стріли",
    "молоток і цвяхи", "набір інструментів", "настільні ігри", "німецька вівчарка",
    "ноутбук", "пачка цигарок", "перський кіт", "пневматичний пістолет",
    "презервативи", "протигаз", "радіо", "рулони туалетного паперу",
    "насіння картоплі", "мобільний телефон", "стерильні шприци", "телевізор",
    "сокира і мотузка", "ліхтарик і батарейки", "фотоапарат", "чотири рації"
];

const health = [
    "авітаміноз", "алкоголізм", "алергія на тварин", "астма", "безсоння",
    "біполярний розлад", "вітрянка", "гайморит", "гастрит", "гемофілія",
    "гепатит B", "глаукома", "глухонімота", "дальтонізм", "депресія",
    "діарея", "заїкання", "карієс", "косоокість", "мігрень", "наркоманія",
    "ожиріння", "остеохондроз", "відсутність ноги", "параноя", "плоскостопість",
    "пневмонія", "застуда", "псоріаз", "рак легені", "цукровий діабет",
    "сліпота", "туберкульоз", "шизофренія", "епілепсія", "виразка шлунка",
    "Ідеально здоровий", "Ідеально здоровий", "Ідеально здоровий"
];

const biology = [
    "жінка, 18 років: репродуктивна система — у нормі",
    "жінка, 22 роки: репродуктивна система — у нормі",
    "жінка, 30 років: репродуктивна система — у нормі",
    "жінка, 36 років: репродуктивна система — у нормі",
    "жінка, 42 роки: репродуктивна система — у нормі",
    "жінка, 55 років: репродуктивна система — клімакс",
    "жінка, 70 років: репродуктивна система — неактивна",
    "чоловік, 20 років: репродуктивна система — у нормі",
    "чоловік, 25 років: репродуктивна система — безпліддя",
    "чоловік, 30 років: репродуктивна система — у нормі",
    "чоловік, 40 років: репродуктивна система — у нормі",
    "чоловік, 60 років: репродуктивна система — слабка активність",
    "кіборг (модель X-12), 54 роки: репродуктивна система — штучна",
    "ельфійка, 214 років: репродуктивна система — у нормі",
    "чоловік з пришвидшеним старінням, 12 років"
];

const traits = [
    "авантюризм", "безвідмовність", "безініціативність", "боязкість",
    "буйність", "веселість", "владність", "уважність", "буркотливість",
    "гостинність", "грубість", "доброта", "довірливість", "жадібність",
    "жорстокість", "істеричність", "конфліктність", "лицемірство",
    "надійність", "ніжність", "образливість", "обережність", "пофігізм",
    "самозакоханість", "самостійність", "стриманість", "скандальність",
    "хоробрість", "егоїзм", "рішучість", "креативність", "оптимістичність"
];

const hobbies = [
    "ведення блогу", "волонтерство", "вирощування рослин", "йога", "фітнес",
    "футбол", "гра на гітарі", "вивчення мов", "кулінарія", "мисливство",
    "спів", "риболовля", "збирання грибів", "скелелазіння", "фокуси",
    "танці", "туризм", "читання", "шопінг", "професійне дрімання",
    "битва з пилососом", "дресирування яктусів", "читання коментарів",
    "складання мемів", "розмови з котом", "фотографія", "астрономія"
];

const facts = [
    "Знаходить їжу за запахом", "Розпалює вогонь ложками", "Страх темряви",
    "Знає 50 способів використання скотчу", "Тиждень без сну",
    "Прибирає, коли нервує", "Переконає будь-кого", "Пам’ять на обличчя",
    "Лагодить електроніку ножем", "Мовчить 24 години, якщо треба",
    "Визначає погоду по небу", "Майстер зброї зі сміття", "Розуміє тварин",
    "Говорить правду в гірший момент", "Тиждень без їжі, але треба тепло",
    "Панікує без причин", "Відкриває будь-які замки", "Збирає ПК з мотлоху",
    "Огида до клоунів", "Страх мишей", "Створить схованку де завгодно",
    "Імітує голоси", "Варить їжу без вогню", "Знає все про радіацію",
    "Діє чітко при виді крові", "Вірить у привидів", "Не приймає ліки",
    "Вірить у рептилоїдів", "Спортсмен", "Виграв у лотерею",
    "Знає Кобзаря напам'ять", "Знає 4 мови", "Актор театру",
    "Екстрасенс", "Любить м'які іграшки", "Надає першу допомогу",
    "Ненавидить каву", "Не п'є алкоголь", "Феноменальна пам'ять",
    "Пограбував банк", "Пережив 3 замахи", "Був на Евересті",
    "Продав нирку", "Проектував цей бункер", "Сидів у в'язниці",
    "Врятував потопаючого", "Резидент 95 кварталу"
];

const phobias = [
    "авіафобія (польоти)", "агорафобія (відкриті місця)", "арахнофобія (павуки)",
    "акрофобія (висота)", "алгофобія (біль)", "клаустрофобія (замкнутість)",
    "гемофобія (кров)", "гідрофобія (вода)", "кінофобія (собаки)",
    "мізофобія (зараження)", "пірофобія (вогонь)", "танатофобія (смерть)",
    "трипанофобія (голки)", "ятрофобія (лікарі)", "НЕМАЄ ФОБІЙ", "НЕМАЄ ФОБІЙ"
];

const catastrophes = [
    {title: "Ядерна зима", story: "Стажер у Пентагоні пролив каву, система почала атаку.", bunker: "Старий радянський бункер під дитсадком (50м глибина).", conditions: "Радіація, холод."},
    {title: "Повстання ШІ", story: "Розумний тостер образився на хліб і зламав коди всієї зброї світу.", bunker: "Мідна шахта без електроніки, світло від ламп.", conditions: "Дрони-вбивці назовні."},
    {title: "Зомбі-пандемія", story: "Ліки від облисіння перетворили людей на зомбі.", bunker: "Склад Amazon, заварені вікна.", conditions: "Натовпи голодних зомбі."},
    {title: "Всесвітній потоп", story: "Еко-активісти розкололи льодовик, рівень води +2км.", bunker: "Атомна субмарина зі зламаною навігацією.", conditions: "Вода всюди, суші немає."},
    {title: "Інопланетяни", story: "Прилетіли на звук концерту Олега Винника, щоб з'їсти джерело.", bunker: "Студія звукозапису з ізоляцією.", conditions: "Повна тиша потрібна."},
    {title: "Гігантська флора", story: "Бабуся переплутала добрива з мутагеном. Картопля полює на людей.", bunker: "Капсула на шпилі хмарочоса.", conditions: "Токсичні спори внизу."},
    {title: "Сонячний спалах", story: "Сонце чхнуло, озоновий шар згорів.", bunker: "Карстова печера з озером.", conditions: "Вдень поверхня плавиться."},
    {title: "Вірус ліні", story: "Всі померли, бо їм було ліньки встати по воду.", bunker: "Розумний дім Ілона Маска.", conditions: "Ніякої загрози, крім власної ліні."},
    {title: "Тектонічний зсув", story: "Земля змістила материки в купу.", bunker: "Сферична капсула з титану в розломі.", conditions: "Землетруси 24/7."},
    {title: "Масове божевілля", story: "Новина про пласку землю звела всіх з розуму.", bunker: "Психлікарня на острові.", conditions: "Довіряти не можна нікому."}
];

const funnySignatures = [
    "Лютий звір", "Хитрий лис", "Вічний друг", "Тиха тінь",
    "Дикий сміх", "Мудрий дід", "Спритний вуж", "Чесний коп",
    "Сліпий кріт", "Грізний бос"
];

// Глобальні змінні
let myRoomId = null;
let myPlayerId = null;
let myName = null;


// ==========================================
// 3. ФУНКЦІЇ МУЛЬТИПЛЕЄРА
// ==========================================

// --- СТВОРЕННЯ КІМНАТИ ---
function createRoom() {
    const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const hostId = "host";
    const signature = getRandomItem(funnySignatures);

    // Зберігаємо в базу
    set(ref(db, 'rooms/' + roomCode), {
        status: "waiting",
        round: 1,
        players: {
            [hostId]: {
                name: "Адмін", // Можна потім змінити на введене ім'я
                signature: signature,
                isHost: true
            }
        }
    })
    .then(() => {
        console.log("Кімната створена!", roomCode);
        enterLobby(roomCode, hostId, "Адмін");
    })
    .catch((error) => {
        alert("Помилка Firebase: " + error.message);
        console.error(error);
    });
}

// --- ПРИЄДНАННЯ ---
function joinRoom() {
    const codeInput = document.getElementById("input-room-code");
    const roomCode = codeInput.value.trim().toUpperCase();

    if (!roomCode) {
        alert("Введи код кімнати!");
        return;
    }

    const roomRef = ref(db, 'rooms/' + roomCode);
    get(roomRef).then((snapshot) => {
        if (snapshot.exists()) {
            const playerId = "player_" + Math.floor(Math.random() * 1000);
            const signature = getRandomItem(funnySignatures);
            
            update(ref(db, `rooms/${roomCode}/players/${playerId}`), {
                name: "Гість " + Math.floor(Math.random() * 100),
                signature: signature,
                isHost: false
            });

            enterLobby(roomCode, playerId, "Гість");
        } else {
            alert("Кімнати " + roomCode + " не існує!");
        }
    }).catch((error) => {
        console.error(error);
        alert("Помилка з'єднання!");
    });
}

// --- ВХІД У ЛОБІ ---
function enterLobby(roomCode, playerId, name) {
    myRoomId = roomCode;
    myPlayerId = playerId;
    myName = name;

    showScreen('lobby-screen');
    document.getElementById('lobby-room-code').innerText = roomCode;

    listenToRoomUpdates();
}

// --- СЛУХАЧ ЗМІН ---
function listenToRoomUpdates() {
    const playersListDiv = document.getElementById('lobby-players-list');
    
    onValue(ref(db, 'rooms/' + myRoomId + '/players'), (snapshot) => {
        playersListDiv.innerHTML = "";
        const players = snapshot.val();
        
        if (players) {
            Object.values(players).forEach(player => {
                const playerDiv = document.createElement('div');
                playerDiv.style.border = "2px solid #fff";
                playerDiv.style.margin = "10px";
                playerDiv.style.padding = "10px";
                playerDiv.style.background = "rgba(0,0,0,0.5)";
                
                playerDiv.innerHTML = `
                    <div style="font-size: 1.2em; font-weight: bold; color: #f4d03f;">${player.name}</div>
                    <div style="color: #ccc; font-style: italic;">${player.signature}</div>
                `;
                playersListDiv.appendChild(playerDiv);
            });
        }
    });
}


// ==========================================
// 4. ДОПОМІЖНІ ФУНКЦІЇ
// ==========================================

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Генерація (Одиночна гра)
function generateCharacter() {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; 
    document.getElementById("catastrophe-block").style.display = "none";

    const character = [
        { title: "🛠 Професія", val: getRandomItem(professions), colorClass: "border-white" },
        { title: "🧬 Біологія", val: getRandomItem(biology), colorClass: "border-orange" },
        { title: "💊 Здоров'я", val: getRandomItem(health), colorClass: "border-red" },
        { title: "🎨 Хобі", val: getRandomItem(hobbies), colorClass: "border-green" },
        { title: "🎒 Багаж", val: getRandomItem(luggage), colorClass: "border-blue" },
        { title: "💡 Факти", val: getRandomItem(facts), colorClass: "border-cyan" },
        { title: "😱 Фобія", val: getRandomItem(phobias), colorClass: "border-purple" },
        { title: "🧠 Характер", val: getRandomItem(traits), colorClass: "border-grey" }
    ];

    character.forEach(item => {
        const card = document.createElement("div");
        card.className = `card ${item.colorClass}`;
        card.innerHTML = `
            <div class="card-header">${item.title}</div>
            <div class="card-body">${item.val}</div>
            <div class="card-footer">BUNKER-UA</div>
        `;
        container.appendChild(card);
    });
}

function showCatastrophe() {
    const scenario = getRandomItem(catastrophes);
    document.getElementById("cat-title").innerText = scenario.title;
    document.getElementById("cat-story").innerText = scenario.story;
    document.getElementById("cat-bunker").innerText = scenario.bunker;
    document.getElementById("cat-conditions").innerText = scenario.conditions;
    
    const block = document.getElementById("catastrophe-block");
    block.style.display = "block";
    block.scrollIntoView({behavior: "smooth"});
}

// ==========================================
// 5. ЗАПУСК
// ==========================================

// Чекаємо завантаження сторінки
// ==========================================
// 5. ЗАПУСК ТА ОБРОБНИКИ ПОДІЙ
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM завантажено. Підключаю кнопки...");

    // --- 1. КНОПКИ МЕНЮ ---
    const btnSingle = document.getElementById('btn-mode-single');
    const btnMulti = document.getElementById('btn-mode-multi');
    
    if(btnSingle) btnSingle.addEventListener('click', () => showScreen('single-player-screen'));
    if(btnMulti) btnMulti.addEventListener('click', () => showScreen('lobby-screen'));

    // --- 2. КНОПКИ ОДИНОЧНОЇ ГРИ ---
    const btnGen = document.getElementById('btn-generate-single');
    const btnCat = document.getElementById('btn-show-catastrophe');

    if(btnGen) btnGen.addEventListener('click', generateCharacter);
    if(btnCat) btnCat.addEventListener('click', showCatastrophe);
    
    // --- 3. КНОПКИ МУЛЬТИПЛЕЄРА ---
    const btnCreate = document.getElementById('btn-create-room');
    const btnJoin = document.getElementById('btn-join-room');

    if(btnCreate) {
        btnCreate.addEventListener('click', () => {
            console.log("Натиснуто 'Створити кімнату'"); // Перевірка
            createRoom();
        });
    }
    if(btnJoin) btnJoin.addEventListener('click', joinRoom);
    
    // --- 4. КНОПКИ "НАЗАД" (Виправляємо проблему модулів) ---
    // Знаходимо всі кнопки з класом .secondary і додаємо їм дію
    const backBtns = document.querySelectorAll('.secondary');
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Натиснуто 'Назад'");
            showScreen('main-menu');
        });
    });

    console.log("Всі кнопки підключено!");
});