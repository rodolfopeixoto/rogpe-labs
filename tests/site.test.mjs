import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

test("keeps one clear page title and one H1", async () => {
  const html = await readFile(resolve(ROOT, "public/index.html"), "utf8");
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<html lang="pt-BR">/);
});

test("has a deterministic health endpoint and security headers", async () => {
  const nginx = await readFile(resolve(ROOT, "nginx.conf"), "utf8");
  const securityHeaders = await readFile(resolve(ROOT, "security-headers.conf"), "utf8");
  assert.match(nginx, /location = \/healthz/);
  assert.match(nginx, /return 200 "ok\\n"/);
  assert.match(nginx, /security-headers\.conf/);
  assert.match(securityHeaders, /Content-Security-Policy/);
  assert.match(securityHeaders, /X-Content-Type-Options/);
});

test("does not capture personal data in browser analytics", async () => {
  const siteScript = await readFile(resolve(ROOT, "public/site.js"), "utf8");
  assert.match(siteScript, /window\.umami\?\.track/);
  assert.doesNotMatch(siteScript, /email|phone|address|formdata/i);
});
