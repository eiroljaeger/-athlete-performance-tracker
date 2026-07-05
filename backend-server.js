const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8787);
const DATA_FILE = path.join(__dirname, "backend-data.json");

function readData() {
  if (!fs.existsSync(DATA_FILE)) return { teams: [], messages: [], updatedAt: new Date().toISOString() };
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeData(data) {
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

http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return json(res, 200, { ok: true });
  if (req.url === "/api/health") return json(res, 200, { ok: true, service: "Athlete Performance Tracker backend" });
  if (req.url === "/api/data" && req.method === "GET") return json(res, 200, readData());
  if (req.url === "/api/data" && req.method === "POST") {
    const body = await readBody(req);
    writeData(body);
    return json(res, 200, { ok: true });
  }
  json(res, 404, { error: "Not found" });
}).listen(PORT, () => {
  console.log(`Athlete Performance Tracker backend running on http://127.0.0.1:${PORT}`);
});
