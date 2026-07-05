const components = [
  "Strength",
  "Agility",
  "Speed",
  "Reaction Time",
  "Endurance",
  "Flexibility",
  "Balance",
  "Coordination",
  "Power",
];

const navItems = [
  ["dashboard", "Dashboard", "D"],
  ["team", "Team", "T"],
  ["athlete", "Profile", "P"],
  ["attendance", "Attendance", "A"],
  ["tests", "Tests", "X"],
  ["tournaments", "Tournaments", "G"],
  ["leave", "Leave", "L"],
  ["announcements", "News", "N"],
  ["chat", "Chat", "C"],
  ["calendar", "Calendar", "K"],
  ["goals", "Goals", "Q"],
  ["planner", "Planner", "S"],
  ["sync", "Sync", "Y"],
  ["settings", "Settings", "W"],
  ["audit", "Audit", "U"],
  ["reports", "Reports", "R"],
];

const defaultTestDefinitions = [
  makeTestDefinition("strength-test", "Strength", "Push-Up Control", "reps", 0, 60, 32, false, "Quality reps completed."),
  makeTestDefinition("agility-test", "Agility", "5-10-5 Agility", "sec", 4, 8, 5.4, true, "Lower time converts into higher agility."),
  makeTestDefinition("speed-test", "Speed", "40m Sprint", "sec", 4.5, 9, 6.1, true, "Lower sprint time converts into higher speed."),
  makeTestDefinition("reaction-time-test", "Reaction Time", "Reaction Tap Test", "/10", 0, 10, 8, false, "Quick response drill scored out of 10."),
  makeTestDefinition("endurance-test", "Endurance", "Endurance Beep Test", "level", 1, 15, 9, false, "Higher beep-test level converts into endurance."),
  makeTestDefinition("flexibility-test", "Flexibility", "Sit and Reach", "cm", 0, 40, 24, false, "Flexibility distance in centimeters."),
  makeTestDefinition("balance-test", "Balance", "Single-Leg Balance", "sec", 0, 60, 42, false, "Stable hold time in seconds."),
  makeTestDefinition("coordination-test", "Coordination", "Wall Toss Coordination", "catches", 0, 40, 28, false, "Successful catches in one round."),
  makeTestDefinition("power-test", "Power", "Vertical Power Test", "/10", 0, 10, 8, false, "Coach records the athlete result out of 10."),
];

let currentTestDefinitions = normalizeTestDefinitions(JSON.parse(localStorage.getItem("apt-test-definitions") || "null") || defaultTestDefinitions);

const defaultAccounts = [
  { username: "coach", email: "coach@apt.demo", password: "coach123", name: "Coach Rivera", role: "Coach" },
  { username: "admin", email: "admin@apt.demo", password: "admin123", name: "Admin Morgan", role: "Admin" },
  { username: "moderator", email: "moderator@apt.demo", password: "mod123", name: "Moderator Chen", role: "Moderator" },
];

const defaultTournaments = [
  { id: "t1", name: "District Qualifiers", date: "2026-08-12", location: "Northview Stadium", notes: "Finalize top 12 roster two weeks before event." },
  { id: "t2", name: "Varsity Invitational", date: "2026-09-05", location: "City Sports Complex", notes: "Travel list due after final endurance test." },
];

const defaultAnnouncements = [
  { id: "n1", title: "Weekly testing window", body: "All athletes should complete their component tests before Friday practice.", audience: "All", date: "2026-07-05", author: "Coach Rivera" },
];

const defaultSessions = [
  { id: "s1", title: "Speed and reaction block", date: "2026-07-08", focus: "Speed", notes: "Warm-up, sprint mechanics, reaction tap test, cooldown." },
];

const defaultMessages = [
  { id: "m1", sender: "Coach Rivera", senderEmail: "coach@apt.demo", recipient: "All", body: "Welcome to the team chat. Use this for practice updates, questions, and reminders.", date: "2026-07-05T08:00:00.000Z" },
];

const defaultReminders = [
  { id: "r1", title: "Export July performance reports", date: "2026-07-30", audience: "Coaches" },
];

const defaultGoals = [
  { id: "g1", athleteId: "a1", title: "Reach 90 overall rating", component: "Overall", target: 90, dueDate: "2026-08-01", status: "Active", notes: "Focus on power and reaction blocks." },
];

const sportTemplates = {
  General: { Strength: 12, Agility: 12, Speed: 12, "Reaction Time": 10, Endurance: 12, Flexibility: 10, Balance: 10, Coordination: 10, Power: 12 },
  Basketball: { Strength: 10, Agility: 16, Speed: 12, "Reaction Time": 14, Endurance: 10, Flexibility: 8, Balance: 8, Coordination: 12, Power: 10 },
  Soccer: { Strength: 8, Agility: 14, Speed: 14, "Reaction Time": 10, Endurance: 18, Flexibility: 8, Balance: 8, Coordination: 12, Power: 8 },
  Volleyball: { Strength: 10, Agility: 10, Speed: 8, "Reaction Time": 12, Endurance: 8, Flexibility: 10, Balance: 10, Coordination: 12, Power: 20 },
  Track: { Strength: 10, Agility: 8, Speed: 20, "Reaction Time": 12, Endurance: 14, Flexibility: 8, Balance: 6, Coordination: 6, Power: 16 },
};

const defaultBackendUrl = "https://athlete-performance-backend.onrender.com";

const seedAthletes = [
  makeAthlete("a1", "Maya Santos", 17, "Track and Field", "Sprinter", "maya.santos@school.edu", "MAYA-88", [
    makeTestFromActivities("2026-06-20", { verticalJump: 8.6, sprint40: 5.4, shuttle: 5.1, reaction: 8.2, beep: 10.8, sitReach: 27, balanceHold: 46, wallToss: 31, pushups: 38 }, "Explosive starts are improving."),
    makeTestFromActivities("2026-07-04", { verticalJump: 9.4, sprint40: 5.1, shuttle: 4.9, reaction: 8.8, beep: 11.3, sitReach: 29, balanceHold: 50, wallToss: 34, pushups: 42 }, "Ready for varsity sprint relay."),
  ], [
    { date: "2026-06-28", status: "Present" },
    { date: "2026-06-30", status: "Present" },
    { date: "2026-07-02", status: "Late" },
    { date: "2026-07-04", status: "Present" },
  ]),
  makeAthlete("a2", "Jordan Lee", 16, "Basketball", "Guard", "jordan.lee@school.edu", "JORDAN-84", [
    makeTestFromActivities("2026-06-20", { verticalJump: 8, sprint40: 5.8, shuttle: 5.2, reaction: 8.9, beep: 9.9, sitReach: 23, balanceHold: 45, wallToss: 35, pushups: 34 }, "Good court movement."),
    makeTestFromActivities("2026-07-04", { verticalJump: 8.5, sprint40: 5.6, shuttle: 5, reaction: 9.2, beep: 10.4, sitReach: 24, balanceHold: 48, wallToss: 36, pushups: 37 }, "Reaction and coordination trending up."),
  ], [
    { date: "2026-06-28", status: "Present" },
    { date: "2026-06-30", status: "Absent" },
    { date: "2026-07-02", status: "Present" },
    { date: "2026-07-04", status: "Present" },
  ]),
  makeAthlete("a3", "Ari Patel", 15, "Soccer", "Midfielder", "ari.patel@school.edu", "ARI-81", [
    makeTestFromActivities("2026-06-20", { verticalJump: 7.4, sprint40: 5.9, shuttle: 5.4, reaction: 7.9, beep: 12.4, sitReach: 25, balanceHold: 44, wallToss: 30, pushups: 30 }, "Excellent endurance base."),
    makeTestFromActivities("2026-07-04", { verticalJump: 7.8, sprint40: 5.7, shuttle: 5.2, reaction: 8.1, beep: 12.8, sitReach: 26, balanceHold: 47, wallToss: 32, pushups: 33 }, "Keep building strength."),
  ], [
    { date: "2026-06-28", status: "Excused" },
    { date: "2026-06-30", status: "Present" },
    { date: "2026-07-02", status: "Present" },
    { date: "2026-07-04", status: "Late" },
  ]),
  makeAthlete("a4", "Lena Brooks", 18, "Volleyball", "Outside Hitter", "lena.brooks@school.edu", "LENA-83", [
    makeTestFromActivities("2026-06-20", { verticalJump: 8.9, sprint40: 6.2, shuttle: 5.6, reaction: 8, beep: 9.5, sitReach: 30, balanceHold: 52, wallToss: 32, pushups: 40 }, "Power and balance lead the group."),
    makeTestFromActivities("2026-07-04", { verticalJump: 9.2, sprint40: 5.9, shuttle: 5.3, reaction: 8.3, beep: 9.8, sitReach: 31, balanceHold: 54, wallToss: 34, pushups: 44 }, "Strong all-around rating."),
  ], [
    { date: "2026-06-28", status: "Present" },
    { date: "2026-06-30", status: "Present" },
    { date: "2026-07-02", status: "Present" },
    { date: "2026-07-04", status: "Present" },
  ]),
];

const state = {
  user: JSON.parse(localStorage.getItem("apt-user") || "null"),
  teamName: localStorage.getItem("apt-team") || "Northview Varsity",
  teamCode: localStorage.getItem("apt-team-code") || "NORTHVIEW-2026",
  accounts: normalizeAccounts(JSON.parse(localStorage.getItem("apt-accounts") || "null") || defaultAccounts),
  testDefinitions: currentTestDefinitions,
  tournaments: JSON.parse(localStorage.getItem("apt-tournaments") || "null") || defaultTournaments,
  announcements: JSON.parse(localStorage.getItem("apt-announcements") || "null") || defaultAnnouncements,
  sessions: JSON.parse(localStorage.getItem("apt-sessions") || "null") || defaultSessions,
  messages: JSON.parse(localStorage.getItem("apt-messages") || "null") || defaultMessages,
  reminders: JSON.parse(localStorage.getItem("apt-reminders") || "null") || defaultReminders,
  goals: JSON.parse(localStorage.getItem("apt-goals") || "null") || defaultGoals,
  leaveRequests: JSON.parse(localStorage.getItem("apt-leave-requests") || "null") || [],
  auditLog: JSON.parse(localStorage.getItem("apt-audit-log") || "null") || [],
  leaveAllowance: Number(localStorage.getItem("apt-leave-allowance") || 10),
  teamLogo: localStorage.getItem("apt-team-logo") || "",
  backendUrl: localStorage.getItem("apt-backend-url") || defaultBackendUrl,
  componentWeights: normalizeWeights(JSON.parse(localStorage.getItem("apt-component-weights") || "null") || sportTemplates.General),
  privacy: JSON.parse(localStorage.getItem("apt-privacy") || "null") || { athleteCanViewRankings: false, athleteCanViewTeamChat: true, showPrivateNotesToAthletes: false },
  athletes: normalizeAthletes(JSON.parse(localStorage.getItem("apt-athletes") || "null") || seedAthletes),
  page: "dashboard",
  selectedAthleteId: localStorage.getItem("apt-selected-athlete") || "a1",
  rankingMetric: "Overall",
  attendanceDate: new Date().toISOString().slice(0, 10),
  loginMode: "coach",
  authMode: "login",
  resetEmail: "",
  resetCode: "",
};
currentTestDefinitions = state.testDefinitions;

function makeTestDefinition(id, component, name, unit, min, max, defaultValue, lowerIsBetter, help, inputType = "number") {
  return { id, component, name, unit, min, max, defaultValue, lowerIsBetter, help, inputType };
}

function normalizeTestDefinitions(definitions) {
  const byComponent = new Map((definitions || []).map((definition) => [definition.component, definition]));
  return components.map((component) => {
    const fallback = defaultTestDefinitions.find((definition) => definition.component === component);
    const saved = byComponent.get(component) || {};
    return {
      ...fallback,
      ...saved,
      id: saved.id || fallback.id,
      component,
      min: Number(saved.min ?? fallback.min),
      max: Number(saved.max ?? fallback.max),
      defaultValue: Number(saved.defaultValue ?? fallback.defaultValue),
      lowerIsBetter: Boolean(saved.lowerIsBetter ?? fallback.lowerIsBetter),
      inputType: saved.inputType || fallback.inputType || "number",
    };
  });
}

function testDefinitions() {
  return currentTestDefinitions;
}

function normalizeWeights(weights) {
  const source = weights || {};
  const normalized = {};
  components.forEach((component) => {
    normalized[component] = Math.max(0, Number(source[component] ?? sportTemplates.General[component] ?? 10));
  });
  return normalized;
}

function weightedAverageScores(scores) {
  const weights = normalizeWeights(state.componentWeights);
  const totalWeight = components.reduce((sum, component) => sum + weights[component], 0) || components.length;
  const weighted = components.reduce((sum, component) => sum + Number(scores[component] || 0) * weights[component], 0);
  return Math.round(weighted / totalWeight);
}

function normalizeAccounts(accounts) {
  return accounts.map((account) => ({
    username: account.username || emailToUsername(account.email),
    email: accountEmail(account),
    password: account.password,
    name: account.name || account.username,
    role: account.role || "Coach",
  }));
}

function accountEmail(account) {
  if (account.email) return normalizeEmail(account.email);
  const known = {
    coach: "coach@apt.demo",
    admin: "admin@apt.demo",
    moderator: "moderator@apt.demo",
  };
  return known[account.username] || `${normalizeEmail(account.username)}@apt.local`;
}

function makeAthlete(id, name, age, sport, position, contact, accessCode, tests, attendance) {
  return { id, name, age, sport, position, contact, accessCode, tests, attendance };
}

function normalizeAthletes(athletes) {
  return athletes.map((athlete, index) => ({
    ...athlete,
    contact: normalizeEmail(athlete.contact || `${athlete.name.split(" ")[0]}@athlete.local`),
    password: athlete.password || "athlete123",
    photo: athlete.photo || "",
    injuryStatus: athlete.injuryStatus || "Available",
    emergencyContact: athlete.emergencyContact || "",
    accessCode: athlete.accessCode || `${athlete.name.split(" ")[0].toUpperCase()}-${80 + index}`,
    tests: athlete.tests.map((test) => normalizeSavedTest(test)),
  }));
}

function convertLegacyTest(test) {
  return {
    ...test,
    activities: defaultActivitiesFromScores(test.scores || {}),
    scores: test.scores || calibrateStats(defaultActivities()),
  };
}

function normalizeSavedTest(test) {
  const normalized = test.activities ? { ...test } : convertLegacyTest(test);
  const activities = normalizeActivityKeys(normalized.activities || {});
  testDefinitions().forEach((definition) => {
    if (activities[definition.id] == null) {
      activities[definition.id] = normalized.scores?.[definition.component] != null
        ? scoreToRaw(definition, normalized.scores[definition.component])
        : definition.defaultValue;
    }
  });
  return {
    ...normalized,
    activities,
    scores: calibrateStats(activities),
  };
}

function normalizeActivityKeys(activities) {
  const aliasMap = {
    "strength-test": ["pushups", "strength", "pushUpControl"],
    "agility-test": ["shuttle", "agility", "agilityTest"],
    "speed-test": ["sprint40", "speed", "sprint"],
    "reaction-time-test": ["reaction", "reactionTime", "reactionTap"],
    "endurance-test": ["beep", "endurance", "beepTest"],
    "flexibility-test": ["sitReach", "flexibility"],
    "balance-test": ["balanceHold", "balance"],
    "coordination-test": ["wallToss", "coordination"],
    "power-test": ["verticalJump", "power", "verticalPower"],
  };
  const normalized = { ...activities };
  testDefinitions().forEach((definition) => {
    if (normalized[definition.id] != null) return;
    const alias = (aliasMap[definition.id] || []).find((key) => activities[key] != null);
    if (alias) normalized[definition.id] = activities[alias];
  });
  return normalized;
}

function defaultActivitiesFromScores(scores) {
  const activities = {};
  testDefinitions().forEach((test) => {
    activities[test.id] = scoreToRaw(test, scores[test.component] || 70);
  });
  return activities;
}

function defaultActivities() {
  const activities = {};
  testDefinitions().forEach((test) => activities[test.id] = test.defaultValue);
  return activities;
}

function makeTestFromActivities(date, activities, remarks = "") {
  return {
    id: cryptoId(),
    date,
    createdAt: new Date().toISOString(),
    activities: normalizeActivityKeys(activities),
    scores: calibrateStats(activities),
    remarks,
  };
}

function calibrateStats(activities) {
  const calibrated = {};
  const normalizedActivities = normalizeActivityKeys(activities || {});
  testDefinitions().forEach((test) => {
    const raw = Number(normalizedActivities[test.id] ?? test.defaultValue);
    calibrated[test.component] = activityScore(test, raw);
  });
  return calibrated;
}

function activityScore(test, rawValue) {
  const raw = clamp(rawValue, test.min, test.max);
  const range = test.max - test.min || 1;
  const ratio = test.lowerIsBetter ? (test.max - raw) / range : (raw - test.min) / range;
  return clamp(Math.round(ratio * 100), 1, 100);
}

function scoreToRaw(test, score) {
  const range = test.max - test.min || 1;
  const ratio = clamp(score, 1, 100) / 100;
  const raw = test.lowerIsBetter ? test.max - (ratio * range) : test.min + (ratio * range);
  return Math.round(raw * 10) / 10;
}

function cryptoId() {
  return "id-" + Math.random().toString(36).slice(2, 10);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeTeamCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function emailToUsername(email) {
  return normalizeEmail(email).split("@")[0] || `user-${Math.floor(Math.random() * 1000)}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function isPasswordValid(password) {
  return String(password || "").length >= 6;
}

function emailExists(email) {
  const normalized = normalizeEmail(email);
  return state.accounts.some((account) => normalizeEmail(account.email) === normalized)
    || state.athletes.some((athlete) => normalizeEmail(athlete.contact) === normalized);
}

function uniqueAccessCode(name) {
  const base = String(name || "ATHLETE").split(/\s+/)[0].toUpperCase().replace(/[^A-Z0-9]/g, "") || "ATHLETE";
  let code = `${base}-${Math.floor(100 + Math.random() * 900)}`;
  while (state.athletes.some((athlete) => athlete.accessCode === code)) {
    code = `${base}-${Math.floor(100 + Math.random() * 900)}`;
  }
  return code;
}

function save() {
  localStorage.setItem("apt-user", JSON.stringify(state.user));
  localStorage.setItem("apt-team", state.teamName);
  localStorage.setItem("apt-team-code", state.teamCode);
  localStorage.setItem("apt-team-logo", state.teamLogo);
  localStorage.setItem("apt-backend-url", state.backendUrl);
  localStorage.setItem("apt-leave-allowance", String(state.leaveAllowance));
  localStorage.setItem("apt-accounts", JSON.stringify(state.accounts));
  localStorage.setItem("apt-test-definitions", JSON.stringify(state.testDefinitions));
  localStorage.setItem("apt-tournaments", JSON.stringify(state.tournaments));
  localStorage.setItem("apt-announcements", JSON.stringify(state.announcements));
  localStorage.setItem("apt-sessions", JSON.stringify(state.sessions));
  localStorage.setItem("apt-messages", JSON.stringify(state.messages.slice(-250)));
  localStorage.setItem("apt-reminders", JSON.stringify(state.reminders));
  localStorage.setItem("apt-goals", JSON.stringify(state.goals));
  localStorage.setItem("apt-component-weights", JSON.stringify(state.componentWeights));
  localStorage.setItem("apt-privacy", JSON.stringify(state.privacy));
  localStorage.setItem("apt-leave-requests", JSON.stringify(state.leaveRequests));
  localStorage.setItem("apt-audit-log", JSON.stringify(state.auditLog.slice(-150)));
  localStorage.setItem("apt-athletes", JSON.stringify(state.athletes));
  localStorage.setItem("apt-selected-athlete", state.selectedAthleteId || "");
}

function logAction(action, detail = "") {
  state.auditLog.push({
    id: cryptoId(),
    date: new Date().toISOString(),
    actor: state.user?.name || "System",
    role: state.user?.role || "Guest",
    action,
    detail,
  });
  state.auditLog = state.auditLog.slice(-150);
}

function average(values) {
  const clean = values.map(Number).filter((value) => !Number.isNaN(value));
  if (!clean.length) return 0;
  return Math.round(clean.reduce((sum, value) => sum + value, 0) / clean.length);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value || 0)));
}

function latestTest(athlete) {
  return athlete.tests
    .map((test, index) => ({ test, index }))
    .sort((a, b) => testSortValue(b.test, b.index).localeCompare(testSortValue(a.test, a.index)))[0]?.test;
}

function previousTest(athlete) {
  return athlete.tests
    .map((test, index) => ({ test, index }))
    .sort((a, b) => testSortValue(b.test, b.index).localeCompare(testSortValue(a.test, a.index)))[1]?.test;
}

function testSortValue(test, index = 0) {
  return `${test.date || ""}T${test.createdAt || ""}:${String(index).padStart(5, "0")}`;
}

function overallRating(athlete) {
  const test = latestTest(athlete);
  return test ? weightedAverageScores(test.scores) : 0;
}

function attendancePercent(athlete) {
  const counted = athlete.attendance.filter((item) => item.status !== "Excused");
  if (!counted.length) return 0;
  const attended = counted.filter((item) => item.status === "Present" || item.status === "Late").length;
  return Math.round((attended / counted.length) * 100);
}

function todayAttendance() {
  return visibleAthletes().map((athlete) => ({
    athlete,
    record: athlete.attendance.find((item) => item.date === state.attendanceDate),
  }));
}

function isAthleteUser() {
  return state.user?.role === "Athlete";
}

function canEdit() {
  return ["Coach", "Admin", "Moderator"].includes(state.user?.role);
}

function canManageRoles() {
  return state.user?.role === "Admin";
}

function visibleAthletes() {
  if (isAthleteUser()) return state.athletes.filter((athlete) => athlete.id === state.user.athleteId);
  return state.athletes;
}

function selectedAthlete() {
  if (isAthleteUser()) return state.athletes.find((athlete) => athlete.id === state.user.athleteId);
  return state.athletes.find((athlete) => athlete.id === state.selectedAthleteId) || state.athletes[0];
}

function availableNavItems() {
  if (isAthleteUser()) {
    const athletePages = ["dashboard", "athlete", "tournaments", "leave", "announcements", "calendar", "goals", "reports"];
    if (state.privacy.athleteCanViewTeamChat) athletePages.push("chat");
    return navItems.filter(([id]) => athletePages.includes(id));
  }
  return navItems.filter(([id]) => id !== "audit" || canManageRoles());
}

function setPage(page) {
  if (!availableNavItems().some(([id]) => id === page)) page = "dashboard";
  state.page = page;
  render();
}

function app() {
  return document.getElementById("app");
}

function render() {
  if (!state.user) {
    renderLogin();
    return;
  }

  if (!availableNavItems().some(([id]) => id === state.page)) state.page = "dashboard";

  app().innerHTML = `
    <div class="app-shell game-shell">
      <aside class="sidebar game-sidebar">
        <div class="brand-lockup">
          <div class="mark">${state.teamLogo ? `<img src="${state.teamLogo}" alt="${state.teamName} logo" />` : "APT"}</div>
          <div>Athlete<br />Performance</div>
          <span class="role-pill">${state.user.role}</span>
        </div>
        <nav class="nav-list">
          ${availableNavItems().map(([id, label, icon]) => `
            <button class="nav-button ${state.page === id ? "active" : ""}" data-page="${id}">
              <span class="nav-icon">${icon}</span><span>${label}</span>
            </button>
          `).join("")}
        </nav>
        <div class="share-panel">
          <span>Team Share Code</span>
          <strong>${state.teamCode}</strong>
          <small>Athletes use this with their personal access code.</small>
        </div>
        <div class="sidebar-footer">
          <strong>${state.teamName}</strong><br />
          ${state.athletes.length} athletes tracked
        </div>
      </aside>
      <main class="main">
        <header class="topbar game-topbar">
          <div class="coach-meta">
            <div class="avatar">${initials(state.user.name)}</div>
            <div>
              <strong>${state.user.name}</strong>
              <div class="meta-line">${state.teamName}</div>
            </div>
          </div>
          <div class="btn-row">
            ${canEdit() ? `<button class="ghost-button" id="teamNameBtn">Team Setup</button>` : ""}
            <button class="ghost-button" id="logoutBtn">Sign Out</button>
          </div>
        </header>
        <div class="content">${renderPage()}</div>
        <nav class="mobile-tabs">
          <label for="mobilePageSelect">Section</label>
          <select id="mobilePageSelect" class="mobile-page-select">
            ${availableNavItems().map(([id, label, icon]) => `<option value="${id}" ${state.page === id ? "selected" : ""}>${icon} ${label}</option>`).join("")}
          </select>
        </nav>
      </main>
    </div>
  `;

  bindCommon();
  bindPage();
}

function renderLogin() {
  app().innerHTML = `
    <section class="login-shell game-login">
      <div class="login-copy">
        <div class="brand-lockup"><div class="mark">APT</div><div>Athlete Performance Tracker</div></div>
        <div>
          <h1>Performance Arena</h1>
          <p>Coach enters activity results. The app calibrates strength, speed, agility, reaction, endurance, and overall player rating automatically.</p>
        </div>
        <div class="login-stats">
          <div class="login-stat"><strong>9</strong><span>activity tests</span></div>
          <div class="login-stat"><strong>100</strong><span>auto rating scale</span></div>
          <div class="login-stat"><strong>Share</strong><span>athlete team access</span></div>
        </div>
      </div>
      <div class="login-card-wrap">
        <form class="login-card game-card" id="loginForm">
          <div class="segmented login-toggle">
            <button class="segment login-mode ${state.loginMode === "coach" ? "active" : ""}" type="button" data-mode="coach">Coach</button>
            <button class="segment login-mode ${state.loginMode === "athlete" ? "active" : ""}" type="button" data-mode="athlete">Athlete</button>
          </div>
          <div class="segmented login-toggle compact-toggle">
            <button class="segment auth-mode ${state.authMode === "login" ? "active" : ""}" type="button" data-auth="login">Login</button>
            <button class="segment auth-mode ${state.authMode === "signup" ? "active" : ""}" type="button" data-auth="signup">Create Account</button>
            <button class="segment auth-mode ${state.authMode === "forgot" ? "active" : ""}" type="button" data-auth="forgot">Forgot Password</button>
          </div>
          <h2>${loginTitle()}</h2>
          <p>${loginHelpText()}</p>
          ${state.loginMode === "coach" ? coachLoginFields() : athleteLoginFields()}
          <div class="login-error" id="loginError"></div>
          <button class="button game-button" type="submit">${submitLabel()}</button>
        </form>
      </div>
    </section>
  `;

  document.querySelectorAll(".login-mode").forEach((button) => {
    button.addEventListener("click", () => {
      state.loginMode = button.dataset.mode;
      renderLogin();
    });
  });

  document.querySelectorAll(".auth-mode").forEach((button) => {
    button.addEventListener("click", () => {
      state.authMode = button.dataset.auth;
      renderLogin();
    });
  });

  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (state.loginMode === "coach") {
      if (state.authMode === "forgot") return resetPassword();
      return state.authMode === "signup" ? createCoachAccount() : loginCoachAccount();
    }

    if (state.authMode === "forgot") return resetPassword();
    return state.authMode === "signup" ? createAthleteAccount() : loginAthleteAccount();
  });

  document.getElementById("sendResetCodeBtn")?.addEventListener("click", sendResetCode);
}

function loginTitle() {
  if (state.authMode === "forgot") return "Reset Password";
  if (state.loginMode === "coach" && state.authMode === "signup") return "Create Coach Account";
  if (state.loginMode === "athlete" && state.authMode === "signup") return "Create Athlete Account";
  return state.loginMode === "coach" ? "Coach Login" : "Athlete Login";
}

function loginHelpText() {
  if (state.authMode === "forgot") return "Enter the email used for this app. A reset code will be sent to that email.";
  if (state.loginMode === "coach" && state.authMode === "signup") return "Create a coach account with email and password. Admin can upgrade roles later.";
  if (state.loginMode === "athlete" && state.authMode === "signup") return "Use the team share code once, then login later with email and password.";
  if (state.loginMode === "coach") return "Demo: coach@apt.demo / coach123 or admin@apt.demo / admin123.";
  return "Login with the athlete email and password connected to the team.";
}

function submitLabel() {
  if (state.authMode === "forgot") return "Update Password";
  if (state.authMode === "signup") return state.loginMode === "coach" ? "Create Coach Account" : "Create Athlete Account";
  return state.loginMode === "coach" ? "Enter Coach Hub" : "View My Stats";
}

function coachLoginFields() {
  if (state.authMode === "forgot") return forgotPasswordFields();
  return `
    ${state.authMode === "signup" ? `
      <div class="field">
        <label for="coachName">Full Name</label>
        <input id="coachName" value="New Coach" autocomplete="name" required />
      </div>
    ` : ""}
    <div class="field">
      <label for="email">Email</label>
      <input id="email" type="email" value="${state.authMode === "login" ? "coach@apt.demo" : ""}" autocomplete="email" required />
    </div>
    <div class="field">
      <label for="password">Password</label>
      <input id="password" type="password" value="${state.authMode === "login" ? "coach123" : ""}" autocomplete="${state.authMode === "login" ? "current-password" : "new-password"}" required />
    </div>
  `;
}

function athleteLoginFields() {
  if (state.authMode === "forgot") return forgotPasswordFields();
  return `
    ${state.authMode === "signup" ? `
      <div class="field">
        <label for="athleteName">Full Name</label>
        <input id="athleteName" value="New Athlete" autocomplete="name" required />
      </div>
      <div class="field">
        <label for="teamCode">Team Share Code</label>
        <input id="teamCode" value="${state.teamCode}" required />
      </div>
      <div class="form-grid compact-fields">
        <div class="field"><label for="athleteAge">Age</label><input id="athleteAge" type="number" min="5" max="80" value="16" required /></div>
        <div class="field"><label for="athleteSport">Sport</label><input id="athleteSport" value="Volleyball" required /></div>
      </div>
      <div class="field">
        <label for="athletePosition">Position or Event</label>
        <input id="athletePosition" value="Player" required />
      </div>
    ` : ""}
    <div class="field">
      <label for="email">Email</label>
      <input id="email" type="email" value="${state.authMode === "login" ? state.athletes[0]?.contact || "" : ""}" autocomplete="email" required />
    </div>
    <div class="field">
      <label for="password">Password</label>
      <input id="password" type="password" value="${state.authMode === "login" ? "athlete123" : ""}" autocomplete="${state.authMode === "login" ? "current-password" : "new-password"}" required />
    </div>
  `;
}

function forgotPasswordFields() {
  return `
    <div class="field">
      <label for="email">Email</label>
      <input id="email" type="email" value="${state.resetEmail}" autocomplete="email" required />
    </div>
    <div class="btn-row">
      <button class="ghost-button" id="sendResetCodeBtn" type="button">Send Code</button>
      <span class="meta-line">Code expires when this page is refreshed.</span>
    </div>
    <div class="field">
      <label for="resetCode">Reset Code</label>
      <input id="resetCode" inputmode="numeric" required />
    </div>
    <div class="field">
      <label for="password">New Password</label>
      <input id="password" type="password" autocomplete="new-password" required />
    </div>
  `;
}

function loginCoachAccount() {
  const email = normalizeEmail(document.getElementById("email").value);
  const password = document.getElementById("password").value;
  const account = state.accounts.find((item) => normalizeEmail(item.email) === email && item.password === password);
  if (!account) return showLoginError("No coach account found for that email and password.");
  state.user = { name: account.name, role: account.role, username: account.username, email: account.email };
  state.page = "dashboard";
  save();
  render();
}

function createCoachAccount() {
  const name = document.getElementById("coachName").value.trim();
  const email = normalizeEmail(document.getElementById("email").value);
  const password = document.getElementById("password").value;
  if (!name) return showLoginError("Enter the coach name.");
  if (!isValidEmail(email)) return showLoginError("Enter a valid email address.");
  if (!isPasswordValid(password)) return showLoginError("Password must be at least 6 characters.");
  if (emailExists(email)) return showLoginError("That email is already registered.");

  const account = { username: emailToUsername(email), email, password, name, role: "Coach" };
  state.accounts.push(account);
  state.user = { name: account.name, role: account.role, username: account.username, email: account.email };
  state.page = "dashboard";
  logAction("Coach account created", email);
  save();
  render();
}

function loginAthleteAccount() {
  const email = normalizeEmail(document.getElementById("email").value);
  const password = document.getElementById("password").value;
  const athlete = state.athletes.find((item) => normalizeEmail(item.contact) === email && item.password === password);
  if (!athlete) return showLoginError("No athlete account found for that email and password.");
  state.user = { name: athlete.name, role: "Athlete", athleteId: athlete.id, email: athlete.contact };
  state.selectedAthleteId = athlete.id;
  state.page = "dashboard";
  save();
  render();
}

function createAthleteAccount() {
  const teamCode = document.getElementById("teamCode").value.trim().toUpperCase();
  const name = document.getElementById("athleteName").value.trim();
  const email = normalizeEmail(document.getElementById("email").value);
  const password = document.getElementById("password").value;
  if (normalizeTeamCode(teamCode) !== normalizeTeamCode(state.teamCode)) return showLoginError(`Team share code does not match. Use ${state.teamCode}.`);
  if (!name) return showLoginError("Enter the athlete name.");
  if (!isValidEmail(email)) return showLoginError("Enter a valid email address.");
  if (!isPasswordValid(password)) return showLoginError("Password must be at least 6 characters.");
  if (emailExists(email)) return showLoginError("That email is already registered.");

  const activities = defaultActivities();
  const athlete = {
    id: cryptoId(),
    name,
    age: Number(document.getElementById("athleteAge").value),
    sport: document.getElementById("athleteSport").value.trim(),
    position: document.getElementById("athletePosition").value.trim(),
    contact: email,
    password,
    accessCode: uniqueAccessCode(name),
    attendance: [],
    tests: [makeTestFromActivities(new Date().toISOString().slice(0, 10), activities, "Account baseline created.")],
  };
  state.athletes.push(athlete);
  state.user = { name: athlete.name, role: "Athlete", athleteId: athlete.id, email: athlete.contact };
  state.selectedAthleteId = athlete.id;
  state.page = "dashboard";
  logAction("Athlete account created", athlete.name);
  save();
  render();
}

function findAccountByEmail(email) {
  const normalized = normalizeEmail(email);
  const staff = state.accounts.find((account) => normalizeEmail(account.email) === normalized);
  if (staff) return { type: "staff", record: staff };
  const athlete = state.athletes.find((item) => normalizeEmail(item.contact) === normalized);
  if (athlete) return { type: "athlete", record: athlete };
  return null;
}

function sendResetCode() {
  const email = normalizeEmail(document.getElementById("email").value);
  if (!isValidEmail(email)) return showLoginError("Enter a valid email address first.");
  const match = findAccountByEmail(email);
  if (!match) return showLoginError("No account uses that email.");
  state.resetEmail = email;
  state.resetCode = String(Math.floor(100000 + Math.random() * 900000));
  showLoginError(`Demo email sent to ${email}. Reset code: ${state.resetCode}`);
}

function resetPassword() {
  const email = normalizeEmail(document.getElementById("email").value);
  const code = document.getElementById("resetCode").value.trim();
  const password = document.getElementById("password").value;
  if (!isValidEmail(email)) return showLoginError("Enter a valid email address.");
  if (!state.resetCode || email !== state.resetEmail || code !== state.resetCode) return showLoginError("Reset code is incorrect or missing.");
  if (!isPasswordValid(password)) return showLoginError("Password must be at least 6 characters.");
  const match = findAccountByEmail(email);
  if (!match) return showLoginError("No account uses that email.");
  match.record.password = password;
  state.resetCode = "";
  save();
  showLoginError("Password updated. You can login now.");
  state.authMode = "login";
  setTimeout(renderLogin, 700);
}

function showLoginError(message) {
  document.getElementById("loginError").textContent = message;
}

function renderPage() {
  if (state.page === "dashboard") return dashboardPage();
  if (state.page === "team") return teamPage();
  if (state.page === "athlete") return athletePage();
  if (state.page === "attendance") return attendancePage();
  if (state.page === "tests") return testsPage();
  if (state.page === "tournaments") return tournamentsPage();
  if (state.page === "leave") return leavePage();
  if (state.page === "announcements") return announcementsPage();
  if (state.page === "chat") return chatPage();
  if (state.page === "calendar") return calendarPage();
  if (state.page === "goals") return goalsPage();
  if (state.page === "planner") return plannerPage();
  if (state.page === "sync") return syncPage();
  if (state.page === "settings") return settingsPage();
  if (state.page === "audit") return auditPage();
  return reportsPage();
}

function dashboardPage() {
  const athletes = visibleAthletes();
  const attendance = todayAttendance();
  const present = attendance.filter(({ record }) => record && record.status === "Present").length;
  const absent = attendance.filter(({ record }) => !record || record.status === "Absent").length;
  const teamRating = average(athletes.map(overallRating));
  const sorted = [...athletes].sort((a, b) => overallRating(b) - overallRating(a));
  const featured = isAthleteUser() ? selectedAthlete() : sorted[0];
  const current = featured ? latestTest(featured) : null;
  const recent = athletes
    .flatMap((athlete) => athlete.tests.map((test) => ({ athlete, test })))
    .sort((a, b) => b.test.date.localeCompare(a.test.date))
    .slice(0, 5);

  return `
    <section class="game-hero">
      <div>
        <span class="eyebrow">${isAthleteUser() ? "Athlete viewer" : "Coach command center"}</span>
        <h1>${isAthleteUser() ? "My Player Card" : "Team Performance Arena"}</h1>
        <p>${isAthleteUser() ? "Monitor your attendance, latest activity results, and calibrated performance rating." : `${state.teamName} auto-calibrated stats from raw activity tests.`}</p>
      </div>
      ${featured ? playerCard(featured) : emptyPlayerCard()}
    </section>
    <section class="grid kpi-grid">
      ${statCard(isAthleteUser() ? "My Rating" : "Team Rating", `${teamRating}/100`, "Auto-calibrated overall", "LV")}
      ${statCard(isAthleteUser() ? "My Power" : "Team Power", isAthleteUser() ? overallRating(featured) : teamPower(), isAthleteUser() ? "Personal power points" : "Overall team points", "TP")}
      ${statCard(isAthleteUser() ? "Attendance" : "Present Today", isAthleteUser() ? `${attendancePercent(featured)}%` : present, isAthleteUser() ? "Present and late count" : `${absent} absent`, "HP")}
      ${statCard("Best Component", current ? bestComponent(current.scores) : "None", "Highest calibrated stat", "XP")}
      ${statCard("Tests Logged", athletes.reduce((sum, athlete) => sum + athlete.tests.length, 0), "Activity scorecards", "Q")}
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="panel game-panel">
        <h2>${isAthleteUser() ? "My Stat Build" : "Team Stat Build"}</h2>
        <div class="radar-grid" style="margin-top:16px">
          ${components.map((name) => componentBar(name, athletes)).join("")}
        </div>
      </div>
      <div class="panel game-panel">
        <h2>${isAthleteUser() ? "Access Card" : "Leaderboard"}</h2>
        ${isAthleteUser() ? athleteAccessPanel(featured) : `<div class="bar-list" style="margin-top:16px">${sorted.slice(0, 5).map((athlete, index) => athleteRankRow(athlete, index + 1)).join("")}</div>`}
      </div>
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="panel game-panel">
        <h2>Recent Calibrated Tests</h2>
        <div class="table-wrap">${recentTestsTable(recent)}</div>
      </div>
      <div class="panel game-panel">
        <h2>${isAthleteUser() ? "Next Upgrade" : "Needs Improvement"}</h2>
        <div class="bar-list" style="margin-top:16px">
          ${(isAthleteUser() ? athletes : [...athletes].sort((a, b) => overallRating(a) - overallRating(b)).slice(0, 3)).map((athlete) => `
            <div class="upgrade-row">
              <strong>${athlete.name}</strong>
              <span>${lowestComponent(athlete)} training focus</span>
              <small>${overallRating(athlete)}/100 overall - ${attendancePercent(athlete)}% attendance</small>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function emptyPlayerCard() {
  return `
    <article class="player-card">
      <div class="player-rank">OVR 0</div>
      <div class="player-avatar">+</div>
      <h2>No athletes yet</h2>
      <p>Add athletes from Team or share the team code for athlete sign-up.</p>
    </article>
  `;
}

function playerCard(athlete) {
  const test = latestTest(athlete);
  return `
    <article class="player-card">
      <div class="player-rank">OVR ${overallRating(athlete)}</div>
      <div class="player-avatar">${initials(athlete.name)}</div>
      <h2>${athlete.name}</h2>
      <p>${athlete.sport} / ${athlete.position}</p>
      <span class="status-chip">${athlete.injuryStatus || "Available"}</span>
      <div class="mini-stat-row">
        <span>Power <strong>${test ? test.scores.Power : 0}</strong></span>
        <span>Speed <strong>${test ? test.scores.Speed : 0}</strong></span>
        <span>React <strong>${test ? test.scores["Reaction Time"] : 0}</strong></span>
      </div>
    </article>
  `;
}

function teamPage() {
  if (!canEdit()) return athletePage();
  const rankingOptions = ["Overall", "Attendance", ...components];
  const ranked = rankedAthletes();
  return `
    <section class="section-title">
      <div><h2>Team</h2><p>Manage roster, athlete access codes, and rankings.</p></div>
      <button class="button game-button" id="quickAddBtn">Add Athlete</button>
    </section>
    <section class="panel game-panel" style="margin-bottom:16px">
      <div class="share-link-box">
        <div>
          <span class="eyebrow">Athlete share login</span>
          <h2>${state.teamCode}</h2>
          <p>Athletes choose Athlete Login, enter this team code, then enter their personal access code.</p>
        </div>
        <button class="ghost-button" id="teamNameBtn">Edit Team Setup</button>
      </div>
    </section>
    ${teamViewPanel()}
    ${teamComparisonPanel()}
    ${roleManagementPanel()}
    <section class="panel game-panel" style="margin-bottom:16px">
      <div class="section-title" style="margin-bottom:14px">
        <div><h2>Team Ranking</h2><p>Sort athletes by overall score, attendance, or a calibrated component.</p></div>
      </div>
      <div class="segmented" style="margin-bottom:14px">
        ${rankingOptions.map((option) => `
          <button class="segment rank-option ${state.rankingMetric === option ? "active" : ""}" data-metric="${option}">${option}</button>
        `).join("")}
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Rank</th><th>Athlete</th><th>Access Code</th><th>Metric</th><th>Overall</th><th>Attendance</th></tr></thead>
          <tbody>
            ${ranked.map((athlete, index) => `
              <tr>
                <td><strong>${index + 1}</strong></td>
                <td><strong>${athlete.name}</strong><div class="meta-line">${athlete.sport} / ${athlete.position}</div></td>
                <td><span class="rating-pill">${athlete.accessCode}</span></td>
                <td><span class="rating-pill">${rankingValue(athlete, state.rankingMetric)}</span></td>
                <td>${overallRating(athlete)}/100</td>
                <td>${attendancePercent(athlete)}%</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
    <section class="athlete-list">
      ${state.athletes.length ? state.athletes.map((athlete) => `
        <article class="athlete-card game-card">
          <header>
            <div>
              <div class="athlete-name">${athlete.name}</div>
              <div class="meta-line">${athlete.sport} / ${athlete.position}</div>
            </div>
            <div class="score-ring" style="--score:${overallRating(athlete)}">${overallRating(athlete)}</div>
          </header>
          <div class="info-grid">
            <div class="info-item"><span>Access Code</span>${athlete.accessCode}</div>
            <div class="info-item"><span>Attendance</span>${attendancePercent(athlete)}%</div>
            <div class="info-item"><span>Status</span>${athlete.injuryStatus || "Available"}</div>
            <div class="info-item"><span>Emergency</span>${athlete.emergencyContact || "Not set"}</div>
          </div>
          <div class="availability-row">
            <label>Status</label>
            <select class="injury-select" data-id="${athlete.id}">
              ${["Available", "Limited", "Injured", "Rest"].map((status) => `<option value="${status}" ${athlete.injuryStatus === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>
          <div class="btn-row">
            <button class="ghost-button open-athlete" data-id="${athlete.id}">Open Profile</button>
            <button class="danger-button delete-athlete" data-id="${athlete.id}">Remove</button>
          </div>
        </article>
      `).join("") : `<section class="empty-state">No athletes yet. Use Add Athlete or give athletes the team share code to create accounts.</section>`}
    </section>
  `;
}

function teamViewPanel() {
  const groups = groupBy(state.athletes, (athlete) => athlete.sport || "Unassigned");
  return `
    <section class="panel game-panel" style="margin-bottom:16px">
      <div class="section-title" style="margin-bottom:14px">
        <div><h2>Team View</h2><p>Roster groups, team averages, and readiness by sport or event.</p></div>
      </div>
      <div class="team-view-grid">
        ${Object.entries(groups).map(([sport, athletes]) => `
          <article class="team-view-card">
            <span class="eyebrow">${sport}</span>
            <h2>${athletes.length} athletes</h2>
            <div class="mini-stat-row">
              <span>OVR <strong>${average(athletes.map(overallRating))}</strong></span>
              <span>ATT <strong>${average(athletes.map(attendancePercent))}%</strong></span>
              <span>Top <strong>${athletes.slice().sort((a, b) => overallRating(b) - overallRating(a))[0]?.name.split(" ")[0] || "-"}</strong></span>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function teamComparisonPanel() {
  return `
    <section class="panel game-panel" style="margin-bottom:16px">
      <div class="section-title" style="margin-bottom:14px">
        <div><h2>Team Comparison</h2><p>Compare athletes by overall score, attendance, or one calibrated component.</p></div>
        <select id="comparisonMetric">
          ${["Overall", "Attendance", ...components].map((metric) => `<option value="${metric}" ${state.rankingMetric === metric ? "selected" : ""}>${metric}</option>`).join("")}
        </select>
      </div>
      <div class="comparison-grid">
        ${rankedAthletes().map((athlete, index) => {
          const value = comparisonValue(athlete, state.rankingMetric);
          const percent = Number(String(value).replace("%", "")) || 0;
          return `<div class="comparison-row">
            <strong>${index + 1}. ${athlete.name}</strong>
            <span>${value}${state.rankingMetric === "Attendance" ? "" : "/100"}</span>
            <div class="bar-track"><div class="bar-fill" style="--value:${percent}%"></div></div>
          </div>`;
        }).join("")}
      </div>
    </section>
  `;
}

function tournamentPanel() {
  const canManage = canEdit();
  return `
    <section class="panel game-panel" style="margin-bottom:16px">
      <div class="section-title" style="margin-bottom:14px">
        <div><h2>Upcoming Tournament</h2><p>Track competitions, locations, and preparation notes.</p></div>
      </div>
      ${canManage ? `<form class="tournament-form" id="tournamentForm">
        <input id="tournamentName" placeholder="Tournament name" required />
        <input id="tournamentDate" type="date" required />
        <input id="tournamentLocation" placeholder="Location" required />
        <input id="tournamentNotes" placeholder="Preparation notes" />
        <button class="button game-button" type="submit">Add</button>
      </form>` : ""}
      <div class="tournament-list">
        ${state.tournaments.slice().sort((a, b) => a.date.localeCompare(b.date)).map((event) => `
          <article class="tournament-card">
            <div>
              <strong>${event.name}</strong>
              <span>${event.date} / ${event.location}</span>
              <small>${event.notes || "No notes yet."}</small>
            </div>
            ${canManage ? `<button class="danger-button delete-tournament" data-id="${event.id}" type="button">Remove</button>` : ""}
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function tournamentsPage() {
  return `
    <section class="section-title">
      <div><h2>Tournaments</h2><p>Upcoming competition schedule, locations, and preparation notes.</p></div>
    </section>
    ${tournamentPanel()}
    <section class="grid three-col">
      ${statCard("Next Event", nextTournament()?.name || "None", nextTournament()?.date || "No date set", "G")}
      ${statCard("Events Listed", state.tournaments.length, "Upcoming tournament count", "S")}
      ${statCard("Team Power", teamPower(), "Overall team points", "TP")}
    </section>
  `;
}

function leavePage() {
  const athlete = selectedAthlete();
  const visibleRequests = isAthleteUser()
    ? state.leaveRequests.filter((request) => request.athleteId === state.user.athleteId)
    : state.leaveRequests;
  return `
    <section class="section-title">
      <div><h2>Leave Requests</h2><p>Athletes request leave. Staff approve, deny, and set yearly allowance.</p></div>
    </section>
    <section class="grid two-col">
      <div class="panel game-panel">
        <h2>${isAthleteUser() ? "Request Leave" : "Leave Settings"}</h2>
        ${isAthleteUser() ? leaveRequestForm(athlete) : leaveSettingsPanel()}
      </div>
      <div class="panel game-panel">
        <h2>Leave Balance</h2>
        <div class="score-grid" style="margin-top:14px">
          ${leaveBalanceCards(isAthleteUser() ? [athlete] : state.athletes)}
        </div>
      </div>
    </section>
    <section class="panel game-panel" style="margin-top:16px">
      <h2>${isAthleteUser() ? "My Requests" : "Team Requests"}</h2>
      <div class="table-wrap" style="margin-top:12px">${leaveRequestsTable(visibleRequests)}</div>
    </section>
  `;
}

function leaveRequestForm(athlete) {
  return `
    <form id="leaveForm">
      <div class="form-grid">
        <div class="field"><label for="leaveStart">Start Date</label><input id="leaveStart" type="date" required /></div>
        <div class="field"><label for="leaveEnd">End Date</label><input id="leaveEnd" type="date" required /></div>
      </div>
      <div class="field"><label for="leaveReason">Reason</label><textarea id="leaveReason" placeholder="Reason for leave" required></textarea></div>
      <button class="button game-button" type="submit">Submit Request</button>
    </form>
  `;
}

function leaveSettingsPanel() {
  return `
    <div class="field">
      <label for="leaveAllowance">Allowed Leave Days Per Year</label>
      <input id="leaveAllowance" type="number" min="0" max="365" value="${state.leaveAllowance}" />
    </div>
    <p class="muted">Approved requests count against this yearly allowance for each athlete.</p>
  `;
}

function leaveBalanceCards(athletes) {
  return athletes.filter(Boolean).map((athlete) => {
    const used = approvedLeaveDays(athlete.id);
    const remaining = Math.max(0, state.leaveAllowance - used);
    return `<div class="score-box"><span class="meta-line">${athlete.name}</span><strong>${remaining}</strong><span class="meta-line">${used}/${state.leaveAllowance} used</span></div>`;
  }).join("") || `<div class="empty-state">No athletes available.</div>`;
}

function leaveRequestsTable(requests) {
  return `<table>
    <thead><tr><th>Athlete</th><th>Dates</th><th>Days</th><th>Reason</th><th>Status</th><th></th></tr></thead>
    <tbody>${requests.length ? requests.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((request) => {
      const athlete = state.athletes.find((item) => item.id === request.athleteId);
      return `<tr>
        <td>${athlete?.name || "Removed athlete"}</td>
        <td>${request.start} to ${request.end}</td>
        <td>${request.days}</td>
        <td>${request.reason}</td>
        <td><span class="rating-pill">${request.status}</span></td>
        <td>${canEdit() && request.status === "Pending" ? `<div class="btn-row"><button class="ghost-button leave-action" data-id="${request.id}" data-status="Approved">Approve</button><button class="danger-button leave-action" data-id="${request.id}" data-status="Denied">Deny</button></div>` : ""}</td>
      </tr>`;
    }).join("") : `<tr><td colspan="6">No leave requests yet.</td></tr>`}</tbody>
  </table>`;
}

function announcementsPage() {
  return `
    <section class="section-title">
      <div><h2>Announcements</h2><p>Team news, reminders, and coach updates.</p></div>
    </section>
    ${canEdit() ? announcementForm() : ""}
    <section class="announcement-list">
      ${state.announcements.slice().sort((a, b) => b.date.localeCompare(a.date)).map((item) => `
        <article class="panel game-panel announcement-card">
          <div>
            <span class="eyebrow">${item.audience} / ${item.date}</span>
            <h2>${item.title}</h2>
            <p>${item.body}</p>
            <span class="meta-line">Posted by ${item.author}</span>
          </div>
          ${canEdit() ? `<button class="danger-button delete-announcement" data-id="${item.id}" type="button">Remove</button>` : ""}
        </article>
      `).join("") || `<section class="empty-state">No announcements yet.</section>`}
    </section>
  `;
}

function chatPage() {
  const messages = visibleMessages();
  return `
    <section class="section-title">
      <div><h2>Team Chat</h2><p>Coaches, admins, moderators, and athletes can message the team or one person.</p></div>
    </section>
    <section class="grid two-col">
      <div class="panel game-panel chat-panel">
        <h2>Messages</h2>
        <div class="chat-feed">
          ${messages.length ? messages.map((message) => `
            <article class="chat-bubble ${message.senderEmail === state.user.email ? "mine" : ""}">
              <div class="chat-meta"><strong>${message.sender}</strong><span>${message.recipient === "All" ? "Team" : message.recipient}</span><time>${new Date(message.date).toLocaleString()}</time></div>
              <p>${message.body}</p>
            </article>
          `).join("") : `<div class="empty-state">No messages yet.</div>`}
        </div>
      </div>
      <div class="panel game-panel">
        <h2>Send Message</h2>
        <form id="chatForm" class="stack-form">
          <div class="field"><label for="chatRecipient">To</label><select id="chatRecipient">${chatRecipients().map((person) => `<option value="${person.value}">${person.label}</option>`).join("")}</select></div>
          <div class="field"><label for="chatBody">Message</label><textarea id="chatBody" placeholder="Write a team update or private message" required></textarea></div>
          <button class="button game-button" type="submit">Send Message</button>
        </form>
      </div>
    </section>
  `;
}

function calendarPage() {
  const events = calendarEvents();
  return `
    <section class="section-title">
      <div><h2>Team Calendar</h2><p>Tournaments, practice plans, leave approvals, and reminders in one schedule.</p></div>
    </section>
    <section class="grid two-col">
      <div class="panel game-panel">
        <h2>Upcoming</h2>
        <div class="calendar-list">
          ${events.length ? events.map((event) => `
            <article class="calendar-item">
              <div class="calendar-date"><strong>${event.day}</strong><span>${event.month}</span></div>
              <div><span class="eyebrow">${event.type}</span><h3>${event.title}</h3><p>${event.detail}</p></div>
            </article>
          `).join("") : `<div class="empty-state">No calendar items yet.</div>`}
        </div>
      </div>
      <div class="panel game-panel">
        <h2>Reminder</h2>
        ${canEdit() ? `
          <form id="reminderForm" class="stack-form">
            <div class="field"><label for="reminderTitle">Reminder</label><input id="reminderTitle" required /></div>
            <div class="field"><label for="reminderDate">Date</label><input id="reminderDate" type="date" required /></div>
            <div class="field"><label for="reminderAudience">Audience</label><select id="reminderAudience"><option>All</option><option>Coaches</option><option>Athletes</option></select></div>
            <button class="button game-button" type="submit">Add Reminder</button>
          </form>
        ` : `<p class="muted">Coach reminders appear here when posted.</p>`}
        <div class="tournament-list">
          ${state.reminders.map((reminder) => `
            <article class="tournament-card">
              <div><strong>${reminder.title}</strong><span>${reminder.date} / ${reminder.audience}</span></div>
              ${canEdit() ? `<button class="danger-button delete-reminder" data-id="${reminder.id}" type="button">Remove</button>` : ""}
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function goalsPage() {
  const goals = visibleGoals();
  return `
    <section class="section-title">
      <div><h2>Goals</h2><p>Set athlete targets, due dates, and training notes.</p></div>
    </section>
    <section class="grid two-col">
      <div class="panel game-panel">
        <h2>${canEdit() ? "Assign Goal" : "My Goals"}</h2>
        ${canEdit() ? goalForm() : `<p class="muted">Your coach-assigned targets appear here.</p>`}
      </div>
      <div class="panel game-panel">
        <h2>Goal Board</h2>
        <div class="goal-list">
          ${goals.length ? goals.map(goalCard).join("") : `<div class="empty-state">No goals yet.</div>`}
        </div>
      </div>
    </section>
  `;
}

function goalForm() {
  return `
    <form id="goalForm" class="stack-form">
      <div class="field"><label for="goalAthlete">Athlete</label><select id="goalAthlete">${state.athletes.map((athlete) => `<option value="${athlete.id}">${athlete.name}</option>`).join("")}</select></div>
      <div class="field"><label for="goalTitle">Goal</label><input id="goalTitle" placeholder="Increase sprint score to 85" required /></div>
      <div class="form-grid">
        <div class="field"><label for="goalComponent">Metric</label><select id="goalComponent"><option>Overall</option>${components.map((name) => `<option>${name}</option>`).join("")}</select></div>
        <div class="field"><label for="goalTarget">Target</label><input id="goalTarget" type="number" min="1" max="100" value="85" required /></div>
        <div class="field"><label for="goalDueDate">Due Date</label><input id="goalDueDate" type="date" required /></div>
      </div>
      <div class="field"><label for="goalNotes">Coach Notes</label><textarea id="goalNotes" placeholder="Training focus or next steps"></textarea></div>
      <button class="button game-button" type="submit">Save Goal</button>
    </form>
  `;
}

function goalCard(goal) {
  const athlete = state.athletes.find((item) => item.id === goal.athleteId);
  const progress = goalProgress(goal, athlete);
  return `
    <article class="goal-card">
      <div>
        <span class="eyebrow">${athlete?.name || "Removed athlete"} / ${goal.component}</span>
        <h3>${goal.title}</h3>
        <p>${goal.notes || "No notes yet."}</p>
        <div class="bar-track"><div class="bar-fill" style="--value:${progress}%"></div></div>
        <span class="meta-line">Progress ${progress}% / target ${goal.target} by ${goal.dueDate}</span>
      </div>
      ${canEdit() ? `<div class="btn-row"><button class="ghost-button goal-status" data-id="${goal.id}" data-status="${goal.status === "Done" ? "Active" : "Done"}">${goal.status === "Done" ? "Reopen" : "Done"}</button><button class="danger-button delete-goal" data-id="${goal.id}">Remove</button></div>` : ""}
    </article>
  `;
}

function settingsPage() {
  if (!canEdit()) return dashboardPage();
  return `
    <section class="section-title">
      <div><h2>Settings</h2><p>Sport templates, weighted ratings, privacy, and app install readiness.</p></div>
    </section>
    <section class="grid two-col">
      <div class="panel game-panel">
        <h2>Sport Rating Template</h2>
        <form id="templateForm" class="stack-form">
          <div class="field"><label for="sportTemplate">Template</label><select id="sportTemplate">${Object.keys(sportTemplates).map((name) => `<option>${name}</option>`).join("")}</select></div>
          <button class="button game-button" type="submit">Apply Template</button>
        </form>
      </div>
      <div class="panel game-panel">
        <h2>Privacy Controls</h2>
        <form id="privacyForm" class="stack-form">
          ${privacyToggle("athleteCanViewRankings", "Athletes can view team rankings")}
          ${privacyToggle("athleteCanViewTeamChat", "Athletes can use team chat")}
          ${privacyToggle("showPrivateNotesToAthletes", "Athletes can see private coach notes")}
          <button class="button game-button" type="submit">Save Privacy</button>
        </form>
      </div>
    </section>
    <section class="panel game-panel" style="margin-top:16px">
      <h2>Weighted Rating Formula</h2>
      <form id="weightsForm" class="weights-grid">
        ${components.map((component) => `
          <div class="field"><label for="weight-${slug(component)}">${component}</label><input id="weight-${slug(component)}" class="weight-input" data-component="${component}" type="number" min="0" max="100" value="${state.componentWeights[component]}" /></div>
        `).join("")}
        <button class="button game-button" type="submit">Save Weights</button>
      </form>
    </section>
  `;
}

function privacyToggle(key, label) {
  return `<label class="toggle-row"><input type="checkbox" id="${key}" ${state.privacy[key] ? "checked" : ""} /><span>${label}</span></label>`;
}

function syncPage() {
  if (!canEdit()) return dashboardPage();
  return `
    <section class="section-title">
      <div><h2>Sync & Backup</h2><p>Export team data now, or paste a backup to restore this browser prototype.</p></div>
    </section>
    <section class="grid two-col">
      <div class="panel game-panel">
        <h2>Local Database Backup</h2>
        <p class="muted">This prototype saves in this browser. Use backup export before moving to another device.</p>
        <div class="btn-row">
          <button class="button game-button" id="exportBackupBtn" type="button">Export Backup</button>
          <button class="ghost-button" id="copyInviteBtn" type="button">Copy Invite Text</button>
          <button class="ghost-button" id="exportRosterCsvBtn" type="button">Export Roster CSV</button>
        </div>
      </div>
      <div class="panel game-panel">
        <h2>Restore Backup</h2>
        <form id="restoreForm" class="stack-form">
          <div class="field"><label for="restoreData">Backup JSON</label><textarea id="restoreData" placeholder="Paste exported team backup here"></textarea></div>
          <button class="button game-button" type="submit">Restore Data</button>
        </form>
      </div>
    </section>
    <section class="panel game-panel" style="margin-top:16px">
      <h2>Backend Sync</h2>
      <p class="muted">Run <code>node backend-server.js</code> in this folder to use the local backend starter.</p>
      <div class="form-grid">
        <div class="field"><label for="backendUrl">Backend URL</label><input id="backendUrl" value="${state.backendUrl}" /></div>
        <div class="btn-row" style="align-self:end">
          <button class="button game-button" id="pushBackendBtn" type="button">Push to Backend</button>
          <button class="ghost-button" id="pullBackendBtn" type="button">Pull from Backend</button>
        </div>
      </div>
      <div class="meta-line" id="backendStatus">Backend sync is optional for this prototype.</div>
    </section>
    <section class="panel game-panel" style="margin-top:16px">
      <h2>Import Athletes From CSV</h2>
      <p class="muted">Columns: name, age, sport, position, email, password, accessCode.</p>
      <form id="csvImportForm" class="stack-form">
        <div class="field"><label for="csvImport">CSV Data</label><textarea id="csvImport" placeholder="name,age,sport,position,email,password,accessCode"></textarea></div>
        <button class="button game-button" type="submit">Import Athletes</button>
      </form>
    </section>
  `;
}

function chatRecipients() {
  const staff = state.accounts.map((account) => ({ value: account.email, label: `${account.name} (${account.role})` }));
  const athletes = state.athletes.map((athlete) => ({ value: athlete.contact, label: `${athlete.name} (Athlete)` }));
  return [{ value: "All", label: "Everyone" }, ...staff, ...athletes].filter((person) => person.value === "All" || normalizeEmail(person.value) !== normalizeEmail(state.user.email));
}

function visibleMessages() {
  const email = normalizeEmail(state.user.email);
  if (isAthleteUser() && !state.privacy.athleteCanViewTeamChat) {
    return state.messages.filter((message) => normalizeEmail(message.recipient) === email || normalizeEmail(message.senderEmail) === email);
  }
  return state.messages
    .filter((message) => message.recipient === "All" || normalizeEmail(message.recipient) === email || normalizeEmail(message.senderEmail) === email)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function visibleGoals() {
  return isAthleteUser()
    ? state.goals.filter((goal) => goal.athleteId === state.user.athleteId)
    : state.goals;
}

function goalProgress(goal, athlete) {
  if (!athlete) return 0;
  const current = goal.component === "Overall"
    ? overallRating(athlete)
    : latestTest(athlete)?.scores[goal.component] || 0;
  return Math.min(100, Math.round((current / Math.max(1, Number(goal.target))) * 100));
}

function calendarEvents() {
  const reminderEvents = state.reminders.map((item) => ({ date: item.date, type: "Reminder", title: item.title, detail: item.audience }));
  const tournamentEvents = state.tournaments.map((item) => ({ date: item.date, type: "Tournament", title: item.name, detail: `${item.location} / ${item.notes || "No notes"}` }));
  const sessionEvents = state.sessions.map((item) => ({ date: item.date, type: "Practice", title: item.title, detail: `${item.focus} / ${item.notes}` }));
  const leaveEvents = state.leaveRequests
    .filter((item) => item.status === "Approved")
    .map((item) => {
      const athlete = state.athletes.find((athlete) => athlete.id === item.athleteId);
      return { date: item.start, type: "Leave", title: `${athlete?.name || "Athlete"} leave`, detail: `${item.start} to ${item.end}` };
    });
  return [...reminderEvents, ...tournamentEvents, ...sessionEvents, ...leaveEvents]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((event) => {
      const date = new Date(`${event.date}T00:00:00`);
      return { ...event, day: String(date.getDate()).padStart(2, "0"), month: date.toLocaleString("en", { month: "short" }) };
    });
}

function backupPayload() {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    teamName: state.teamName,
    teamCode: state.teamCode,
    teamLogo: state.teamLogo,
    accounts: state.accounts,
    athletes: state.athletes,
    testDefinitions: state.testDefinitions,
    tournaments: state.tournaments,
    announcements: state.announcements,
    sessions: state.sessions,
    reminders: state.reminders,
    goals: state.goals,
    messages: state.messages,
    leaveRequests: state.leaveRequests,
    leaveAllowance: state.leaveAllowance,
    componentWeights: state.componentWeights,
    privacy: state.privacy,
  };
}

function restoreBackupData(backup) {
  if (!backup || !Array.isArray(backup.athletes)) throw new Error("Invalid backup");
  state.teamName = backup.teamName || state.teamName;
  state.teamCode = backup.teamCode || state.teamCode;
  state.teamLogo = backup.teamLogo || "";
  state.accounts = normalizeAccounts(backup.accounts || state.accounts);
  state.testDefinitions = normalizeTestDefinitions(backup.testDefinitions || state.testDefinitions);
  currentTestDefinitions = state.testDefinitions;
  state.athletes = normalizeAthletes(backup.athletes);
  state.tournaments = backup.tournaments || [];
  state.announcements = backup.announcements || [];
  state.sessions = backup.sessions || [];
  state.reminders = backup.reminders || [];
  state.goals = backup.goals || [];
  state.messages = backup.messages || [];
  state.leaveRequests = backup.leaveRequests || [];
  state.leaveAllowance = Number(backup.leaveAllowance ?? state.leaveAllowance);
  state.componentWeights = normalizeWeights(backup.componentWeights || state.componentWeights);
  state.privacy = backup.privacy || state.privacy;
  state.selectedAthleteId = state.athletes[0]?.id || "";
  state.page = "dashboard";
}

function rosterCsv() {
  const rows = [
    ["name", "age", "sport", "position", "email", "password", "accessCode", "emergencyContact", "injuryStatus"],
    ...state.athletes.map((athlete) => [athlete.name, athlete.age, athlete.sport, athlete.position, athlete.contact, athlete.password, athlete.accessCode, athlete.emergencyContact || "", athlete.injuryStatus || "Available"]),
  ];
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function importAthletesFromCsv(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length < 2) return 0;
  const headers = splitCsvLine(lines[0]).map((item) => item.trim());
  let imported = 0;
  lines.slice(1).forEach((line) => {
    const values = splitCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
    const email = normalizeEmail(row.email || row.contact);
    if (!row.name || !isValidEmail(email) || emailExists(email)) return;
    const activities = defaultActivities();
    state.athletes.push({
      id: cryptoId(),
      name: row.name,
      age: Number(row.age || 16),
      sport: row.sport || "General",
      position: row.position || row.event || "Athlete",
      contact: email,
      password: row.password || "athlete123",
      accessCode: (row.accessCode || uniqueAccessCode(row.name)).toUpperCase(),
      emergencyContact: row.emergencyContact || "",
      injuryStatus: row.injuryStatus || "Available",
      attendance: [],
      tests: [makeTestFromActivities(new Date().toISOString().slice(0, 10), activities, "Imported athlete baseline.")],
    });
    imported += 1;
  });
  return imported;
}

function splitCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell);
  return cells;
}

function announcementForm() {
  return `
    <section class="panel game-panel" style="margin-bottom:16px">
      <form id="announcementForm" class="form-grid">
        <div class="field"><label for="announcementTitle">Title</label><input id="announcementTitle" required /></div>
        <div class="field"><label for="announcementAudience">Audience</label><select id="announcementAudience"><option>All</option><option>Coach</option><option>Athlete</option></select></div>
        <div class="field" style="grid-column:1/-1"><label for="announcementBody">Message</label><textarea id="announcementBody" required></textarea></div>
        <button class="button game-button" type="submit">Post Announcement</button>
      </form>
    </section>
  `;
}

function plannerPage() {
  if (!canEdit()) return dashboardPage();
  return `
    <section class="section-title">
      <div><h2>Session Planner</h2><p>Plan practices, drills, and tournament preparation blocks.</p></div>
    </section>
    <section class="panel game-panel">
      <form id="sessionForm" class="tournament-form">
        <input id="sessionTitle" placeholder="Session title" required />
        <input id="sessionDate" type="date" required />
        <select id="sessionFocus">${components.map((name) => `<option>${name}</option>`).join("")}</select>
        <input id="sessionNotes" placeholder="Drills and notes" required />
        <button class="button game-button" type="submit">Add Session</button>
      </form>
      <div class="tournament-list">
        ${state.sessions.slice().sort((a, b) => a.date.localeCompare(b.date)).map((session) => `
          <article class="tournament-card">
            <div><strong>${session.title}</strong><span>${session.date} / ${session.focus}</span><small>${session.notes}</small></div>
            <button class="danger-button delete-session" data-id="${session.id}" type="button">Remove</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function auditPage() {
  if (!canManageRoles()) return dashboardPage();
  return `
    <section class="section-title">
      <div><h2>Audit Log</h2><p>Recent account, roster, score, leave, and team-management actions.</p></div>
    </section>
    <section class="panel game-panel">
      <div class="table-wrap">${auditTable()}</div>
    </section>
  `;
}

function auditTable() {
  return `<table>
    <thead><tr><th>Date</th><th>User</th><th>Role</th><th>Action</th><th>Detail</th></tr></thead>
    <tbody>${state.auditLog.length ? state.auditLog.slice().reverse().map((item) => `
      <tr><td>${new Date(item.date).toLocaleString()}</td><td>${item.actor}</td><td>${item.role}</td><td>${item.action}</td><td>${item.detail}</td></tr>
    `).join("") : `<tr><td colspan="5">No audit events yet.</td></tr>`}</tbody>
  </table>`;
}

function approvedLeaveDays(athleteId) {
  return state.leaveRequests
    .filter((request) => request.athleteId === athleteId && request.status === "Approved")
    .reduce((sum, request) => sum + request.days, 0);
}

function leaveDays(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < startDate) return 0;
  return Math.round((endDate - startDate) / 86400000) + 1;
}

function roleManagementPanel() {
  if (!canManageRoles()) return "";
  return `
    <section class="panel game-panel" style="margin-bottom:16px">
      <div class="section-title" style="margin-bottom:14px">
        <div><h2>Staff Roles</h2><p>Assign Coach, Moderator, or Admin access for team staff.</p></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Password</th><th>Role</th><th></th></tr></thead>
          <tbody>
            ${state.accounts.map((account) => `
              <tr>
                <td>${account.name}</td>
                <td>${account.email}</td>
                <td>${"*".repeat(Math.min(10, account.password.length))}</td>
                <td>
                  <select class="role-select" data-email="${account.email}">
                    ${["Coach", "Moderator", "Admin"].map((role) => `<option value="${role}" ${account.role === role ? "selected" : ""}>${role}</option>`).join("")}
                  </select>
                </td>
                <td>${account.email === state.user.email ? "<span class=\"meta-line\">Current user</span>" : `<button class="danger-button delete-account" data-email="${account.email}" type="button">Remove</button>`}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <form class="tournament-form" id="accountForm" style="margin-top:14px">
        <input id="accountName" placeholder="Staff name" required />
        <input id="accountEmail" type="email" placeholder="Email" required />
        <input id="accountPassword" placeholder="Password" required />
        <select id="accountRole">
          <option>Coach</option>
          <option>Moderator</option>
          <option>Admin</option>
        </select>
        <button class="button game-button" type="submit">Add Staff</button>
      </form>
    </section>
  `;
}

function athletePage() {
  const athlete = selectedAthlete();
  if (!athlete) return emptyAthletes();
  const current = latestTest(athlete);
  const previous = previousTest(athlete);
  return `
    <section class="section-title">
      <div><h2>Athlete Profile</h2><p>Attendance record, activity history, and calibrated rating.</p></div>
      ${canEdit() ? athleteSelect(athlete) : ""}
    </section>
    <section class="profile-layout">
      <div class="panel profile-card game-panel">
        <div class="profile-header">
          <div>
            <h2>${athlete.name}</h2>
            <div class="meta-line">${athlete.sport} / ${athlete.position}</div>
          </div>
          <div class="score-ring" style="--score:${overallRating(athlete)}">${overallRating(athlete)}</div>
        </div>
        <div class="info-grid">
          <div class="info-item"><span>Age</span>${athlete.age}</div>
          <div class="info-item"><span>Contact</span>${athlete.contact}</div>
          <div class="info-item"><span>Attendance</span>${attendancePercent(athlete)}%</div>
          <div class="info-item"><span>Access Code</span>${athlete.accessCode}</div>
          <div class="info-item"><span>Status</span>${athlete.injuryStatus || "Available"}</div>
          <div class="info-item"><span>Emergency</span>${athlete.emergencyContact || "Not set"}</div>
        </div>
        <div class="btn-row">
          ${canEdit() ? `<button class="button game-button" data-page="tests">Record Activity Test</button>` : ""}
          <button class="ghost-button" data-page="reports">Report</button>
        </div>
      </div>
      <div class="panel game-panel">
        <h2>Calibrated Fitness Scores</h2>
        <div class="score-grid" style="margin-top:14px">
          ${components.map((name) => `
            <div class="score-box"><span class="meta-line">${name}</span><strong>${current ? current.scores[name] : 0}</strong></div>
          `).join("")}
        </div>
      </div>
    </section>
    <section class="grid two-col" style="margin-top:16px">
      <div class="panel game-panel">
        <h2>Progress Tracking</h2>
        <div class="table-wrap" style="margin-top:12px">${progressTable(athlete)}</div>
      </div>
      <div class="panel game-panel">
        <h2>Previous vs Current</h2>
        <div class="bar-list" style="margin-top:16px">
          ${components.slice(0, 6).map((name) => {
            const now = current ? current.scores[name] : 0;
            const before = previous ? previous.scores[name] : 0;
            return `<div class="bar-row">
              <div class="bar-head"><span>${name}</span><span>${before} -> ${now}</span></div>
              <div class="bar-track"><div class="bar-fill" style="--value:${now}%"></div></div>
            </div>`;
          }).join("")}
        </div>
      </div>
    </section>
  `;
}

function athleteSelect(athlete) {
  return `<select id="athleteSelect">${state.athletes.map((item) => `<option value="${item.id}" ${item.id === athlete.id ? "selected" : ""}>${item.name}</option>`).join("")}</select>`;
}

function attendancePage() {
  if (!canEdit()) return athletePage();
  return `
    <section class="section-title">
      <div><h2>Attendance</h2><p>Mark athletes as present, absent, late, or excused.</p></div>
      <div class="field" style="margin:0; min-width:220px">
        <label for="attendanceDate">Session Date</label>
        <input id="attendanceDate" type="date" value="${state.attendanceDate}" />
      </div>
    </section>
    <section class="panel game-panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Athlete</th><th>Sport</th><th>Status</th><th>Attendance %</th></tr></thead>
          <tbody>
            ${state.athletes.map((athlete) => {
              const record = athlete.attendance.find((item) => item.date === state.attendanceDate);
              const status = record ? record.status : "Absent";
              return `<tr>
                <td><strong>${athlete.name}</strong><div class="meta-line">${athlete.position}</div></td>
                <td>${athlete.sport}</td>
                <td>
                  <div class="attendance-controls">
                    ${["Present", "Absent", "Late", "Excused"].map((item) => `
                      <button class="segment attendance-status ${status === item ? "active" : ""}" data-id="${athlete.id}" data-status="${item}">${item}</button>
                    `).join("")}
                  </div>
                </td>
                <td><span class="rating-pill">${attendancePercent(athlete)}%</span></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function testsPage() {
  if (!canEdit()) return athletePage();
  const athlete = selectedAthlete();
  if (!athlete) return emptyAthletes();
  const current = latestTest(athlete);
  const activities = current ? current.activities : defaultActivities();
  const preview = calibrateStats(activities);
  return `
    <section class="section-title">
      <div><h2>Activity Scorecard</h2><p>Input raw activity results. The app calibrates the fitness stats automatically.</p></div>
      ${athleteSelect(athlete)}
    </section>
    ${testSetupPanel()}
    <form class="panel game-panel" id="testForm">
      <div class="form-grid">
        <div class="field">
          <label for="testDate">Test Date</label>
          <input id="testDate" type="date" value="${new Date().toISOString().slice(0, 10)}" required />
        </div>
        <div class="field">
          <label for="remarks">Coach Remarks</label>
          <input id="remarks" placeholder="Short training note" />
        </div>
      </div>
      <div class="activity-grid">
        ${testDefinitions().map((test) => `
          <div class="activity-field">
            <label for="${test.id}">
              <span>${test.name}</span>
              <strong id="${test.id}Score">${activityScore(test, activities[test.id])}/100</strong>
            </label>
            <div class="activity-input-row">
              <input id="${test.id}" class="activity-input" type="number" min="${test.min}" max="${test.max}" step="0.1" value="${activities[test.id] ?? test.defaultValue}" data-id="${test.id}" />
              <span>${test.unit}</span>
            </div>
            <small>${test.help}</small>
          </div>
        `).join("")}
      </div>
      <div class="calibration-preview">
        ${components.map((name) => `<span>${name}<strong id="${slug(name)}Preview">${preview[name]}</strong></span>`).join("")}
      </div>
      <div class="btn-row" style="margin-top:18px">
        <button class="button game-button" id="saveTestBtn" type="button">Save Calibrated Test</button>
        <span class="rating-pill" id="liveOverall">Overall ${average(Object.values(preview))}/100</span>
      </div>
    </form>
    <section class="panel game-panel" style="margin-top:16px">
      <h2>Activity Test History</h2>
      <div class="table-wrap" style="margin-top:12px">${testHistoryTable(athlete)}</div>
    </section>
  `;
}

function testSetupPanel() {
  return `
    <section class="panel game-panel" style="margin-bottom:16px">
      <div class="section-title" style="margin-bottom:14px">
        <div><h2>Editable Test Setup</h2><p>One fitness component equals one test. Change the test name, scoring range, and input needed.</p></div>
        <button class="ghost-button" id="resetTestsBtn" type="button">Reset Defaults</button>
      </div>
      <div class="test-editor-grid">
        ${testDefinitions().map((test) => `
          <div class="test-editor-card" data-test-id="${test.id}">
            <div class="field"><label>Fitness Component</label><input value="${test.component}" disabled /></div>
            <div class="field"><label>Type of Test</label><input class="test-def-input" data-field="name" value="${test.name}" /></div>
            <div class="field"><label>Input Needed / Unit</label><input class="test-def-input" data-field="unit" value="${test.unit}" /></div>
            <div class="field"><label>Input Type</label>
              <select class="test-def-input" data-field="inputType">
                ${["number", "time", "reps", "score", "distance"].map((type) => `<option value="${type}" ${test.inputType === type ? "selected" : ""}>${type}</option>`).join("")}
              </select>
            </div>
            <div class="form-grid compact-fields">
              <div class="field"><label>Min</label><input class="test-def-input" data-field="min" type="number" step="0.1" value="${test.min}" /></div>
              <div class="field"><label>Max</label><input class="test-def-input" data-field="max" type="number" step="0.1" value="${test.max}" /></div>
              <div class="field"><label>Default</label><input class="test-def-input" data-field="defaultValue" type="number" step="0.1" value="${test.defaultValue}" /></div>
              <div class="field"><label>Scoring</label>
                <select class="test-def-input" data-field="lowerIsBetter">
                  <option value="false" ${!test.lowerIsBetter ? "selected" : ""}>Higher is better</option>
                  <option value="true" ${test.lowerIsBetter ? "selected" : ""}>Lower is better</option>
                </select>
              </div>
            </div>
            <div class="field"><label>Coach Note</label><input class="test-def-input" data-field="help" value="${test.help}" /></div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function reportsPage() {
  const athlete = selectedAthlete();
  if (!athlete) return emptyAthletes();
  const current = latestTest(athlete);
  return `
    <section class="section-title">
      <div><h2>Reports</h2><p>${isAthleteUser() ? "View your personal performance report." : "Generate a simple athlete performance report."}</p></div>
      <div class="btn-row">
        ${canEdit() ? athleteSelect(athlete) : ""}
        <button class="button game-button" id="printBtn">PDF / Print</button>
        <button class="ghost-button" id="exportDocBtn" type="button">Docs</button>
        <button class="ghost-button" id="exportCsvBtn" type="button">Excel CSV</button>
        <button class="ghost-button" id="exportJsonBtn" type="button">Data</button>
      </div>
    </section>
    <section class="report-sheet game-panel">
      <div class="report-head">
        <div>
          <h2>${athlete.name}</h2>
          <div class="meta-line">${athlete.sport} / ${athlete.position} / Age ${athlete.age}</div>
        </div>
        <div>
          <strong>${state.teamName}</strong>
          <div class="meta-line">Generated ${new Date().toLocaleDateString()}</div>
        </div>
      </div>
      <div class="report-grid">
        <div class="info-item"><span>Attendance Percentage</span>${attendancePercent(athlete)}%</div>
        <div class="info-item"><span>Overall Score</span>${overallRating(athlete)}/100</div>
        <div class="info-item"><span>Share Access</span>${state.teamCode} / ${athlete.accessCode}</div>
      </div>
      <div class="score-grid">
        ${components.map((name) => `<div class="score-box"><span class="meta-line">${name}</span><strong>${current ? current.scores[name] : 0}</strong></div>`).join("")}
      </div>
      <div class="panel" style="margin-top:16px; box-shadow:none">
        <h2>Latest Activity Inputs</h2>
        <div class="activity-mini-list">${current ? testDefinitions().map((test) => `<span>${test.name}<strong>${current.activities[test.id]} ${test.unit}</strong></span>`).join("") : "No activity tests recorded yet."}</div>
      </div>
      <div class="panel" style="margin-top:16px; box-shadow:none">
        <h2>Coach Remarks</h2>
        <p>${isAthleteUser() && !state.privacy.showPrivateNotesToAthletes ? "Coach remarks are private." : (current && current.remarks ? current.remarks : "No remarks recorded yet.")}</p>
      </div>
    </section>
  `;
}

function statCard(label, value, foot, icon) {
  return `<article class="stat-card game-stat">
    <div class="stat-label"><span>${label}</span><span>${icon}</span></div>
    <div class="stat-value">${value}</div>
    <div class="stat-foot">${foot}</div>
  </article>`;
}

function componentBar(name, athletes = visibleAthletes()) {
  const value = average(athletes.map((athlete) => {
    const test = latestTest(athlete);
    return test ? test.scores[name] : 0;
  }));
  return `<div class="bar-row">
    <div class="bar-head"><span>${name}</span><span>${value}/100</span></div>
    <div class="bar-track"><div class="bar-fill" style="--value:${value}%"></div></div>
  </div>`;
}

function athleteRankRow(athlete, rank) {
  return `<div class="bar-row">
    <div class="bar-head"><span>${rank}. ${athlete.name}</span><span>${overallRating(athlete)}</span></div>
    <div class="bar-track"><div class="bar-fill" style="--value:${overallRating(athlete)}%"></div></div>
  </div>`;
}

function athleteAccessPanel(athlete) {
  return `<div class="share-link-box vertical">
    <span class="eyebrow">Your login codes</span>
    <h2>${state.teamCode}</h2>
    <p>Team share code</p>
    <h2>${athlete.accessCode}</h2>
    <p>Personal athlete access code</p>
  </div>`;
}

function recentTestsTable(rows) {
  return `<table>
    <thead><tr><th>Date</th><th>Athlete</th><th>Overall</th><th>Activity Highlight</th><th>Remarks</th></tr></thead>
    <tbody>${rows.map(({ athlete, test }) => `
      <tr>
        <td>${test.date}</td>
        <td>${athlete.name}</td>
        <td><span class="rating-pill">${average(Object.values(test.scores))}</span></td>
        <td>${activityHighlight(test)}</td>
        <td>${test.remarks || "No remarks"}</td>
      </tr>
    `).join("")}</tbody>
  </table>`;
}

function progressTable(athlete) {
  const tests = [...athlete.tests].sort((a, b) => a.date.localeCompare(b.date));
  const featuredTests = testDefinitions().slice(0, 3);
  return `<table>
    <thead><tr><th>Date</th>${featuredTests.map((test) => `<th>${test.component}</th>`).join("")}<th>Overall</th></tr></thead>
    <tbody>${tests.map((test, index) => {
      const rating = average(Object.values(test.scores));
      const previous = tests[index - 1] ? average(Object.values(tests[index - 1].scores)) : rating;
      const change = rating - previous;
      return `<tr>
        <td>${test.date}</td>${featuredTests.map((definition) => `<td>${formatActivityValue(test, definition)}</td>`).join("")}
        <td><span class="rating-pill">${rating}</span> <span class="meta-line">${change >= 0 ? "+" : ""}${change}</span></td>
      </tr>`;
    }).join("")}</tbody>
  </table>`;
}

function testHistoryTable(athlete) {
  const tests = [...athlete.tests].sort((a, b) => b.date.localeCompare(a.date));
  const featuredTests = testDefinitions().slice(0, 4);
  return `<table>
    <thead><tr><th>Date</th><th>Overall</th>${featuredTests.map((test) => `<th>${test.component}</th>`).join("")}<th>Remarks</th></tr></thead>
    <tbody>${tests.map((test) => `<tr>
      <td>${test.date}</td><td><span class="rating-pill">${average(Object.values(test.scores))}</span></td>
      ${featuredTests.map((definition) => `<td>${formatActivityValue(test, definition)}</td>`).join("")}<td>${test.remarks || "No remarks"}</td>
    </tr>`).join("")}</tbody>
  </table>`;
}

function formatActivityValue(test, definition) {
  const value = test.activities?.[definition.id] ?? definition.defaultValue;
  return `${value} ${definition.unit}`.trim();
}

function activityHighlight(test) {
  const best = testDefinitions()
    .map((activity) => ({ name: activity.name, score: activityScore(activity, test.activities[activity.id]) }))
    .sort((a, b) => b.score - a.score)[0];
  return best ? `${best.name}: ${best.score}/100` : "No activity";
}

function bestComponent(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
}

function lowestComponent(athlete) {
  const test = latestTest(athlete);
  if (!test) return "Baseline";
  return Object.entries(test.scores).sort((a, b) => a[1] - b[1])[0][0];
}

function rankingValue(athlete, metric) {
  if (metric === "Overall") return overallRating(athlete);
  if (metric === "Attendance") return `${attendancePercent(athlete)}%`;
  const test = latestTest(athlete);
  return test ? test.scores[metric] : 0;
}

function teamPower(athletes = state.athletes) {
  return athletes.reduce((sum, athlete) => sum + overallRating(athlete), 0);
}

function nextTournament() {
  const today = new Date().toISOString().slice(0, 10);
  return state.tournaments
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0] || state.tournaments.slice().sort((a, b) => a.date.localeCompare(b.date))[0];
}

function comparisonValue(athlete, metric) {
  return rankingValue(athlete, metric);
}

function rankedAthletes() {
  return [...state.athletes].sort((a, b) => {
    const metric = state.rankingMetric;
    if (metric === "Attendance") return attendancePercent(b) - attendancePercent(a);
    if (metric === "Overall") return overallRating(b) - overallRating(a);
    const bTest = latestTest(b);
    const aTest = latestTest(a);
    return (bTest ? bTest.scores[metric] : 0) - (aTest ? aTest.scores[metric] : 0);
  });
}

function groupBy(items, getKey) {
  return items.reduce((groups, item) => {
    const key = getKey(item);
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

function emptyAthletes() {
  return `<section class="empty-state">Add an athlete to begin tracking attendance and performance.</section>`;
}

function bindCommon() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });

  document.getElementById("mobilePageSelect")?.addEventListener("change", (event) => {
    setPage(event.target.value);
  });

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    state.user = null;
    save();
    render();
  });

  document.getElementById("teamNameBtn")?.addEventListener("click", () => showTeamModal());
}

function bindPage() {
  document.getElementById("quickAddBtn")?.addEventListener("click", showAthleteModal);

  document.querySelectorAll(".open-athlete").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAthleteId = button.dataset.id;
      state.page = "athlete";
      save();
      render();
    });
  });

  document.querySelectorAll(".delete-athlete").forEach((button) => {
    button.addEventListener("click", () => {
      const removed = state.athletes.find((athlete) => athlete.id === button.dataset.id);
      state.athletes = state.athletes.filter((athlete) => athlete.id !== button.dataset.id);
      if (state.selectedAthleteId === button.dataset.id) state.selectedAthleteId = state.athletes[0]?.id;
      logAction("Athlete removed", removed?.name || "Athlete");
      save();
      render();
    });
  });

  document.querySelectorAll(".injury-select").forEach((select) => {
    select.addEventListener("change", () => {
      const athlete = state.athletes.find((item) => item.id === select.dataset.id);
      if (!athlete) return;
      athlete.injuryStatus = select.value;
      logAction("Athlete status updated", `${athlete.name}: ${select.value}`);
      save();
      render();
    });
  });

  document.querySelectorAll(".rank-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.rankingMetric = button.dataset.metric;
      render();
    });
  });

  document.getElementById("comparisonMetric")?.addEventListener("change", (event) => {
    state.rankingMetric = event.target.value;
    render();
  });

  document.getElementById("tournamentForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("tournamentName").value.trim();
    state.tournaments.push({
      id: cryptoId(),
      name,
      date: document.getElementById("tournamentDate").value,
      location: document.getElementById("tournamentLocation").value.trim(),
      notes: document.getElementById("tournamentNotes").value.trim(),
    });
    logAction("Tournament added", name);
    save();
    render();
  });

  document.querySelectorAll(".delete-tournament").forEach((button) => {
    button.addEventListener("click", () => {
      const event = state.tournaments.find((item) => item.id === button.dataset.id);
      state.tournaments = state.tournaments.filter((event) => event.id !== button.dataset.id);
      logAction("Tournament removed", event?.name || "Tournament");
      save();
      render();
    });
  });

  document.getElementById("leaveForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const athlete = selectedAthlete();
    const start = document.getElementById("leaveStart").value;
    const end = document.getElementById("leaveEnd").value;
    const days = leaveDays(start, end);
    if (!athlete || days < 1) return;
    state.leaveRequests.push({
      id: cryptoId(),
      athleteId: athlete.id,
      start,
      end,
      days,
      reason: document.getElementById("leaveReason").value.trim(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    });
    logAction("Leave requested", `${athlete.name}: ${start} to ${end}`);
    save();
    render();
  });

  document.getElementById("leaveAllowance")?.addEventListener("change", (event) => {
    state.leaveAllowance = Math.max(0, Number(event.target.value || 0));
    logAction("Leave allowance updated", `${state.leaveAllowance} days per year`);
    save();
    render();
  });

  document.querySelectorAll(".leave-action").forEach((button) => {
    button.addEventListener("click", () => {
      const request = state.leaveRequests.find((item) => item.id === button.dataset.id);
      if (!request) return;
      request.status = button.dataset.status;
      request.reviewedAt = new Date().toISOString();
      request.reviewedBy = state.user?.name || "Staff";
      const athlete = state.athletes.find((item) => item.id === request.athleteId);
      logAction(`Leave ${request.status.toLowerCase()}`, `${athlete?.name || "Athlete"}: ${request.start} to ${request.end}`);
      save();
      render();
    });
  });

  document.getElementById("announcementForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("announcementTitle").value.trim();
    state.announcements.push({
      id: cryptoId(),
      title,
      body: document.getElementById("announcementBody").value.trim(),
      audience: document.getElementById("announcementAudience").value,
      date: new Date().toISOString().slice(0, 10),
      author: state.user?.name || "Staff",
    });
    logAction("Announcement posted", title);
    save();
    render();
  });

  document.querySelectorAll(".delete-announcement").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.announcements.find((announcement) => announcement.id === button.dataset.id);
      state.announcements = state.announcements.filter((announcement) => announcement.id !== button.dataset.id);
      logAction("Announcement removed", item?.title || "Announcement");
      save();
      render();
    });
  });

  document.getElementById("chatForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const recipient = document.getElementById("chatRecipient").value;
    const body = document.getElementById("chatBody").value.trim();
    if (!body) return;
    state.messages.push({
      id: cryptoId(),
      sender: state.user.name,
      senderEmail: state.user.email,
      recipient,
      body,
      date: new Date().toISOString(),
    });
    logAction("Message sent", recipient === "All" ? "Everyone" : recipient);
    save();
    render();
  });

  document.getElementById("goalForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const athleteId = document.getElementById("goalAthlete").value;
    const title = document.getElementById("goalTitle").value.trim();
    state.goals.push({
      id: cryptoId(),
      athleteId,
      title,
      component: document.getElementById("goalComponent").value,
      target: Number(document.getElementById("goalTarget").value || 0),
      dueDate: document.getElementById("goalDueDate").value,
      status: "Active",
      notes: document.getElementById("goalNotes").value.trim(),
    });
    const athlete = state.athletes.find((item) => item.id === athleteId);
    logAction("Goal assigned", `${athlete?.name || "Athlete"}: ${title}`);
    save();
    render();
  });

  document.querySelectorAll(".goal-status").forEach((button) => {
    button.addEventListener("click", () => {
      const goal = state.goals.find((item) => item.id === button.dataset.id);
      if (!goal) return;
      goal.status = button.dataset.status;
      logAction("Goal status updated", `${goal.title}: ${goal.status}`);
      save();
      render();
    });
  });

  document.querySelectorAll(".delete-goal").forEach((button) => {
    button.addEventListener("click", () => {
      const goal = state.goals.find((item) => item.id === button.dataset.id);
      state.goals = state.goals.filter((item) => item.id !== button.dataset.id);
      logAction("Goal removed", goal?.title || "Goal");
      save();
      render();
    });
  });

  document.getElementById("templateForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const template = document.getElementById("sportTemplate").value;
    state.componentWeights = normalizeWeights(sportTemplates[template]);
    logAction("Sport template applied", template);
    save();
    render();
  });

  document.getElementById("weightsForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelectorAll(".weight-input").forEach((input) => {
      state.componentWeights[input.dataset.component] = Math.max(0, Number(input.value || 0));
    });
    state.componentWeights = normalizeWeights(state.componentWeights);
    logAction("Rating weights updated", "Weighted formula saved");
    save();
    render();
  });

  document.getElementById("privacyForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.privacy = {
      athleteCanViewRankings: document.getElementById("athleteCanViewRankings").checked,
      athleteCanViewTeamChat: document.getElementById("athleteCanViewTeamChat").checked,
      showPrivateNotesToAthletes: document.getElementById("showPrivateNotesToAthletes").checked,
    };
    logAction("Privacy settings updated", "Athlete permissions changed");
    save();
    render();
  });

  document.getElementById("reminderForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("reminderTitle").value.trim();
    state.reminders.push({
      id: cryptoId(),
      title,
      date: document.getElementById("reminderDate").value,
      audience: document.getElementById("reminderAudience").value,
    });
    logAction("Reminder added", title);
    save();
    render();
  });

  document.querySelectorAll(".delete-reminder").forEach((button) => {
    button.addEventListener("click", () => {
      const reminder = state.reminders.find((item) => item.id === button.dataset.id);
      state.reminders = state.reminders.filter((item) => item.id !== button.dataset.id);
      logAction("Reminder removed", reminder?.title || "Reminder");
      save();
      render();
    });
  });

  document.getElementById("exportBackupBtn")?.addEventListener("click", () => {
    downloadFile(`${slug(state.teamName)}-athlete-performance-backup.json`, JSON.stringify(backupPayload(), null, 2), "application/json");
    logAction("Backup exported", state.teamName);
    save();
  });

  document.getElementById("exportRosterCsvBtn")?.addEventListener("click", () => {
    downloadFile(`${slug(state.teamName)}-roster.csv`, rosterCsv(), "text/csv");
    logAction("Roster CSV exported", state.teamName);
    save();
  });

  document.getElementById("pushBackendBtn")?.addEventListener("click", async () => {
    const status = document.getElementById("backendStatus");
    state.backendUrl = document.getElementById("backendUrl").value.trim() || state.backendUrl;
    try {
      const response = await fetch(`${state.backendUrl}/api/data`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(backupPayload()),
      });
      if (!response.ok) throw new Error("Sync failed");
      if (status) status.textContent = "Team data pushed to backend.";
      logAction("Backend sync pushed", state.backendUrl);
      save();
    } catch {
      if (status) status.textContent = "Backend not reachable. Start backend-server.js first.";
    }
  });

  document.getElementById("pullBackendBtn")?.addEventListener("click", async () => {
    const status = document.getElementById("backendStatus");
    state.backendUrl = document.getElementById("backendUrl").value.trim() || state.backendUrl;
    try {
      const response = await fetch(`${state.backendUrl}/api/data`);
      if (!response.ok) throw new Error("Sync failed");
      restoreBackupData(await response.json());
      logAction("Backend sync pulled", state.backendUrl);
      save();
      render();
    } catch {
      if (status) status.textContent = "Backend not reachable. Start backend-server.js first.";
    }
  });

  document.getElementById("copyInviteBtn")?.addEventListener("click", async () => {
    const invite = `Join ${state.teamName} in Athlete Performance Tracker. Team code: ${state.teamCode}. Use your email and password, or create an athlete account with this team code.`;
    try {
      await navigator.clipboard.writeText(invite);
    } catch {
      window.prompt("Copy athlete invite text", invite);
    }
    logAction("Invite text copied", state.teamCode);
    save();
  });

  document.getElementById("restoreForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const backup = JSON.parse(document.getElementById("restoreData").value);
      restoreBackupData(backup);
      logAction("Backup restored", state.teamName);
      save();
      render();
    } catch {
      alert("That backup could not be restored. Please paste a valid exported JSON backup.");
    }
  });

  document.getElementById("csvImportForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const count = importAthletesFromCsv(document.getElementById("csvImport").value);
    logAction("Roster CSV imported", `${count} athletes`);
    save();
    alert(`${count} athletes imported.`);
    render();
  });

  document.getElementById("sessionForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("sessionTitle").value.trim();
    state.sessions.push({
      id: cryptoId(),
      title,
      date: document.getElementById("sessionDate").value,
      focus: document.getElementById("sessionFocus").value,
      notes: document.getElementById("sessionNotes").value.trim(),
    });
    logAction("Session planned", title);
    save();
    render();
  });

  document.querySelectorAll(".delete-session").forEach((button) => {
    button.addEventListener("click", () => {
      const session = state.sessions.find((item) => item.id === button.dataset.id);
      state.sessions = state.sessions.filter((item) => item.id !== button.dataset.id);
      logAction("Session removed", session?.title || "Session");
      save();
      render();
    });
  });

  document.querySelectorAll(".role-select").forEach((select) => {
    select.addEventListener("change", () => {
      const account = state.accounts.find((item) => normalizeEmail(item.email) === normalizeEmail(select.dataset.email));
      if (!account) return;
      account.role = select.value;
      if (normalizeEmail(state.user?.email) === normalizeEmail(account.email)) state.user.role = select.value;
      logAction("Staff role updated", `${account.email}: ${select.value}`);
      save();
      render();
    });
  });

  document.querySelectorAll(".delete-account").forEach((button) => {
    button.addEventListener("click", () => {
      const removed = state.accounts.find((account) => normalizeEmail(account.email) === normalizeEmail(button.dataset.email));
      state.accounts = state.accounts.filter((account) => normalizeEmail(account.email) !== normalizeEmail(button.dataset.email));
      logAction("Staff account removed", removed?.email || "Staff");
      save();
      render();
    });
  });

  document.getElementById("accountForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = normalizeEmail(document.getElementById("accountEmail").value);
    const password = document.getElementById("accountPassword").value.trim();
    if (!isValidEmail(email) || !isPasswordValid(password) || emailExists(email)) return;
    state.accounts.push({
      name: document.getElementById("accountName").value.trim(),
      username: emailToUsername(email),
      email,
      password,
      role: document.getElementById("accountRole").value,
    });
    logAction("Staff account added", email);
    save();
    render();
  });

  document.getElementById("athleteSelect")?.addEventListener("change", (event) => {
    state.selectedAthleteId = event.target.value;
    save();
    render();
  });

  document.getElementById("attendanceDate")?.addEventListener("change", (event) => {
    state.attendanceDate = event.target.value;
    render();
  });

  document.querySelectorAll(".attendance-status").forEach((button) => {
    button.addEventListener("click", () => {
      const athlete = state.athletes.find((item) => item.id === button.dataset.id);
      const existing = athlete.attendance.find((item) => item.date === state.attendanceDate);
      if (existing) existing.status = button.dataset.status;
      else athlete.attendance.push({ date: state.attendanceDate, status: button.dataset.status });
      logAction("Attendance marked", `${athlete.name}: ${button.dataset.status}`);
      save();
      render();
    });
  });

  document.querySelectorAll(".activity-input").forEach((input) => {
    input.addEventListener("input", updateCalibrationPreview);
  });

  document.querySelectorAll(".test-def-input").forEach((input) => {
    input.addEventListener("change", updateTestDefinition);
    input.addEventListener("input", updateTestDefinition);
  });

  document.getElementById("resetTestsBtn")?.addEventListener("click", () => {
    state.testDefinitions = normalizeTestDefinitions(defaultTestDefinitions);
    currentTestDefinitions = state.testDefinitions;
    recalculateAllScores();
    save();
    render();
  });

  document.getElementById("testForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveActivityTest();
  });

  document.getElementById("saveTestBtn")?.addEventListener("click", saveActivityTest);

  document.getElementById("printBtn")?.addEventListener("click", () => window.print());
  document.getElementById("exportDocBtn")?.addEventListener("click", () => exportReport("doc"));
  document.getElementById("exportCsvBtn")?.addEventListener("click", () => exportReport("csv"));
  document.getElementById("exportJsonBtn")?.addEventListener("click", () => exportReport("json"));
}

function showAthleteModal() {
  const suggestedCode = uniqueAccessCode("Athlete");
  const suggestedEmail = `athlete${Math.floor(1000 + Math.random() * 9000)}@school.edu`;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal">
      <form class="modal-card game-card" id="athleteForm">
        <h2>Add Athlete</h2>
        <div class="form-grid">
          <div class="field"><label>Name</label><input id="newName" required /></div>
          <div class="field"><label>Age</label><input id="newAge" type="number" min="5" max="80" value="16" required /></div>
          <div class="field"><label>Sport</label><input id="newSport" value="Soccer" required /></div>
          <div class="field"><label>Position or Event</label><input id="newPosition" value="Forward" required /></div>
          <div class="field"><label>Email</label><input id="newContact" type="email" value="${suggestedEmail}" required /></div>
          <div class="field"><label>Password</label><input id="newPassword" value="athlete123" required /></div>
          <div class="field"><label>Access Code</label><input id="newAccessCode" value="${suggestedCode}" required /></div>
          <div class="field"><label>Emergency Contact</label><input id="newEmergencyContact" placeholder="Parent or guardian contact" /></div>
          <div class="field"><label>Status</label><select id="newInjuryStatus"><option>Available</option><option>Limited</option><option>Injured</option><option>Rest</option></select></div>
        </div>
        <div class="login-error" id="athleteModalError"></div>
        <div class="btn-row">
          <button class="button game-button" type="submit">Save Athlete</button>
          <button class="ghost-button" type="button" id="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  `);
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("modal").addEventListener("click", (event) => {
    if (event.target.id === "modal") closeModal();
  });
  document.getElementById("athleteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const activities = defaultActivities();
    const email = normalizeEmail(document.getElementById("newContact").value);
    const password = document.getElementById("newPassword").value;
    if (!isValidEmail(email)) return showModalError("Enter a valid athlete email.");
    if (!isPasswordValid(password)) return showModalError("Password must be at least 6 characters.");
    if (emailExists(email)) return showModalError("That email already has an account.");
    const accessCode = document.getElementById("newAccessCode").value.trim().toUpperCase();
    if (state.athletes.some((athlete) => athlete.accessCode === accessCode)) return showModalError("That access code is already used.");
    const athlete = {
      id: cryptoId(),
      name: document.getElementById("newName").value.trim(),
      age: Number(document.getElementById("newAge").value),
      sport: document.getElementById("newSport").value.trim(),
      position: document.getElementById("newPosition").value.trim(),
      contact: email,
      password,
      accessCode,
      emergencyContact: document.getElementById("newEmergencyContact").value.trim(),
      injuryStatus: document.getElementById("newInjuryStatus").value,
      attendance: [],
      tests: [makeTestFromActivities(new Date().toISOString().slice(0, 10), activities, "Baseline activity calibration.")],
    };
    state.athletes.push(athlete);
    state.selectedAthleteId = athlete.id;
    state.page = "athlete";
    logAction("Athlete added", athlete.name);
    save();
    closeModal();
    render();
  });
}

function showModalError(message) {
  const error = document.getElementById("athleteModalError");
  if (error) error.textContent = message;
}

function showTeamModal() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="modal">
      <form class="modal-card game-card" id="teamForm">
        <h2>Team Setup</h2>
        <div class="field"><label>Team</label><input id="teamInput" value="${state.teamName}" required /></div>
        <div class="field"><label>Team Share Code</label><input id="teamCodeInput" value="${state.teamCode}" required /></div>
        <div class="field"><label>Team Logo URL</label><input id="teamLogoInput" value="${state.teamLogo}" placeholder="https://..." /></div>
        <div class="btn-row">
          <button class="button game-button" type="submit">Save</button>
          <button class="ghost-button" type="button" id="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  `);
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("teamForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.teamName = document.getElementById("teamInput").value.trim() || "My Team";
    state.teamCode = document.getElementById("teamCodeInput").value.trim().toUpperCase() || "TEAM-2026";
    state.teamLogo = document.getElementById("teamLogoInput").value.trim();
    logAction("Team setup updated", state.teamName);
    save();
    closeModal();
    render();
  });
}

function closeModal() {
  document.getElementById("modal")?.remove();
}

function collectActivities() {
  const activities = {};
  document.querySelectorAll(".activity-input").forEach((input) => {
    const test = testDefinitions().find((item) => item.id === input.dataset.id);
    activities[input.dataset.id] = clamp(Number(input.value), test.min, test.max);
  });
  return activities;
}

function updateTestDefinition(event) {
  const card = event.target.closest(".test-editor-card");
  if (!card) return;
  const definition = state.testDefinitions.find((test) => test.id === card.dataset.testId);
  if (!definition) return;
  const field = event.target.dataset.field;
  let value = event.target.value;
  if (["min", "max", "defaultValue"].includes(field)) value = Number(value);
  if (field === "lowerIsBetter") value = value === "true";
  definition[field] = value;
  if (definition.max <= definition.min) definition.max = definition.min + 1;
  currentTestDefinitions = state.testDefinitions;
  recalculateAllScores();
  save();
  updateCalibrationPreview();
}

function recalculateAllScores() {
  state.athletes.forEach((athlete) => {
    athlete.tests = athlete.tests.map((test) => normalizeSavedTest(test));
  });
}

function saveActivityTest() {
  const athlete = selectedAthlete();
  const date = document.getElementById("testDate")?.value;
  if (!athlete || !date) return;
  const activities = collectActivities();
  athlete.tests.push({
    id: cryptoId(),
    date,
    createdAt: new Date().toISOString(),
    activities: normalizeActivityKeys(activities),
    scores: calibrateStats(activities),
    remarks: document.getElementById("remarks").value.trim(),
  });
  athlete.tests = athlete.tests.map((test) => normalizeSavedTest(test));
  logAction("Activity test recorded", athlete.name);
  save();
  state.page = "athlete";
  render();
}

function exportReport(format) {
  const athlete = selectedAthlete();
  if (!athlete) return;
  const current = latestTest(athlete);
  const rows = [
    ["Athlete", athlete.name],
    ["Team", state.teamName],
    ["Sport", athlete.sport],
    ["Position/Event", athlete.position],
    ["Attendance", `${attendancePercent(athlete)}%`],
    ["Overall", `${overallRating(athlete)}/100`],
    ...components.map((component) => [component, current ? current.scores[component] : 0]),
    ["Coach Remarks", current?.remarks || ""],
  ];

  if (format === "csv") {
    downloadFile(`${slug(athlete.name)}-performance-report.csv`, rows.map((row) => row.map(csvCell).join(",")).join("\n"), "text/csv");
    return;
  }

  if (format === "json") {
    downloadFile(`${slug(athlete.name)}-performance-data.json`, JSON.stringify({ team: state.teamName, athlete, currentReport: rows }, null, 2), "application/json");
    return;
  }

  const html = `
    <html><head><meta charset="utf-8"><title>${athlete.name} Performance Report</title></head>
    <body>
      <h1>${athlete.name} Performance Report</h1>
      <p>${state.teamName} / ${athlete.sport} / ${athlete.position}</p>
      <table border="1" cellspacing="0" cellpadding="8">
        ${rows.map(([label, value]) => `<tr><th align="left">${label}</th><td>${value}</td></tr>`).join("")}
      </table>
    </body></html>
  `;
  downloadFile(`${slug(athlete.name)}-performance-report.doc`, html, "application/msword");
}

function csvCell(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function updateCalibrationPreview() {
  const activities = collectActivities();
  const scores = calibrateStats(activities);
  testDefinitions().forEach((test) => {
    const el = document.getElementById(`${test.id}Score`);
    if (el) el.textContent = `${activityScore(test, activities[test.id])}/100`;
  });
  components.forEach((name) => {
    const el = document.getElementById(`${slug(name)}Preview`);
    if (el) el.textContent = scores[name];
  });
  const live = document.getElementById("liveOverall");
  if (live) live.textContent = `Overall ${average(Object.values(scores))}/100`;
}

async function autoPullBackendOnLoad() {
  if (!state.backendUrl || localStorage.getItem("apt-auto-sync-disabled") === "true") return;
  try {
    const response = await fetch(`${state.backendUrl}/api/data`, { cache: "no-store" });
    if (!response.ok) return;
    const backup = await response.json();
    if (!backup || !Array.isArray(backup.athletes) || !backup.athletes.length) return;
    const currentUserEmail = state.user?.email;
    restoreBackupData(backup);
    state.backendUrl = backup.backendUrl || state.backendUrl || defaultBackendUrl;
    if (currentUserEmail) {
      const staff = state.accounts.find((account) => normalizeEmail(account.email) === normalizeEmail(currentUserEmail));
      const athlete = state.athletes.find((item) => normalizeEmail(item.contact) === normalizeEmail(currentUserEmail));
      if (staff) state.user = { name: staff.name, role: staff.role, username: staff.username, email: staff.email };
      else if (athlete) state.user = { name: athlete.name, role: "Athlete", athleteId: athlete.id, email: athlete.contact };
      else state.user = null;
    }
    save();
    render();
  } catch {
    // Offline or cold-start backend: keep the local browser copy.
  }
}

function initials(name) {
  return name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

render();
autoPullBackendOnLoad();
