import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ease path ot /data folder
const dataPath = path.join(__dirname, "..", "data");

export function readJSON(filename) {
  const filePath = path.join(dataPath, filename);
  const data = readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export function writeJSON(filename, data) {
  const filePath = path.join(dataPath, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}
