const fs = require("fs");
const path = require("path");

// Get package.json version
const packageJson = require("../package.json");
const version = `REACT_APP_VERSION=${packageJson.version}`;

const envPath = path.join(__dirname, "../.env");

// Read existing .env file if it exists
let env = "";
if (fs.existsSync(envPath)) {
  env = fs.readFileSync(envPath, "utf8");
}

// Remove old version line if it exists
env = env
  .split("\n")
  .filter((line) => !line.startsWith("REACT_APP_VERSION="))
  .join("\n");

// Append new version line
env += `\n${version}\n`;

// Write back to .env file
fs.writeFileSync(envPath, env.trim() + "\n");

console.log(`✅ Updated .env with ${version}`);
