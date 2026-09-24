/**
 * QUIZ MASTER - Vanilla JS Quiz App
 * Struktur:
 * 1. Data Soal
 * 2. State & Variables
 * 3. DOM Elements
 * 4. Initialization & Event Listeners
 * 5. Core Logic (Start, Play, Check, Result)
 * 6. UI & Animations
 * 7. Utilities (Audio, Confetti, Storage, Toast)
 */

// --- 1. DATA SOAL ---
const questionBank = [
    // HTML
    { cat: "HTML", diff: "easy", q: "Apa kepanjangan HTML?", opts: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "Home Tool Markup Language"], ans: 0, exp: "HTML adalah standar bahasa markah untuk web." },
    { cat: "HTML", diff: "easy", q: "Tag untuk membuat paragraf adalah?", opts: ["<text>", "<p>", "<para>", "<pg>"], ans: 1, exp: "<p> merepresentasikan sebuah paragraf." },
    { cat: "HTML", diff: "medium", q: "Atribut mana yang digunakan untuk link tujuan di tag <a>?", opts: ["src", "link", "href", "url"], ans: 2, exp: "href (Hypertext Reference) menentukan URL tujuan." },
    { cat: "HTML", diff: "medium", q: "Bagaimana cara membuat list bernomor?", opts: ["<ul>", "<list>", "<dl>", "<ol>"], ans: 3, exp: "<ol> singkatan dari Ordered List (bernomor)." },
    { cat: "HTML", diff: "hard", q: "Tag semantik HTML5 mana yang tepat untuk artikel independen?", opts: ["<section>", "<div>", "<article>", "<aside>"], ans: 2, exp: "<article> digunakan untuk konten mandiri dan independen." },
    // CSS
    { cat: "CSS", diff: "easy", q: "Apa kepanjangan CSS?", opts: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], ans: 1, exp: "CSS mengatur tampilan elemen HTML." },
    { cat: "CSS", diff: "easy", q: "Properti untuk mengubah warna teks adalah?", opts: ["color", "text-color", "font-color", "bg-color"], ans: 0, exp: "Properti 'color' mengubah warna font/teks." },
    { cat: "CSS", diff: "medium", q: "Bagaimana cara memanggil ID 'header' di CSS?", opts: [".header", "*header", "#header", "header"], ans: 2, exp: "Simbol # digunakan untuk selector ID." },
    { cat: "CSS", diff: "medium", q: "Nilai z-index default adalah?", opts: ["1", "0", "auto", "-1"], ans: 2, exp: "Default z-index adalah 'auto' (seperti 0)." },
    { cat: "CSS", diff: "hard", q: "Manakah yang BUKAN nilai dari properti position?", opts: ["static", "relative", "absolute", "float"], ans: 3, exp: "Float adalah properti terpisah, bukan nilai dari position." },
    // JS
    { cat: "JavaScript", diff: "easy", q: "Simbol untuk komentar satu baris di JS?", opts: ["<!-- -->", "//", "/* */", "#"], ans: 1, exp: "// digunakan untuk komentar sebaris." },
    { cat: "JavaScript", diff: "easy", q: "Deklarasi variabel yang nilainya bisa diubah?", opts: ["const", "let", "static", "final"], ans: 1, exp: "let mengizinkan reassignment, const tidak." },
    { cat: "JavaScript", diff: "medium", q: "Metode array untuk menambah item ke akhir array?", opts: ["push()", "pop()", "shift()", "add()"], ans: 0, exp: "push() menambah elemen ke index terakhir." },
    { cat: "JavaScript", diff: "medium", q: "Tipe data dari (typeof null) adalah?", opts: ["null", "undefined", "object", "string"], ans: 2, exp: "Bug legendaris di JS: typeof null mereturn 'object'." },
    { cat: "JavaScript", diff: "hard", q: "Apa output dari '2' + 2 di JS?", opts: ["4", "22", "NaN", "Error"], ans: 1, exp: "Tipe number akan diconvert ke string dan digabungkan (concatenation)." },
    // Programming
    { cat: "Programming", diff: "easy", q: "Otak dari sebuah komputer disebut?", opts: ["RAM", "Motherboard", "CPU", "GPU"], ans: 2, exp: "CPU (Central Processing Unit) adalah otak komputer." },
    { cat: "Programming", diff: "easy", q: "Sistem bilangan berbasis 2 (0 dan 1) disebut?", opts: ["Desimal", "Hexadesimal", "Biner", "Oktal"], ans: 2, exp: "Sistem biner adalah bahasa paling dasar komputer." },
    { cat: "Programming", diff: "medium", q: "Struktur data LIFO (Last In First Out)?", opts: ["Queue", "Array", "Tree", "Stack"], ans: 3, exp: "Stack beroperasi seperti tumpukan piring (LIFO)." },
    { cat: "Programming", diff: "medium", q: "Apa kepanjangan dari API?", opts: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "Apple Programming Interface"], ans: 0, exp: "API menjembatani komunikasi antar software." },
    { cat: "Programming", diff: "hard", q: "Konsep OOP dimana class anak mewarisi class induk disebut?", opts: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"], ans: 2, exp: "Inheritance (Pewarisan) mengizinkan reuse kode." },
    // Additional Mix
    { cat: "HTML", diff: "hard", q: "Atribut mana yang membuat input field wajib diisi?", opts: ["validate", "required", "mandatory", "must-fill"], ans: 1, exp: "Atribut 'required' pada tag <input>." },
    { cat: "CSS", diff: "medium", q: "Properti flexbox untuk mengatur jarak di sumbu utama?", opts: ["align-items", "justify-content", "flex-direction", "gap"], ans: 1, exp: "justify-content mengatur alignment secara horizontal (default)." },
    { cat: "JavaScript", diff: "medium", q: "Method untuk mengkonversi string ke integer?", opts: ["parseString()", "toInteger()", "parseInt()", "Math.int()"], ans: 2, exp: "parseInt() memparsing string dan mereturn integer." },
    { cat: "Programming", diff: "easy", q: "Proses mencari dan memperbaiki error pada kode disebut?", opts: ["Compiling", "Debugging", "Running", "Executing"], ans: 1, exp: "Debugging berasal dari kata 'bug' (kutu/error)." },
    { cat: "HTML", diff: "medium", q: "Tag untuk menyisipkan gambar adalah?", opts: ["<image>", "<img>", "<pic>", "<src>"], ans: 1, exp: "<img> adalah tag kosong yang memerlukan atribut src." },
    { cat: "CSS", diff: "hard", q: "Unit vh merujuk pada?", opts: ["Visual height", "Viewport height", "Vertical height", "View heading"], ans: 1, exp: "1vh = 1% dari tinggi viewport layar." },
    { cat: "JavaScript", diff: "hard", q: "Apa itu DOM?", opts: ["Data Object Model", "Document Object Model", "Direct Object Mapping", "Display Output Monitor"], ans: 1, exp: "DOM adalah interface programming untuk dokumen HTML." },
    { cat: "Programming", diff: "medium", q: "Perulangan yang mengeksekusi blok minimal 1 kali meskipun kondisi salah?", opts: ["for", "while", "do-while", "foreach"], ans: 2, exp: "do-while mengeksekusi body dulu sebelum mengecek kondisi." },
    { cat: "JavaScript", diff: "easy", q: "Operator perbandingan identik (tipe & nilai) di JS?", opts: ["==", "=", "===", "!="], ans: 2, exp: "=== mengecek kesamaan nilai sekaligus tipe datanya." },
    { cat: "Programming", diff: "hard", q: "Manakah yang merupakan NoSQL Database?", opts: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], ans: 2, exp: "MongoDB berbasis dokumen (JSON-like), bukan tabel relasional." }
];

// --- 2. STATE & VARIABLES ---
let state = {
    playerName: "",
    category: "All",
    difficulty: "10", // 10 is default amount, repurposing chip logic for amount
    amount: 10,
    questions: [],
    currIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    correct: 0,
    wrong: 0,
    timer: null,
    timeLeft: 15,
    isPaused: false,
    history: [],
    achievements: new Set()
};

let settings = {
    sound: true,
    darkMode: false,
    timerEnabled: true
};

const motivationalQuotes = ["🔥 You're doing great!", "💪 Keep going!", "🧠 Your brain is cooking!", "🚀 Almost there!", "✨ Nice answer!"];
let audioCtx;

// --- 3. DOM ELEMENTS ---
const el = (id) => document.getElementById(id);

const screens = {
    landing: el("screen-landing"),
    quiz: el("screen-quiz"),
    result: el("screen-result"),
    review: el("screen-review")
};

const dom = {
    playerName: el("player-name"),
    welcomeText: el("welcome-text"),
    lbContent: el("lb-content"),
    score: el("score-el"),
    streak: el("streak-el"),
    qCurrent: el("q-current"),
    qTotal: el("q-total"),
    progressFill: el("progress-fill"),
    timerWrap: el("timer-wrapper"),
    timerText: el("timer-el"),
    qText: el("question-text"),
    qCategory: el("q-category"),
    qDifficulty: el("q-difficulty"),
    optContainer: el("options-container"),
    feedBox: el("feedback-box"),
    feedTitle: el("feedback-title"),
    feedDesc: el("feedback-desc"),
    btnNext: el("btn-next"),
    modalSettings: el("modal-settings"),
    modalPause: el("modal-pause"),
    finalPercent: el("final-percentage")
};

// --- 4. INIT & EVENTS ---
window.onload = () => {
    loadProgress();
    setupEventListeners();
    checkReturningPlayer();
};

function setupEventListeners() {
    // Config Chips
    document.querySelectorAll('#category-group .chip').forEach(c => c.addEventListener('click', (e) => selectChip(e, 'category')));
    document.querySelectorAll('#difficulty-group .chip').forEach(c => c.addEventListener('click', (e) => selectChip(e, 'difficulty')));
    document.querySelectorAll('#amount-group .chip').forEach(c => c.addEventListener('click', (e) => selectChip(e, 'amount')));

    // Buttons
    el('btn-start').addEventListener('click', startQuiz);
    dom.btnNext.addEventListener('click', nextQuestion);
    el('btn-home').addEventListener('click', () => switchScreen('landing'));
    el('btn-review').addEventListener('click', showReview);
    el('btn-close-review').addEventListener('click', () => switchScreen('result'));

    // Settings & Pause
    el('btn-settings').addEventListener('click', () => dom.modalSettings.classList.remove('hidden'));
    el('btn-close-settings').addEventListener('click', () => dom.modalSettings.classList.add('hidden'));
    el('btn-pause').addEventListener('click', pauseQuiz);
    el('btn-resume').addEventListener('click', resumeQuiz);
    el('btn-quit').addEventListener('click', quitQuiz);

    // Toggles
    el('toggle-theme').addEventListener('change', (e) => toggleTheme(e.target.checked));
    el('toggle-sound').addEventListener('change', (e) => settings.sound = e.target.checked);
    el('toggle-timer').addEventListener('change', (e) => settings.timerEnabled = e.target.checked);

    // Keyboard
    document.addEventListener('keydown', handleKeyboard);
}

function selectChip(e, type) {
    document.querySelectorAll(`#${type}-group .chip`).forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');

    if (type === 'amount') state.amount = parseInt(e.target.dataset.val);
    else state[type] = e.target.dataset.val;
    playSound('click');
}

function checkReturningPlayer() {
    const savedName = localStorage.getItem('qm_name');
    const hs = localStorage.getItem('qm_hs') || 0;

    if (savedName) {
        dom.playerName.value = savedName;
        state.playerName = savedName;
        // Gunakan nama sapaan khusus jika terdeteksi, atau nama dari storage
        let displayName = savedName.toLowerCase() === 'mazawgg' ? 'Mazawgg' : savedName;
        dom.welcomeText.innerHTML = `Welcome back, <span class="text-primary">${displayName}</span>! 👋<br><small>🏆&nbsp; High Score: ${hs}</small>`;
    }

    // Load local leaderboard
    let lb = JSON.parse(localStorage.getItem('qm_lb')) || [];
    if (lb.length > 0) {
        lb.sort((a, b) => b.score - a.score);
        dom.lbContent.innerHTML = lb.slice(0, 3).map((p, i) => `<p>${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} <strong>${p.name}</strong> - ${p.score} pts</p>`).join('');
    } else {
        dom.lbContent.innerHTML = "<p class='text-muted'>No data yet. Be the first!</p>";
    }
}

// --- 5. CORE LOGIC ---
function startQuiz() {
    let name = dom.playerName.value.trim();
    if (!name) { showToast("Please enter your name first 😊", "warning"); return; }

    state.playerName = name;
    localStorage.setItem('qm_name', name);
    initAudio(); // Initialize audio context on user gesture
    playSound('click');

    // Filter Questions
    let filtered = questionBank.filter(q => {
        let matchCat = state.category === "All" || q.cat === state.category;
        let matchDiff = state.difficulty === "All" || q.diff === state.difficulty;
        return matchCat && matchDiff;
    });

    if (filtered.length === 0) { showToast("No questions found for this filter!", "danger"); return; }

    // Shuffle & Slice
    filtered.sort(() => Math.random() - 0.5);
    state.questions = filtered.slice(0, state.amount);

    // Reset State
    state.currIndex = 0; state.score = 0; state.streak = 0; state.bestStreak = 0;
    state.correct = 0; state.wrong = 0; state.history = []; state.achievements.clear();

    updateHeaderStats();
    dom.qTotal.innerText = state.questions.length;

    switchScreen('quiz');
    loadQuestion();
}

function loadQuestion() {
    if (!state.questions || state.questions.length === 0) return;
    
    let q = state.questions[state.currIndex];
    if (!q) return;

    if (dom.qCurrent) dom.qCurrent.innerText = state.currIndex + 1;
    if (dom.progressFill) {
        dom.progressFill.style.width = `${((state.currIndex) / state.questions.length) * 100}%`;
    }
    
    if (dom.qCategory) dom.qCategory.innerText = q.cat;
    if (dom.qDifficulty) dom.qDifficulty.innerText = q.diff ? q.diff.toUpperCase() : '';
    
    // Transition Out
    if (dom.qText) dom.qText.style.opacity = 0;
    if (dom.optContainer) dom.optContainer.style.opacity = 0;
    if (dom.feedBox) dom.feedBox.classList.add('hidden');

    setTimeout(() => {
        if (dom.qText) dom.qText.innerText = q.q;
        if (dom.optContainer) {
            dom.optContainer.innerHTML = '';
            
            // Validasi opsi jawaban
            if (q.opts && Array.isArray(q.opts)) {
                let opts = q.opts.map((text, i) => ({ text, isCorrect: i === q.ans }));
                opts.sort(() => Math.random() - 0.5);

                const keys = ['A', 'B', 'C', 'D'];
        opts.forEach((opt, idx) => {
            let btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.dataset.key = keys[idx];
            
            // Buat span khusus teks agar aman dari terjemahan tag HTML browser
            let span = document.createElement('span');
            span.className = 'opt-text';
            span.textContent = opt.text; // AMAN: Memperlakukan tag seperti <p> sebagai teks biasa, bukan elemen HTML
            
            btn.appendChild(span);
            btn.onclick = () => handleAnswer(btn, opt.isCorrect, opt.text, q);
            dom.optContainer.appendChild(btn);
        });
            }
        }

        // Transition In
        if (dom.qText) dom.qText.style.opacity = 1;
        if (dom.optContainer) dom.optContainer.style.opacity = 1;
        
        startTimer();
    }, 200);
}

function handleAnswer(btnTarget, isCorrect, userText, qObj) {
    if (state.isPaused) return;
    clearInterval(state.timer);

    let btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true); // Lock answers

    // Save history
    state.history.push({
        q: qObj.q, user: userText,
        correct: qObj.opts[qObj.ans], exp: qObj.exp, isRight: isCorrect
    });

    if (isCorrect) {
        playSound('correct');
        btnTarget.classList.add('correct');
        btnTarget.innerHTML += ` <i class="fas fa-check-circle"></i>`;

        let pts = 10 + (state.streak * 2); // Multiplier
        state.score += pts;
        state.correct++;
        state.streak++;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;

        showConfetti(50);
        checkAchievements();

        dom.feedTitle.innerHTML = `🎉 Correct! <span class="text-success">+${pts} pts</span>`;
    } else {
        playSound('wrong');
        btnTarget.classList.add('wrong');
        btnTarget.innerHTML += ` <i class="fas fa-times-circle"></i>`;

        state.wrong++;
        state.streak = 0;

        // Highlight correct
        btns.forEach(b => {
            if (b.querySelector('.opt-text').innerText === qObj.opts[qObj.ans]) {
                b.classList.add('correct');
                b.style.opacity = '0.7';
            }
        });

        dom.feedTitle.innerHTML = `❌ Not quite!`;
    }

    updateHeaderStats();
    dom.feedDesc.innerText = qObj.exp;
    dom.feedBox.classList.remove('hidden');

    // Random Motivation
    if (Math.random() > 0.6 && isCorrect) {
        setTimeout(() => showToast(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)], "primary"), 500);
    }
}

function nextQuestion() {
    playSound('click');
    state.currIndex++;
    if (state.currIndex >= state.questions.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

function endQuiz() {
    dom.progressFill.style.width = `100%`;
    setTimeout(() => {
        saveProgress();
        renderResults();
        switchScreen('result');
        if (state.correct === state.questions.length) {
            playSound('achievement');
            showConfetti(300);
            showToast("🏆 Perfect Score!", "success");
        } else {
            playSound('correct');
            showConfetti(100);
        }
    }, 500);
}

function renderResults() {
    let perc = Math.round((state.correct / state.questions.length) * 100);

    // Animate Circle
    let currentPerc = 0;
    let intv = setInterval(() => {
        currentPerc++;
        dom.finalPercent.innerText = `${currentPerc}%`;
        document.querySelector('.score-circle').style.background = `conic-gradient(var(--primary) ${currentPerc * 3.6}deg, var(--border) 0deg)`;
        if (currentPerc >= perc) clearInterval(intv);
    }, 20);

    el('stat-points').innerText = state.score;
    el('stat-correct').innerText = state.correct;
    el('stat-wrong').innerText = state.wrong;
    el('stat-streak').innerText = state.bestStreak;

    let msg = "";
    if (perc >= 90) msg = "Outstanding! 🏆";
    else if (perc >= 75) msg = "Great Job! 🔥";
    else if (perc >= 60) msg = "Nice Work! 👍";
    else if (perc >= 40) msg = "Keep Practicing! 💪";
    else msg = "Don't Give Up! 🚀";

    // Persona sapaan
    let displayName = state.playerName.toLowerCase() === 'mazawgg' ? 'Mazawgg' : state.playerName;
    el('result-greeting').innerText = `Great job, ${displayName}!`;
    el('result-message').innerText = msg;
}

// --- 6. TIMER & UI ---
function startTimer() {
    clearInterval(state.timer);
    dom.timerWrap.classList.remove('warning');
    if (!settings.timerEnabled) { dom.timerWrap.style.display = 'none'; return; }

    dom.timerWrap.style.display = 'inline-flex';
    state.timeLeft = 15;
    dom.timerText.innerText = `${state.timeLeft}s`;

    state.timer = setInterval(() => {
        if (state.isPaused) return;
        state.timeLeft--;
        dom.timerText.innerText = `${state.timeLeft}s`;

        if (state.timeLeft <= 5) dom.timerWrap.classList.add('warning');

        if (state.timeLeft <= 0) {
            clearInterval(state.timer);
            let fakeBtn = document.createElement('button'); // dummy
            handleAnswer(fakeBtn, false, "Time's Up!", state.questions[state.currIndex]);
            dom.feedTitle.innerHTML = `⏱️ Time's Up!`;
        }
    }, 1000);
}

function updateHeaderStats() {
    dom.score.innerText = state.score;
    dom.streak.innerText = state.streak;

    if (state.streak === 3) showToast("🔥 On Fire!", "warning");
    if (state.streak === 5) showToast("🔥🔥 Unstoppable!", "warning");
}

function showReview() {
    switchScreen('review');
    let html = state.history.map((h, i) => `
        <div class="review-item ${h.isRight ? 'correct' : 'wrong'}">
            <h4>${i + 1}. ${h.q}</h4>
            <p class="r-ans">Your Answer: <strong>${h.user}</strong> ${h.isRight ? '✅' : '❌'}</p>
            ${!h.isRight ? `<p class="r-ans">Correct: <strong>${h.correct}</strong></p>` : ''}
            <div class="r-exp"><i class="fas fa-info-circle"></i> ${h.exp}</div>
        </div>
    `).join('');
    el('review-list-container').innerHTML = html;
}

function switchScreen(screenId) {
    // Sembunyikan semua screen secara instan
    Object.values(screens).forEach(s => {
        if (s) {
            s.classList.remove('active');
            s.classList.add('hidden');
            s.style.display = 'none';
        }
    });

    // Tampilkan screen tujuan dengan aman
    const targetScreen = screens[screenId] || document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.style.display = 'flex'; // Gunakan flex agar konsisten dengan layout
        
        // Timeout kecil untuk memastikan browser memproses DOM reflow
        setTimeout(() => {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
        }, 20);
    }

    // --- LOGIKA ICON-BTN HIDE/HOVER ---
    if (screenId === 'landing') {
        document.body.classList.remove('hide-settings');
    } else {
        document.body.classList.add('hide-settings');
    }

    // Paksa scroll browser ke paling atas
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function pauseQuiz() {
    state.isPaused = true;
    dom.modalPause.classList.remove('hidden');
}
function resumeQuiz() {
    state.isPaused = false;
    dom.modalPause.classList.add('hidden');
}
function quitQuiz() {
    state.isPaused = false;
    clearInterval(state.timer);
    dom.modalPause.classList.add('hidden');
    switchScreen('landing');
    checkReturningPlayer();
}

function handleKeyboard(e) {
    if (screens.quiz.classList.contains('hidden')) return;

    const key = e.key.toLowerCase();
    const map = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', 'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D' };

    if (map[key]) {
        let btn = document.querySelector(`.option-btn[data-key="${map[key]}"]:not(:disabled)`);
        if (btn) btn.click();
    }
    if (key === 'enter' && !dom.feedBox.classList.contains('hidden')) {
        dom.btnNext.click();
    }
    if (key === 'escape') pauseQuiz();
}

// --- 7. UTILITIES & DATA ---
function saveProgress() {
    let hs = localStorage.getItem('qm_hs') || 0;
    if (state.score > hs) localStorage.setItem('qm_hs', state.score);

    // Leaderboard
    let lb = JSON.parse(localStorage.getItem('qm_lb')) || [];
    lb.push({ name: state.playerName, score: state.score });
    localStorage.setItem('qm_lb', JSON.stringify(lb));
}

function loadProgress() {
    // Theme
    let tm = localStorage.getItem('qm_theme');
    if (tm === 'dark') {
        el('toggle-theme').checked = true;
        toggleTheme(true);
    }
}

function toggleTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('qm_theme', isDark ? 'dark' : 'light');
}

function checkAchievements() {
    const ach = state.achievements;
    if (state.currIndex === 0 && state.correct === 1 && !ach.has('firstBlood')) {
        ach.add('firstBlood'); showToast("🏆 First Blood!", "primary"); playSound('achievement');
    }
    if (state.streak === 5 && !ach.has('perfect5')) {
        ach.add('perfect5'); showToast("🏆 Perfect 5!", "primary"); playSound('achievement');
    }
}

function showToast(msg, type = "primary") {
    let t = document.createElement('div');
    t.className = `toast`;
    t.innerHTML = msg;
    el('toast-container').appendChild(t);
    setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 300); }, 3000);
}

// SYNTHESIZED AUDIO (No external assets needed)
function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}
function playSound(type) {
    if (!settings.sound || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'click') {
        osc.type = 'sine'; osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'correct') {
        osc.type = 'triangle'; osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'wrong') {
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'achievement') {
        osc.type = 'square'; osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
        osc.start(); osc.stop(audioCtx.currentTime + 0.4);
    }
}

// CUSTOM LIGHTWEIGHT CONFETTI
function showConfetti(amount) {
    const canvas = el('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let colors = [getComputedStyle(document.documentElement).getPropertyValue('--primary'), '#22c55e', '#f59e0b', '#ef4444'];

    for (let i = 0; i < amount; i++) {
        particles.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2, dx: Math.random() * 4 - 2, dy: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)], tilt: Math.floor(Math.random() * 10) - 10, tiltAngleInc: (Math.random() * 0.07) + 0.05, tiltAngle: 0
        });
    }

    let timer = 0;
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.tiltAngle += p.tiltAngleInc;
            p.y += (Math.cos(p.tiltAngle) + p.dy + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle) * 2;

            ctx.beginPath(); ctx.lineWidth = p.r; ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r, p.y); ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r); ctx.stroke();
        });
        timer++;
        if (timer < 150) requestAnimationFrame(render);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render();
}