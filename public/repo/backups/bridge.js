/**
 * XyPriss Bridge Logic (XFPM Engine)
 *
 * Internal script used by native installers to pull the correct Go-based binary
 * into the local installation context.
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const REPO = "Nehonix-Team/XFPM";
const SDK_BASE_URL = `https://github.com/${REPO}/releases/latest/download`;

const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function info(msg) {
  console.log(`${COLORS.blue}[BRIDGE] ${msg}${COLORS.reset}`);
}
function success(msg) {
  console.log(`${COLORS.green}[BRIDGE] ${msg}${COLORS.reset}`);
}
function error(msg) {
  console.error(`${COLORS.red}[BRIDGE] Error: ${msg}${COLORS.reset}`);
}

function detectPlatform() {
  const platform = os.platform();
  const arch = os.arch();
  let binaryName;

  switch (platform) {
    case "darwin":
      binaryName = arch === "arm64" ? "xfpm-darwin-arm64" : "xfpm-darwin-amd64";
      break;
    case "linux":
      binaryName =
        arch === "x64"
          ? "xfpm-linux-amd64"
          : arch === "arm64"
            ? "xfpm-linux-arm64"
            : "xfpm-linux-amd64";
      break;
    case "win32":
      binaryName =
        arch === "arm64" ? "xfpm-windows-arm64.exe" : "xfpm-windows-amd64.exe";
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }

  return {
    binaryName,
    downloadUrl: `${SDK_BASE_URL}/${binaryName}`,
    isWin: platform === "win32",
  };
}

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const downloadWithRedirect = (downloadUrl, redirectCount = 0) => {
      if (redirectCount > 5) return reject(new Error("Too many redirects"));

      const protocol = downloadUrl.startsWith("https:") ? https : http;
      protocol
        .get(
          downloadUrl,
          { headers: { "User-Agent": "XyPBridge-Fetch" } },
          (response) => {
            if ([301, 302, 307, 308].includes(response.statusCode)) {
              return downloadWithRedirect(
                response.headers.location,
                redirectCount + 1,
              );
            }

            if (response.statusCode !== 200) {
              return reject(
                new Error(`Fetch failed: HTTP ${response.statusCode}`),
              );
            }

            const file = fs.createWriteStream(destPath);
            response.pipe(file);
            file.on("finish", () => {
              file.close();
              resolve();
            });
            file.on("error", (err) => {
              fs.unlink(destPath, () => {});
              reject(err);
            });
          },
        )
        .on("error", (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
    };
    downloadWithRedirect(url);
  });
}

async function main() {
  try {
    const { binaryName, downloadUrl, isWin } = detectPlatform();
    const targetFilename = isWin ? "xfpm.exe" : "xfpm";

    info(`Targeting engine: ${binaryName}`);
    info(`Mapping stream to: ${targetFilename}`);

    await downloadFile(downloadUrl, targetFilename);

    success("Binary stream synchronized.");
    process.exit(0);
  } catch (err) {
    error(err.message);
    process.exit(1);
  }
}

main();
