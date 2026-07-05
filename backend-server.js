const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8787);
const DATA_FILE = path.join(__dirname, "backend-data.json");

function normalizeCode(code = "") {
  return String(code).trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function emptyStore() {
  return { version: 2, teams: {}, updatedAt: new Date().toISOString() };
}

function migrateStore(data) {
  if (!data) return emptyStore();
  if (data.teams && !Array.isArray(data.teams)) return { ...emptyStore(), ...data };
  if (data.teamCode && Array.isArray(data.athletes)) {
    const code = normalizeCode(data.teamCode);
    return { ...emptyStore(), teams: { [code]: { ...data, teamCode: code } } };
  }
  return emptyStore();
}

function readStore() {
  if (!fs.existsSync(DATA_FILE)) return emptyStore();
  return migrateStore(JSON.parse(fs.readFileSync(DATA_FILE, "utf8")));
}

function writeStore(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }, null, 2));
}

function json(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function findTeamByEmail(store, email) {
  const normalized = normalizeEmail(email);
  return Object.values(store.teams).find((team) => {
    const staff = (team.accounts || []).some((account) => normalizeEmail(account.email) === normalized);
    const athlete = (team.athletes || []).some((item) => normalizeEmail(item.contact) === normalized);
    return staff || athlete;
  });
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "OPTIONS") return json(res, 200, { ok: true });
  if (url.pathname === "/api/health") return json(res, 200, { ok: true, service: "Athlete Performance Tracker backend", version: 2 });

  const store = readStore();

  if (url.pathname === "/api/data" && req.method === "GET") return json(res, 200, store);
  if (url.pathname === "/api/data" && req.method === "POST") {
    const body = await readBody(req);
    const code = normalizeCode(body.teamCode);
    if (!code) return json(res, 400, { error: "teamCode is required" });
    store.teams[code] = { ...body, teamCode: code };
    writeStore(store);
    return json(res, 200, { ok: true, teamCode: code });
  }

  const teamMatch = url.pathname.match(/^\/api\/teams\/([^/]+)$/);
  if (teamMatch && req.method === "GET") {
    const code = normalizeCode(decodeURIComponent(teamMatch[1]));
    const team = store.teams[code];
    return team ? json(res, 200, team) : json(res, 404, { error: "Team not found" });
  }
  if (teamMatch && req.method === "POST") {
    const code = normalizeCode(decodeURIComponent(teamMatch[1]));
    const body = await readBody(req);
    store.teams[code] = { ...body, teamCode: code };
    writeStore(store);
    return json(res, 200, { ok: true, teamCode: code });
  }

  const accountMatch = url.pathname.match(/^\/api\/accounts\/([^/]+)$/);
  if (accountMatch && req.method === "GET") {
    const team = findTeamByEmail(store, decodeURIComponent(accountMatch[1]));
    return team ? json(res, 200, team) : json(res, 404, { error: "Account not found" });
  }

  json(res, 404, { error: "Not found" });
}).listen(PORT, () => {
  console.log(`Athlete Performance Tracker backend running on http://127.0.0.1:${PORT}`);
});
