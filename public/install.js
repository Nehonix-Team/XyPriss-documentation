#!/usr/bin/env node

/**
 * XyPriss CLI Manager Gateway
 *
 * This script serves as the primary entry point for managing XyPriss CLI
 * on any platform. It handles platform detection and delegates the
 * heavy lifting to native scripts (sh/ps1).
 *
 * Usage:
 *   node install.js [install|uninstall]
 */

const os = require("os");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

const BASE_URL = "https://dll.nehonix.com/repo/n/fractostate/scripts";

function log(msg, color = COLORS.reset) {
  console.log(`${color}${msg}${COLORS.reset}`);
}

function printBanner() {
  log("\n" + "=".repeat(50), COLORS.magenta);
  log("   ⚡ XYPRISS ENGINE - CLI MANAGER ⚡", COLORS.bright + COLORS.cyan);
  log("=".repeat(50) + "\n", COLORS.magenta);
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download script: HTTP ${response.statusCode}`),
          );
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  // Better argument parsing for piped execution
  const allArgs = [...process.argv];
  const isUninstall = allArgs.includes("uninstall");
  const command = isUninstall ? "uninstall" : "install";

  printBanner();

  const platform = os.platform();
  const arch = os.arch();
  const isWindows = platform === "win32";
  const scriptExt = isWindows ? "ps1" : "sh";
  const scriptName = `install.${scriptExt}`;
  const downloadUrl = `${BASE_URL}/${scriptName}`;
  const tmpScript = path.join(
    os.tmpdir(),
    `xypriss_${Math.random().toString(36).substring(7)}_${scriptName}`,
  );

  try {
    log(`[>] MODE: ${command.toUpperCase()}`, COLORS.bright + COLORS.yellow);
    log(`[>] TARGET: ${platform} ${arch}`, COLORS.blue);

    log(`[>] Fetching native deployment engine...`, COLORS.blue);
    await downloadFile(downloadUrl, tmpScript);

    log(`[>] Initializing system sequence...\n`, COLORS.bright + COLORS.cyan);

    let child;
    if (isWindows) {
      child = spawn(
        "powershell.exe",
        [
          "-NoProfile",
          "-ExecutionPolicy",
          "Bypass",
          "-File",
          tmpScript,
          "-Action",
          command,
        ],
        { stdio: "inherit" },
      );
    } else {
      fs.chmodSync(tmpScript, "755");
      child = spawn("bash", [tmpScript, command], {
        stdio: "inherit",
      });
    }

    child.on("close", (code) => {
      // Cleanup
      try {
        if (fs.existsSync(tmpScript)) fs.unlinkSync(tmpScript);
      } catch (e) {}

      if (code === 0) {
        log(`\n[✔] XyPriss sequence completed.`, COLORS.green);
        if (command === "install") {
          log(
            `[i] You may need to restart your shell to refresh PATH environment.`,
            COLORS.yellow,
          );
        }
      } else {
        log(`\n[✘] Sequence failed (Exit Code: ${code}).`, COLORS.red);
        process.exit(code);
      }
    });
  } catch (err) {
    log(`\n[!] Deployment Error: ${err.message}`, COLORS.red);
    if (fs.existsSync(tmpScript))
      try {
        fs.unlinkSync(tmpScript);
      } catch (e) {}
    process.exit(1);
  }
}

main();
