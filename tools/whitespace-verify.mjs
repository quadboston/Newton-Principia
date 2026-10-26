// Confirms that every JS file at HEAD parses to the same syntax tree, with
// the same comment text apart from whitespace, as at a base ref, so the
// code behaves exactly as before. Other changed files are listed for
// checking with `git diff -w`.
//
// usage: node tools/whitespace-verify.mjs [base-ref]   (default: master)
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as espree from 'espree';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = process.argv[2] ?? 'master';

function git(...args) {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
}

function jsFiles(ref) {
    return git('ls-tree', '-r', '-z', '--name-only', ref).split('\0').filter(f => f.endsWith('.js'));
}

// Location and raw-text fields carry layout only; dropping them leaves
// what the code means.
function strip(key, value) {
    return ['start', 'end', 'loc', 'range', 'raw'].includes(key) ? undefined : value;
}

function meaning(text) {
    const ast = espree.parse(text, { ecmaVersion: 'latest', sourceType: 'script', comment: true });
    const comments = ast.comments.map(c => c.value.replace(/\s+/g, ' ').trim());
    delete ast.comments;
    return { code: JSON.stringify(ast, strip), comments: JSON.stringify(comments) };
}

const baseFiles = new Set(jsFiles(base));
const headFiles = jsFiles('HEAD');
let same = 0;
const problems = [];
for (const file of headFiles) {
    if (!baseFiles.has(file)) {
        problems.push(`${file}: not in ${base}`);
        continue;
    }
    const before = meaning(git('show', `${base}:${file}`));
    const after = meaning(git('show', `HEAD:${file}`));
    if (before.code !== after.code) {
        problems.push(`${file}: code differs`);
    } else if (before.comments !== after.comments) {
        problems.push(`${file}: comment text differs`);
    } else {
        same++;
    }
}
for (const file of baseFiles) {
    if (!headFiles.includes(file)) {
        problems.push(`${file}: missing at HEAD`);
    }
}

console.log(`JS files with identical code and comments: ${same} of ${headFiles.length}`);
problems.forEach(p => console.log(`  ${p}`));

const otherChanged = git('diff', '--name-only', base, 'HEAD', '--', '.', ':!*.js').split('\n').filter(Boolean);
if (otherChanged.length) {
    console.log(`\nOther files changed since ${base} (check with git diff -w ${base} HEAD -- <file>):`);
    otherChanged.forEach(f => console.log(`  ${f}`));
}
process.exitCode = problems.length ? 1 : 0;
