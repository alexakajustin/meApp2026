/**
 * MMXXVI Goals Journal - Full Application
 * Features: Goals, Logs, XP/Leveling, Achievements, Heatmap, Mood, Photos, Sounds, Quotes
 * One log per day per goal, editable same day only, accountability calendar
 */

// ===== Goals Data (13 goals now) =====
const goals = [
    { id: 1, text: 'Go to church more', emoji: '⛪' },
    { id: 2, text: 'No alcohol/soda, only water', emoji: '💧' },
    { id: 3, text: 'Gym membership', emoji: '💪' },
    { id: 4, text: 'Read Meditations', emoji: '📖' },
    { id: 5, text: 'Finish Infinity Train', emoji: '🚂' },
    { id: 6, text: 'Finish game engine', emoji: '🎮' },
    { id: 7, text: 'BSC max grading', emoji: '🎓' },
    { id: 8, text: 'Finish Vigil', emoji: '🎬' },
    { id: 9, text: 'Reach 70 kgs', emoji: '⚖️' },
    { id: 10, text: 'Learn guitar & make song', emoji: '🎸' },
    { id: 11, text: 'More outside walks', emoji: '🚶' },
    { id: 12, text: 'Learn N5 Japanese', emoji: '🇯🇵' },
    { id: 13, text: 'No porn', emoji: '🚫' }
];

// ===== Marcus Aurelius Quotes =====
const quotes = [
    { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
    { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
    { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
    { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius" },
    { text: "Very little is needed to make a happy life; it is all within yourself.", author: "Marcus Aurelius" },
    { text: "When you arise in the morning think of what a privilege it is to be alive.", author: "Marcus Aurelius" },
    { text: "If it is not right do not do it; if it is not true do not say it.", author: "Marcus Aurelius" },
    { text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius" },
    { text: "Accept the things to which fate binds you, and love the people with whom fate brings you together.", author: "Marcus Aurelius" },
    { text: "He who lives in harmony with himself lives in harmony with the universe.", author: "Marcus Aurelius" },
    { text: "Never let the future disturb you. You will meet it with the same weapons of reason.", author: "Marcus Aurelius" },
    { text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.", author: "Marcus Aurelius" },
    { text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.", author: "Marcus Aurelius" }
];

// ===== Encouragement Messages =====
const encouragements = [
    "Amazing work! You're building momentum! 🚀",
    "Every log is a step forward. Keep going! 💪",
    "Consistency is the key to mastery. You've got this! 🔑",
    "The best time to start was yesterday. The next best time is now! ⏰",
    "Small progress is still progress! 🌱",
    "You're doing incredible. Don't stop now! ✨",
    "Champions are made in the moments no one is watching. 🏆",
    "Your future self will thank you for this! 🙏",
    "Discipline today, freedom tomorrow! 🦅",
    "One step at a time. You're on the right path! 🛤️",
    "The grind never stops. Neither do you! 💎",
    "You showed up today. That's already a win! 🎯"
];

// ===== Achievements System (20 achievements now) =====
const achievementDefinitions = [
    { id: 'first_log', name: 'First Step', emoji: '👣', description: 'Add your first log', check: (data) => data.totalLogs >= 1 },
    { id: 'log_10', name: 'Getting Started', emoji: '🌟', description: 'Add 10 logs', check: (data) => data.totalLogs >= 10 },
    { id: 'log_25', name: 'Quarter Century', emoji: '🎖️', description: 'Add 25 logs', check: (data) => data.totalLogs >= 25 },
    { id: 'log_50', name: 'Dedicated', emoji: '💎', description: 'Add 50 logs', check: (data) => data.totalLogs >= 50 },
    { id: 'log_100', name: 'Centurion', emoji: '🏛️', description: 'Add 100 logs', check: (data) => data.totalLogs >= 100 },
    { id: 'log_365', name: 'Year of Growth', emoji: '🌳', description: 'Add 365 logs', check: (data) => data.totalLogs >= 365 },
    { id: 'streak_3', name: 'Momentum', emoji: '🔥', description: '3 day streak', check: (data) => data.streak >= 3 },
    { id: 'streak_7', name: 'Week Warrior', emoji: '⚔️', description: '7 day streak', check: (data) => data.streak >= 7 },
    { id: 'streak_14', name: 'Fortnight Fighter', emoji: '🛡️', description: '14 day streak', check: (data) => data.streak >= 14 },
    { id: 'streak_30', name: 'Monthly Master', emoji: '🦁', description: '30 day streak', check: (data) => data.streak >= 30 },
    { id: 'streak_100', name: 'Unstoppable', emoji: '👑', description: '100 day streak', check: (data) => data.streak >= 100 },
    { id: 'all_goals', name: 'Well Rounded', emoji: '🎯', description: 'Log all 13 goals', check: (data) => data.goalsLogged >= 13 },
    { id: 'level_5', name: 'Rising Star', emoji: '⭐', description: 'Reach level 5', check: (data) => data.level >= 5 },
    { id: 'level_10', name: 'Discipline Master', emoji: '🥋', description: 'Reach level 10', check: (data) => data.level >= 10 },
    { id: 'level_25', name: 'Elite', emoji: '🏅', description: 'Reach level 25', check: (data) => data.level >= 25 },
    { id: 'level_50', name: 'Legendary', emoji: '🔱', description: 'Reach level 50', check: (data) => data.level >= 50 },
    { id: 'photo_first', name: 'Snapshot', emoji: '📸', description: 'Add a photo to a log', check: (data) => data.photosAdded >= 1 },
    { id: 'photo_10', name: 'Photographer', emoji: '🖼️', description: 'Add 10 photos', check: (data) => data.photosAdded >= 10 },
    { id: 'early_bird', name: 'Early Bird', emoji: '🐦', description: 'Log before 7 AM', check: (data) => data.earlyBirdLogs >= 1 },
    { id: 'night_owl', name: 'Night Owl', emoji: '🦉', description: 'Log after 11 PM', check: (data) => data.nightOwlLogs >= 1 }
];

// ===== State =====
let currentGoalId = null;
let logs = {};
let userData = {
    xp: 0,
    level: 1,
    achievements: [],
    mantra: '',
    soundEnabled: true,
    totalLogs: 0,
    photosAdded: 0,
    earlyBirdLogs: 0,
    nightOwlLogs: 0
};
let selectedMood = null;
let selectedPhoto = null;
let editingLogId = null;

// ===== XP & Level Config =====
const XP_PER_LOG = 10;
const XP_PER_LEVEL = 100;
const XP_BONUS_STREAK = 5;
const XP_BONUS_PHOTO = 5;

// ===== DOM Elements =====
const goalsList = document.getElementById('goalsList');
const currentGoalTitle = document.getElementById('currentGoalTitle');
const goalLogCount = document.getElementById('goalLogCount');
const logInput = document.getElementById('logInput');
const addLogBtn = document.getElementById('addLogBtn');
const logsTimeline = document.getElementById('logsTimeline');
const totalLogsEl = document.getElementById('totalLogs');
const currentStreakEl = document.getElementById('currentStreak');
const toggleUIBtn = document.getElementById('toggleUIBtn');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const levelNumber = document.getElementById('levelNumber');
const xpBar = document.getElementById('xpBar');
const xpText = document.getElementById('xpText');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const achievementsGrid = document.getElementById('achievementsGrid');
const achievementPopup = document.getElementById('achievementPopup');
const achievementName = document.getElementById('achievementName');
const encouragementToast = document.getElementById('encouragementToast');
const encouragementText = document.getElementById('encouragementText');
const moodOptions = document.getElementById('moodOptions');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const photoPreviewImg = document.getElementById('photoPreviewImg');
const photoRemoveBtn = document.getElementById('photoRemoveBtn');
const heatmapContainer = document.getElementById('heatmapContainer');
const goalProgressFill = document.getElementById('goalProgressFill');
const goalProgressText = document.getElementById('goalProgressText');
const mantraText = document.getElementById('mantraText');
const mantraEditBtn = document.getElementById('mantraEditBtn');
const mantraModal = document.getElementById('mantraModal');
const mantraInput = document.getElementById('mantraInput');
const mantraSaveBtn = document.getElementById('mantraSaveBtn');
const mantraCancelBtn = document.getElementById('mantraCancelBtn');
const weekLogs = document.getElementById('weekLogs');
const weekGoals = document.getElementById('weekGoals');
const weekXP = document.getElementById('weekXP');
const reviewSummary = document.getElementById('reviewSummary');
const streakFire = document.getElementById('streakFire');
const goalCalendar = document.getElementById('goalCalendar');
const editLogModal = document.getElementById('editLogModal');
const editLogInput = document.getElementById('editLogInput');
const editLogSaveBtn = document.getElementById('editLogSaveBtn');
const editLogCancelBtn = document.getElementById('editLogCancelBtn');

// ===== Audio Context =====
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!userData.soundEnabled) return;
    
    initAudio();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'log':
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            oscillator.type = 'sine';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'achievement':
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.1);
                osc.start(audioContext.currentTime + i * 0.1);
                osc.stop(audioContext.currentTime + i * 0.1 + 0.2);
            });
            break;
        case 'levelup':
            const levelNotes = [392, 523.25, 659.25, 783.99];
            levelNotes.forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = freq;
                osc.type = 'triangle';
                gain.gain.setValueAtTime(0.15, audioContext.currentTime + i * 0.12);
                osc.start(audioContext.currentTime + i * 0.12);
                osc.stop(audioContext.currentTime + i * 0.12 + 0.35);
            });
            break;
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    recalculateUserData(); // Sync XP with actual logs
    renderGoals();
    renderAchievements();
    renderHeatmap();
    updateStats();
    updateXPDisplay();
    updateQuote();
    updateMantraDisplay();
    updateWeeklyReview();
    
    if (goals.length > 0) {
        selectGoal(goals[0].id);
    }
    
    if (!userData.soundEnabled) {
        document.body.classList.add('sound-off');
    }
    
    // Setup edit log modal
    setupEditLogModal();
});

// ===== Recalculate user data based on actual logs =====
function recalculateUserData() {
    // Count actual total logs
    let actualTotalLogs = 0;
    let actualPhotos = 0;
    let actualEarlyBird = 0;
    let actualNightOwl = 0;
    
    Object.values(logs).forEach(goalLogs => {
        actualTotalLogs += goalLogs.length;
        goalLogs.forEach(log => {
            if (log.photo) actualPhotos++;
            
            const date = new Date(log.date);
            const hour = date.getHours();
            if (hour < 7) actualEarlyBird++;
            if (hour >= 23) actualNightOwl++;
        });
    });
    
    // Calculate what level/XP should be
    const totalXP = actualTotalLogs * XP_PER_LOG;
    const calculatedLevel = Math.floor(totalXP / XP_PER_LEVEL) + 1;
    const calculatedXP = totalXP % XP_PER_LEVEL;
    
    // Update userData to match actual logs
    userData.totalLogs = actualTotalLogs;
    userData.photosAdded = actualPhotos;
    userData.earlyBirdLogs = actualEarlyBird;
    userData.nightOwlLogs = actualNightOwl;
    userData.level = calculatedLevel;
    userData.xp = calculatedXP;
    
    // Recheck achievements
    recheckAchievements();
    
    saveData();
}

// ===== Data Persistence =====
function loadData() {
    const savedLogs = localStorage.getItem('mmxxvi_logs');
    if (savedLogs) logs = JSON.parse(savedLogs);
    
    const savedUserData = localStorage.getItem('mmxxvi_user');
    if (savedUserData) userData = { ...userData, ...JSON.parse(savedUserData) };
}

function saveData() {
    localStorage.setItem('mmxxvi_logs', JSON.stringify(logs));
    localStorage.setItem('mmxxvi_user', JSON.stringify(userData));
}

// ===== Render Goals =====
function renderGoals() {
    goalsList.innerHTML = goals.map(goal => {
        const goalLogs = logs[goal.id] || [];
        const monthlyLogs = getMonthlyLogs(goal.id);
        const progressPercent = Math.min((monthlyLogs / 30) * 100, 100);
        
        return `
            <li class="goal-item" data-id="${goal.id}">
                <span class="goal-number">${String(goal.id).padStart(2, '0')}</span>
                <span class="goal-text">${goal.text}</span>
                ${goalLogs.length > 0 ? `<span class="goal-badge">${goalLogs.length}</span>` : ''}
                <div class="goal-progress-mini" style="width: ${progressPercent}%"></div>
            </li>
        `;
    }).join('');
    
    goalsList.querySelectorAll('.goal-item').forEach(item => {
        item.addEventListener('click', () => selectGoal(parseInt(item.dataset.id)));
    });
}

function getMonthlyLogs(goalId) {
    const goalLogs = logs[goalId] || [];
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return goalLogs.filter(log => new Date(log.date) >= monthStart).length;
}

// ===== Select Goal =====
function selectGoal(goalId) {
    currentGoalId = goalId;
    const goal = goals.find(g => g.id === goalId);
    
    goalsList.querySelectorAll('.goal-item').forEach(item => {
        item.classList.toggle('active', parseInt(item.dataset.id) === goalId);
    });
    
    currentGoalTitle.textContent = `${goal.emoji} ${goal.text}`;
    
    updateGoalProgress();
    renderGoalCalendar();
    renderLogs();
    updateAddLogButton();
}

function updateGoalProgress() {
    const monthlyLogs = getMonthlyLogs(currentGoalId);
    const target = 30;
    const percent = Math.min((monthlyLogs / target) * 100, 100);
    
    goalProgressFill.style.width = `${percent}%`;
    goalProgressText.textContent = `${monthlyLogs} / ${target} this month`;
}

// ===== Goal Accountability Calendar =====
function renderGoalCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    // Get logged dates for this goal this month
    const goalLogs = logs[currentGoalId] || [];
    const loggedDates = new Set();
    goalLogs.forEach(log => {
        const logDate = new Date(log.date);
        if (logDate.getFullYear() === year && logDate.getMonth() === month) {
            loggedDates.add(logDate.getDate());
        }
    });
    
    // Build calendar HTML
    let html = '';
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        html += `<div class="calendar-header">${day}</div>`;
    });
    
    // Empty cells for days before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
        html += `<div class="calendar-day empty"></div>`;
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        let classes = 'calendar-day';
        
        if (day === today) {
            classes += ' today';
        }
        
        if (day < today) {
            // Past days
            if (loggedDates.has(day)) {
                classes += ' logged';
            } else {
                classes += ' missed';
            }
        } else if (day === today) {
            // Today
            if (loggedDates.has(day)) {
                classes += ' logged';
            }
        } else {
            // Future days
            classes += ' future';
        }
        
        html += `<div class="${classes}" data-day="${day}"></div>`;
    }
    
    goalCalendar.innerHTML = html;
}

// ===== Check if already logged today for current goal =====
function hasLoggedToday() {
    const goalLogs = logs[currentGoalId] || [];
    const today = new Date().toDateString();
    
    return goalLogs.some(log => new Date(log.date).toDateString() === today);
}

function getTodaysLog() {
    const goalLogs = logs[currentGoalId] || [];
    const today = new Date().toDateString();
    
    return goalLogs.find(log => new Date(log.date).toDateString() === today);
}

function updateAddLogButton() {
    const todaysLog = getTodaysLog();
    
    if (todaysLog) {
        addLogBtn.innerHTML = `<span>Edit Today's Log</span><span class="xp-gain">✏️</span>`;
        logInput.value = todaysLog.content;
        logInput.placeholder = "Edit your log for today...";
        
        // Set mood if exists
        if (todaysLog.mood) {
            selectedMood = todaysLog.mood;
            moodOptions.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.toggle('selected', btn.dataset.mood === todaysLog.mood);
            });
        }
    } else {
        addLogBtn.innerHTML = `<span>Add Log</span><span class="xp-gain">+10 XP</span>`;
        logInput.value = '';
        logInput.placeholder = "What did you do today? Write your progress...";
        selectedMood = null;
        moodOptions.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
    }
}

// ===== Render Logs =====
function renderLogs() {
    const goalLogs = logs[currentGoalId] || [];
    
    goalLogCount.textContent = goalLogs.length > 0 
        ? `${goalLogs.length} log${goalLogs.length !== 1 ? 's' : ''}` 
        : '';
    
    if (goalLogs.length === 0) {
        logsTimeline.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <p>No logs yet. Start writing your journey!</p>
            </div>
        `;
        return;
    }
    
    const sortedLogs = [...goalLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    const today = new Date().toDateString();
    
    logsTimeline.innerHTML = sortedLogs.map(log => {
        const logDate = new Date(log.date);
        const isToday = logDate.toDateString() === today;
        
        return `
        <div class="log-entry" data-id="${log.id}">
            <div class="log-entry-header">
                <div class="log-meta">
                    <span class="log-date">${formatDate(log.date)}</span>
                    ${log.mood ? `<span class="log-mood">${getMoodEmoji(log.mood)}</span>` : ''}
                </div>
                <div class="log-actions-btns">
                    ${isToday ? `
                        <button class="log-edit" onclick="openEditModal('${log.id}')" title="Edit log">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                    ` : ''}
                    <button class="log-delete" onclick="deleteLog('${log.id}')" title="Delete log">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="log-content">${escapeHtml(log.content)}</div>
            ${log.photo ? `<img class="log-photo" src="${log.photo}" alt="Log photo">` : ''}
        </div>
    `}).join('');
}

function getMoodEmoji(mood) {
    const moods = {
        amazing: '🤩',
        good: '😊',
        okay: '😐',
        meh: '😕',
        tough: '😤'
    };
    return moods[mood] || '';
}

// ===== Add/Update Log =====
function addLog() {
    const content = logInput.value.trim();
    if (!content || !currentGoalId) return;
    
    const todaysLog = getTodaysLog();
    
    if (todaysLog) {
        // Update existing log - NO art, just update
        todaysLog.content = content;
        todaysLog.mood = selectedMood;
        if (selectedPhoto) todaysLog.photo = selectedPhoto;
        
        saveData();
        renderLogs();
        renderGoalCalendar();
        
        // Clear photo selection
        selectedPhoto = null;
        photoPreview.style.display = 'none';
        photoPreviewImg.src = '';
        
        // No art burst on edit, just a subtle encouragement
        showEncouragement();
    } else {
        // Create new log
        if (!logs[currentGoalId]) logs[currentGoalId] = [];
        
        const now = new Date();
        const hour = now.getHours();
        const isEarlyBird = hour < 7;
        const isNightOwl = hour >= 23;
        
        const newLog = {
            id: generateId(),
            content: content,
            date: now.toISOString(),
            mood: selectedMood,
            photo: selectedPhoto
        };
        
        logs[currentGoalId].push(newLog);
        
        // Update user data
        userData.totalLogs++;
        if (selectedPhoto) userData.photosAdded++;
        if (isEarlyBird) userData.earlyBirdLogs++;
        if (isNightOwl) userData.nightOwlLogs = (userData.nightOwlLogs || 0) + 1;
        
        // Calculate XP
        let xpGained = XP_PER_LOG;
        const streak = calculateStreak();
        if (streak >= 3) xpGained += XP_BONUS_STREAK;
        if (selectedPhoto) xpGained += XP_BONUS_PHOTO;
        
        addXP(xpGained);
        
        // Save and update UI
        saveData();
        renderLogs();
        renderGoals();
        renderHeatmap();
        renderGoalCalendar();
        updateStats();
        updateGoalProgress();
        updateWeeklyReview();
        
        // Clear inputs
        selectedPhoto = null;
        photoPreview.style.display = 'none';
        photoPreviewImg.src = '';
        
        // Effects
        playSound('log');
        showEncouragement();
        
        if (typeof generativeArt !== 'undefined') {
            generativeArt.burst();
        }
        
        // Check achievements
        checkAchievements();
    }
    
    updateAddLogButton();
}

// ===== Edit Log Modal =====
function setupEditLogModal() {
    if (editLogSaveBtn) {
        editLogSaveBtn.addEventListener('click', saveEditedLog);
    }
    if (editLogCancelBtn) {
        editLogCancelBtn.addEventListener('click', closeEditModal);
    }
}

function openEditModal(logId) {
    const goalLogs = logs[currentGoalId] || [];
    const log = goalLogs.find(l => l.id === logId);
    
    if (!log) return;
    
    // Check if log is from today
    const today = new Date().toDateString();
    const logDate = new Date(log.date).toDateString();
    
    if (logDate !== today) {
        alert('You can only edit logs from today!');
        return;
    }
    
    editingLogId = logId;
    editLogInput.value = log.content;
    editLogModal.classList.add('show');
}

function closeEditModal() {
    editLogModal.classList.remove('show');
    editingLogId = null;
}

function saveEditedLog() {
    if (!editingLogId) return;
    
    const goalLogs = logs[currentGoalId] || [];
    const log = goalLogs.find(l => l.id === editingLogId);
    
    if (log) {
        log.content = editLogInput.value.trim();
        saveData();
        renderLogs();
        updateAddLogButton();
    }
    
    closeEditModal();
}

// ===== XP System =====
function addXP(amount) {
    userData.xp += amount;
    
    while (userData.xp >= XP_PER_LEVEL) {
        userData.xp -= XP_PER_LEVEL;
        userData.level++;
        onLevelUp();
    }
    
    updateXPDisplay();
    saveData();
}

function removeXP(amount) {
    userData.xp -= amount;
    
    // Handle level down if XP goes negative
    while (userData.xp < 0 && userData.level > 1) {
        userData.level--;
        userData.xp += XP_PER_LEVEL;
    }
    
    // Ensure XP doesn't go below 0 at level 1
    if (userData.level === 1 && userData.xp < 0) {
        userData.xp = 0;
    }
    
    updateXPDisplay();
    saveData();
}

function onLevelUp() {
    playSound('levelup');
    
    if (typeof confettiSystem !== 'undefined') {
        confettiSystem.burst();
    }
    
    if (typeof generativeArt !== 'undefined') {
        generativeArt.celebrationBurst();
    }
    
    showAchievementPopup(`Level ${userData.level}!`, '🎉');
}

function updateXPDisplay() {
    levelNumber.textContent = userData.level;
    const percent = (userData.xp / XP_PER_LEVEL) * 100;
    xpBar.style.width = `${percent}%`;
    xpText.textContent = `${userData.xp} / ${XP_PER_LEVEL} XP`;
}

// ===== Check for new achievements =====
function checkAchievements() {
    const data = {
        totalLogs: userData.totalLogs,
        streak: calculateStreak(),
        level: userData.level,
        goalsLogged: Object.keys(logs).filter(k => logs[k].length > 0).length,
        photosAdded: userData.photosAdded,
        earlyBirdLogs: userData.earlyBirdLogs,
        nightOwlLogs: userData.nightOwlLogs || 0
    };
    
    achievementDefinitions.forEach(ach => {
        if (!userData.achievements.includes(ach.id) && ach.check(data)) {
            unlockAchievement(ach);
        }
    });
}

// ===== Achievements =====
function renderAchievements() {
    achievementsGrid.innerHTML = achievementDefinitions.map(ach => {
        const unlocked = userData.achievements.includes(ach.id);
        return `
            <div class="achievement-badge ${unlocked ? 'unlocked' : ''}" 
                 data-tooltip="${ach.name}: ${ach.description}">
                ${ach.emoji}
            </div>
        `;
    }).join('');
    
    // Setup tooltip handlers
    setupAchievementTooltips();
}

function setupAchievementTooltips() {
    const tooltip = document.getElementById('customTooltip');
    const badges = document.querySelectorAll('.achievement-badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', (e) => {
            const text = badge.getAttribute('data-tooltip');
            tooltip.textContent = text;
            tooltip.classList.add('visible');
            
            // Position to the right of the sidebar (fixed position)
            const rect = badge.getBoundingClientRect();
            tooltip.style.left = '340px';
            tooltip.style.top = `${rect.top + rect.height / 2}px`;
            tooltip.style.transform = 'translateY(-50%)';
        });
        
        badge.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
}

// ===== Recheck and revoke achievements =====
function recheckAchievements() {
    const data = {
        totalLogs: userData.totalLogs,
        streak: calculateStreak(),
        level: userData.level,
        goalsLogged: Object.keys(logs).filter(k => logs[k].length > 0).length,
        photosAdded: userData.photosAdded,
        earlyBirdLogs: userData.earlyBirdLogs,
        nightOwlLogs: userData.nightOwlLogs || 0
    };
    
    // Identify achievements to revoke
    const achievementsToKeep = [];
    const achievementsToRevoke = [];
    
    userData.achievements.forEach(achId => {
        const achievement = achievementDefinitions.find(a => a.id === achId);
        if (achievement && achievement.check(data)) {
            achievementsToKeep.push(achId);
        } else {
            achievementsToRevoke.push(achId);
        }
    });
    
    // Notify for revoked achievements
    achievementsToRevoke.forEach(achId => {
        const achievement = achievementDefinitions.find(a => a.id === achId);
        if (achievement) {
            showAchievementPopup(`Revoked: ${achievement.name}`, '📉');
        }
    });
    
    userData.achievements = achievementsToKeep;
    saveData();
}

function unlockAchievement(achievement) {
    userData.achievements.push(achievement.id);
    saveData();
    
    showAchievementPopup(achievement.name, achievement.emoji);
    
    if (typeof confettiSystem !== 'undefined') {
        confettiSystem.burst();
    }
    
    renderAchievements();
}

// Notification Queue
const notificationQueue = [];
let isShowingNotification = false;

function showAchievementPopup(name, emoji) {
    notificationQueue.push({ name, emoji });
    processNotificationQueue();
}

function processNotificationQueue() {
    if (isShowingNotification || notificationQueue.length === 0) return;
    
    isShowingNotification = true;
    const notification = notificationQueue.shift();
    
    achievementPopup.querySelector('.achievement-icon').textContent = notification.emoji;
    achievementName.textContent = notification.name;
    achievementPopup.classList.add('show');
    
    // Play sound if enabled
    playSound('achievement');
    
    setTimeout(() => {
        achievementPopup.classList.remove('show');
        isShowingNotification = false;
        
        // Wait a brief moment before showing the next one
        setTimeout(() => {
            processNotificationQueue();
        }, 300);
    }, 3000);
}

// ===== Encouragement =====
function showEncouragement() {
    const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
    encouragementText.textContent = msg;
    encouragementToast.classList.add('show');
    
    setTimeout(() => {
        encouragementToast.classList.remove('show');
    }, 2500);
}

// ===== Quote =====
function updateQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
}

// ===== Heatmap =====
function renderHeatmap() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    
    const logsByDate = {};
    Object.values(logs).forEach(goalLogs => {
        goalLogs.forEach(log => {
            const dateStr = new Date(log.date).toDateString();
            logsByDate[dateStr] = (logsByDate[dateStr] || 0) + 1;
        });
    });
    
    let html = '';
    for (let i = 0; i < 371; i++) {
        const date = new Date(startOfYear);
        date.setDate(date.getDate() + i);
        
        if (date > today) {
            html += `<div class="heatmap-cell level-0" title="Future"></div>`;
            continue;
        }
        
        const count = logsByDate[date.toDateString()] || 0;
        let level = 0;
        if (count >= 5) level = 4;
        else if (count >= 3) level = 3;
        else if (count >= 2) level = 2;
        else if (count >= 1) level = 1;
        
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        html += `<div class="heatmap-cell level-${level}" title="${dateStr}: ${count} logs"></div>`;
    }
    
    heatmapContainer.innerHTML = html;
}

// ===== Weekly Review =====
function updateWeeklyReview() {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    let weekLogCount = 0;
    let goalsWorked = new Set();
    
    Object.entries(logs).forEach(([goalId, goalLogs]) => {
        goalLogs.forEach(log => {
            if (new Date(log.date) >= weekAgo) {
                weekLogCount++;
                goalsWorked.add(goalId);
            }
        });
    });
    
    const weekXPVal = weekLogCount * XP_PER_LOG;
    
    weekLogs.textContent = weekLogCount;
    weekGoals.textContent = goalsWorked.size;
    weekXP.textContent = weekXPVal;
    
    if (weekLogCount === 0) {
        reviewSummary.textContent = "Start logging to see your weekly summary!";
    } else if (weekLogCount < 7) {
        reviewSummary.textContent = `Good start! Try to log at least once per day to build momentum.`;
    } else if (weekLogCount < 14) {
        reviewSummary.textContent = `Solid week! You're averaging about ${(weekLogCount / 7).toFixed(1)} logs per day.`;
    } else {
        reviewSummary.textContent = `Incredible week! You're crushing it with ${weekLogCount} logs. Keep this energy! 🔥`;
    }
}

// ===== Mantra =====
function updateMantraDisplay() {
    if (userData.mantra) {
        mantraText.textContent = userData.mantra;
        mantraText.style.fontStyle = 'italic';
    } else {
        mantraText.textContent = 'Click to set your mantra...';
        mantraText.style.fontStyle = 'normal';
    }
}

mantraEditBtn.addEventListener('click', () => {
    mantraInput.value = userData.mantra || '';
    mantraModal.classList.add('show');
});

mantraText.addEventListener('click', () => {
    mantraInput.value = userData.mantra || '';
    mantraModal.classList.add('show');
});

mantraSaveBtn.addEventListener('click', () => {
    userData.mantra = mantraInput.value.trim();
    saveData();
    updateMantraDisplay();
    mantraModal.classList.remove('show');
});

mantraCancelBtn.addEventListener('click', () => {
    mantraModal.classList.remove('show');
});

// ===== Mood Selection =====
moodOptions.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        moodOptions.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedMood = btn.dataset.mood;
    });
});

// ===== Photo Upload =====
photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        selectedPhoto = event.target.result;
        photoPreviewImg.src = selectedPhoto;
        photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

photoRemoveBtn.addEventListener('click', () => {
    selectedPhoto = null;
    photoPreviewImg.src = '';
    photoPreview.style.display = 'none';
    photoInput.value = '';
});

// ===== Delete Log =====
function deleteLog(logId) {
    if (!currentGoalId || !logs[currentGoalId]) return;
    
    // Find the log to check if it has a photo
    const logToDelete = logs[currentGoalId].find(log => log.id === logId);
    const hadPhoto = logToDelete && logToDelete.photo;
    
    // Remove log from storage
    logs[currentGoalId] = logs[currentGoalId].filter(log => log.id !== logId);
    
    // Notify user of lost XP (do this before recalculating so they know why)
    showAchievementPopup(`Lost ${XP_PER_LOG} XP`, '📉');
    
    // Recalculate ALL user data from scratch to ensure perfect sync
    // This handles totalLogs, photosAdded, earlyBirdLogs, nightOwlLogs, level, and XP
    recalculateUserData(); 
    
    renderLogs();
    renderGoals();
    renderHeatmap();
    renderGoalCalendar();
    updateStats();
    updateGoalProgress();
    updateWeeklyReview();
    updateAddLogButton();
    updateXPDisplay();
    renderAchievements();
}

// ===== Stats =====
function updateStats() {
    let total = 0;
    Object.values(logs).forEach(goalLogs => {
        total += goalLogs.length;
    });
    totalLogsEl.textContent = total;
    
    const streak = calculateStreak();
    currentStreakEl.textContent = streak;
    
    // Update fire animation based on streak (cyan theme)
    if (streak >= 7) {
        streakFire.style.fontSize = '1.75rem';
        streakFire.style.filter = 'drop-shadow(0 0 10px #00d4ff)';
    } else if (streak >= 3) {
        streakFire.style.fontSize = '1.5rem';
        streakFire.style.filter = 'drop-shadow(0 0 8px #00d4ff)';
    } else {
        streakFire.style.fontSize = '1.25rem';
        streakFire.style.filter = 'drop-shadow(0 0 6px #00d4ff)';
    }
}

function calculateStreak() {
    const allDates = new Set();
    Object.values(logs).forEach(goalLogs => {
        goalLogs.forEach(log => {
            const date = new Date(log.date).toDateString();
            allDates.add(date);
        });
    });
    
    if (allDates.size === 0) return 0;
    
    const sortedDates = Array.from(allDates)
        .map(d => new Date(d))
        .sort((a, b) => b - a);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const latestLog = sortedDates[0];
    latestLog.setHours(0, 0, 0, 0);
    
    if (latestLog < yesterday) return 0;
    
    let streak = 1;
    let currentDate = latestLog;
    
    for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        
        const logDate = sortedDates[i];
        logDate.setHours(0, 0, 0, 0);
        
        if (logDate.getTime() === prevDate.getTime()) {
            streak++;
            currentDate = logDate;
        } else {
            break;
        }
    }
    
    return streak;
}

// ===== Toggle UI =====
toggleUIBtn.addEventListener('click', toggleUI);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close modals first
        if (mantraModal.classList.contains('show')) {
            mantraModal.classList.remove('show');
            return;
        }
        if (editLogModal && editLogModal.classList.contains('show')) {
            closeEditModal();
            return;
        }
        toggleUI();
    }
});

function toggleUI() {
    document.body.classList.toggle('ui-hidden');
    // Art is only drawn when logging - not when hiding UI
}

// ===== Sound Toggle =====
soundToggleBtn.addEventListener('click', () => {
    userData.soundEnabled = !userData.soundEnabled;
    document.body.classList.toggle('sound-off', !userData.soundEnabled);
    saveData();
});

// ===== Event Listeners =====
addLogBtn.addEventListener('click', addLog);

logInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addLog();
    }
});

// Art is only drawn when logging - removed focus trigger

// ===== Helpers =====
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
        return `Today at ${formatTime(date)}`;
    }
    
    if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${formatTime(date)}`;
    }
    
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${date.toLocaleDateString('en-US', options)} at ${formatTime(date)}`;
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
