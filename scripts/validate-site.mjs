import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const REQUIRED_FILES = ["public/index.html", "public/styles.css", "public/site.js", "nginx.conf", "security-headers.conf", "Dockerfile"];
const REQUIRED_HTML_MARKERS = ["<main id=\"conteudo\">", "<h1 id=\"hero-title\">", "id=\"trilhas\"", "id=\"radar\"", "id=\"metodo\"", "href=\"/styles.css\"", "src=\"/site.js\""];
const REQUIRED_NGINX_MARKERS = ["listen 8080", "location = /healthz", "security-headers.conf"];
const REQUIRED_SECURITY_HEADER_MARKERS = ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy"];

async function assertContains(filePath, markers) {
  const contents = await readFile(resolve(ROOT, filePath), "utf8");
  const missing = markers.filter((marker) => !contents.includes(marker));
  if (missing.length > 0) {
    throw new Error(`${filePath} is missing: ${missing.join(", ")}`);
  }
}

await Promise.all(REQUIRED_FILES.map((filePath) => readFile(resolve(ROOT, filePath))));
await assertContains("public/index.html", REQUIRED_HTML_MARKERS);
await assertContains("nginx.conf", REQUIRED_NGINX_MARKERS);
await assertContains("security-headers.conf", REQUIRED_SECURITY_HEADER_MARKERS);
console.log("rogpLabs static site validation passed");
