#!/usr/bin/env node
/*
 * Postinstall for @kk/design-system.
 *
 * When this package is installed as a dependency of a consumer project,
 * symlink the bundled Claude skills into the consumer's .claude/skills/
 * directory so the agent picks them up automatically.
 *
 * Skips the link in three cases:
 *   - INIT_CWD is missing (rare, defensive).
 *   - The consumer has set KK_DS_SKIP_SKILL_LINK=1 (opt-out).
 *   - We're inside the design system's own repo (no self-linking).
 */

const fs = require('fs');
const path = require('path');

const consumerRoot = process.env.INIT_CWD;
const packageRoot = path.resolve(__dirname, '..');

if (!consumerRoot) process.exit(0);
if (process.env.KK_DS_SKIP_SKILL_LINK === '1') process.exit(0);
if (path.resolve(consumerRoot) === path.resolve(packageRoot)) process.exit(0);

const skillsSrc = path.join(packageRoot, 'skills');
const claudeDir = path.join(consumerRoot, '.claude');
const skillsDest = path.join(claudeDir, 'skills');

if (!fs.existsSync(skillsSrc)) process.exit(0);

try {
  fs.mkdirSync(skillsDest, { recursive: true });
} catch (err) {
  console.warn('[kk-design-system] could not create', skillsDest, err.message);
  process.exit(0);
}

for (const name of fs.readdirSync(skillsSrc)) {
  const src = path.join(skillsSrc, name);
  const dest = path.join(skillsDest, name);

  // Remove any previous link/dir so the newest version always wins.
  try {
    const stat = fs.lstatSync(dest);
    if (stat.isSymbolicLink() || stat.isDirectory()) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
  } catch {
    // destination didn't exist, which is fine
  }

  try {
    fs.symlinkSync(src, dest, 'dir');
    console.log('[kk-design-system] linked skill', name, '→', dest);
  } catch (err) {
    // Windows without symlink privileges: fall back to copy.
    try {
      fs.cpSync(src, dest, { recursive: true });
      console.log('[kk-design-system] copied skill', name, '→', dest);
    } catch (copyErr) {
      console.warn('[kk-design-system] skipped', name, copyErr.message);
    }
  }
}
