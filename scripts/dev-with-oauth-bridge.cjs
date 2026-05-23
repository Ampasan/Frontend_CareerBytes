const { spawn } = require("node:child_process");
const { existsSync, readFileSync } = require("node:fs");
const { createServer, get } = require("node:http");
const { join } = require("node:path");

const DEFAULT_API_BASE_URL =
  "https://careerbytes-capstone-production-d45d.up.railway.app";
const FRONTEND_PORT = Number(process.env.VITE_DEV_PORT || 5173);
const BRIDGE_PORT = Number(process.env.OAUTH_BRIDGE_PORT || 3000);
const cwd = process.cwd();

const readEnvValue = (key) => {
  const envPath = join(cwd, ".env");
  if (!existsSync(envPath)) return "";

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  const prefix = `${key}=`;
  const line = lines.find((entry) => entry.trim().startsWith(prefix));

  if (!line) return "";

  return line
    .trim()
    .slice(prefix.length)
    .trim()
    .replace(/^["']|["']$/g, "");
};

const normalizeBaseUrl = (url = "") => {
  const trimmedUrl = url.trim().replace(/\/+$/, "");
  if (!trimmedUrl) return DEFAULT_API_BASE_URL;

  return trimmedUrl.endsWith("/api")
    ? trimmedUrl.slice(0, -4)
    : trimmedUrl;
};

const apiBaseUrl = normalizeBaseUrl(
  process.env.VITE_API_BASE_URL ||
    readEnvValue("VITE_API_BASE_URL") ||
    DEFAULT_API_BASE_URL
);

const callbackPattern = /^\/api\/auth\/([^/]+)\/callback$/;
const viteCli = join(cwd, "node_modules", "vite", "bin", "vite.js");

let viteProcess;

const isFrontendAlreadyRunning = () =>
  new Promise((resolve) => {
    const request = get(
      {
        host: "localhost",
        port: FRONTEND_PORT,
        path: "/",
        timeout: 1000,
      },
      (response) => {
        response.resume();
        resolve(true);
      }
    );

    request.on("error", () => resolve(false));
    request.on("timeout", () => {
      request.destroy();
      resolve(false);
    });
  });

const bridgeServer = createServer((request, response) => {
  const requestUrl = new URL(
    request.url || "/",
    `http://${request.headers.host || `localhost:${BRIDGE_PORT}`}`
  );
  const callbackMatch = requestUrl.pathname.match(callbackPattern);

  if (callbackMatch) {
    const provider = callbackMatch[1];
    const targetUrl = new URL(`/api/auth/${provider}/callback`, apiBaseUrl);
    targetUrl.search = requestUrl.search;

    response.writeHead(302, {
      Location: targetUrl.toString(),
      "Cache-Control": "no-store",
    });
    response.end(`Redirecting to ${targetUrl.toString()}`);
    return;
  }

  if (requestUrl.pathname === "/") {
    response.writeHead(302, {
      Location: `http://localhost:${FRONTEND_PORT}/`,
      "Cache-Control": "no-store",
    });
    response.end("Redirecting to CareerBytes frontend");
    return;
  }

  response.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(
    "CareerBytes OAuth callback bridge. Use /api/auth/google/callback or /api/auth/github/callback."
  );
});

const shutdown = (exitCode = 0) => {
  bridgeServer.close(() => {});

  if (viteProcess && !viteProcess.killed) {
    viteProcess.kill();
  }

  process.exit(exitCode);
};

bridgeServer.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `OAuth callback bridge needs http://localhost:${BRIDGE_PORT}, but that port is already in use.`
    );
  } else {
    console.error(error);
  }

  shutdown(1);
});

bridgeServer.listen(BRIDGE_PORT, async () => {
  console.log(
    `OAuth callback bridge ready on http://localhost:${BRIDGE_PORT}`
  );
  console.log(`Forwarding OAuth callbacks to ${apiBaseUrl}`);

  if (await isFrontendAlreadyRunning()) {
    console.log(
      `Frontend already running on http://localhost:${FRONTEND_PORT}`
    );
    return;
  }

  viteProcess = spawn(
    process.execPath,
    [viteCli, "--host", "127.0.0.1", "--port", String(FRONTEND_PORT), "--strictPort"],
    {
      cwd,
      env: process.env,
      stdio: "inherit",
    }
  );

  viteProcess.on("exit", (code) => {
    bridgeServer.close(() => process.exit(code || 0));
  });
});

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
