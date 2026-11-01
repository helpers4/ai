/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: LGPL-3.0-or-later
 *
 * Drift check: every helper, feature and action named in the last column of the skills' tables
 * must still exist on helpers4.dev (presets: in the exports of @helpers4/presets). Exits 1 and prints the missing names otherwise.
 */
import { readFileSync } from 'node:fs';

const REFS = new URL('../plugins/helpers4/skills/replace-with-helpers4/references/', import.meta.url);
const SITE = 'https://helpers4.dev';

const get = async (url) => {
  const res = await fetch(url);
  return { ok: res.ok, text: res.ok ? await res.text() : '' };
};

/** Backticked tokens of the last column of every table row, as written. */
function tokens(file) {
  const found = new Set();
  for (const line of readFileSync(new URL(file, REFS), 'utf8').split('\n')) {
    if (!line.startsWith('|') || /^\|\s*-/.test(line)) continue;
    const cells = line.split(/(?<!\\)\|/).map((c) => c.trim()).filter(Boolean);
    for (const [, token] of cells.at(-1).matchAll(/`([^`]+)`/g)) found.add(token);
  }
  return [...found];
}

/** Backticked names of the last column of every table row. */
function names(file) {
  const found = new Set();
  for (const line of readFileSync(new URL(file, REFS), 'utf8').split('\n')) {
    if (!line.startsWith('|') || /^\|\s*-/.test(line)) continue;
    const cells = line.split(/(?<!\\)\|/).map((c) => c.trim()).filter(Boolean);
    const last = cells.at(-1);
    for (const [, token] of last.matchAll(/`([^`]+)`/g)) {
      const name = token.split(/::|\//).pop();
      if (/^[A-Za-z_][\w]*$/.test(name)) found.add(name);
    }
  }
  return [...found];
}

const missing = [];

// How each reference writes an item name: TypeScript in backticks, Rust as a `### module::name` heading.
for (const [file, source, pattern] of [
  ['typescript.md', `${SITE}/typescript/llms-full.txt`, (name) => `\`${name}[\`(<]`],
  ['rust.md', `${SITE}/rust/llms-full.txt`, (name) => `(::|\\b(fn|struct|enum|trait|type) )${name}\\b`],
]) {
  const { ok, text } = await get(source);
  if (!ok) {
    console.error(`cannot fetch ${source}`);
    process.exit(2);
  }
  for (const name of names(file)) {
    if (!new RegExp(pattern(name)).test(text)) missing.push(`${file}: ${name}`);
  }
}

for (const [file, section] of [
  ['devcontainer.md', 'devcontainer/features'],
  ['action.md', 'action/actions'],
]) {
  for (const name of names(file)) {
    const slug = name.replaceAll('_', '-');
    const { ok } = await get(`${SITE}/${section}/${slug}/`);
    if (!ok) missing.push(`${file}: ${slug}`);
  }
}

// Presets: every file path named must be in the public `exports` of @helpers4/presets.
{
  const source = 'https://raw.githubusercontent.com/helpers4/typescript/main/presets/package.json';
  const { ok, text } = await get(source);
  if (!ok) {
    console.error(`cannot fetch ${source}`);
    process.exit(2);
  }
  const exported = Object.keys(JSON.parse(text).exports).map((key) => key.slice(2));
  const isExported = (path) =>
    exported.some((key) => key === path || (key.endsWith('/*') && path.startsWith(key.slice(0, -1))));
  const looksLikePath = /^[a-z][a-z0-9.-]*(\/[a-z0-9.-]+)*$/;
  for (const token of tokens('presets.md')) {
    const path = token.replace(/^@helpers4\/presets\//, '');
    if (looksLikePath.test(path) && !isExported(path)) missing.push(`presets.md: ${path}`);
  }
}

if (missing.length > 0) {
  console.error(`Names no longer found on ${SITE}:\n${missing.map((m) => `  - ${m}`).join('\n')}`);
  process.exit(1);
}
console.log('All names exist.');
