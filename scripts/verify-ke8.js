#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const failures = [];
const pass = (message) => console.log("PASS  " + message);
const fail = (message) => failures.push(message);
const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicates.length) fail("Duplicate HTML IDs: " + [...new Set(duplicates)].join(", "));
else pass("HTML IDs are unique (" + ids.length + " IDs)");

const pages = new Set([...markup.matchAll(/<section\s+id="([^"]+)"\s+class="page/g)].map((match) => match[1]));
const navTargets = [...markup.matchAll(/data-page="([^"]+)"/g)].map((match) => match[1]);
const missingTargets = navTargets.filter((target) => !pages.has(target));
if (missingTargets.length) fail("Navigation targets without pages: " + missingTargets.join(", "));
else pass("All navigation targets resolve to pages (" + navTargets.length + " links)");

const requiredPages = ["home", "prep", "syllabus", "archive", "practice", "insight", "review"];
const missingPages = requiredPages.filter((page) => !pages.has(page));
if (missingPages.length) fail("Required pages missing: " + missingPages.join(", "));
else pass("All KE8 core pages are present");

const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((match) => match[1]).filter((source) => source.trim());
try {
  scripts.forEach((source, index) => new vm.Script(source, { filename: "index.html:inline-script-" + (index + 1) }));
  pass("Inline JavaScript syntax parses (" + scripts.length + " scripts)");
} catch (error) {
  fail("Inline JavaScript syntax error: " + error.message);
}

const keys = ["ke8PracticeStatsV2", "ke8PracticeStatsV1", "ke8PracticeHistoryV1", "ke8DailyGoal", "ke8ReviewBookV1"];
const missingKeys = keys.filter((key) => !html.includes(key));
if (missingKeys.length) fail("Persistence markers missing: " + missingKeys.join(", "));
else pass("Existing and new localStorage contracts are present");

if (!html.includes("window.KE8ReviewBook.capture")) fail("Practice Arena is not connected to Review Desk");
else pass("Practice Arena is connected to Review Desk capture");

const resourceRefs = [...html.matchAll(/openLink\('([^']+)'\)/g)].map((match) => match[1]);
const linkBlock = html.match(/const LINKS = \{([\s\S]*?)\n\};/);
if (!linkBlock) fail("Google Drive LINKS registry not found");
else {
  const missingResources = [...new Set(resourceRefs)].filter((key) => !linkBlock[1].includes('"' + key + '"'));
  if (missingResources.length) fail("Resource keys missing from LINKS registry: " + missingResources.join(", "));
  else pass("Resource references resolve to the LINKS registry");
}

if (failures.length) {
  console.error("\nVERIFICATION FAILED");
  failures.forEach((message) => console.error("FAIL  " + message));
  process.exitCode = 1;
} else {
  console.log("\nVERIFICATION PASSED");
}
