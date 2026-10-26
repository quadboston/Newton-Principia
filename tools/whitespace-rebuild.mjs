// Applies the whitespace cleanup on top of HEAD as one commit per step,
// then lists those commits in .git-blame-ignore-revs so `git blame` skips
// them.
//
// usage: node tools/whitespace-rebuild.mjs [--trailer "<commit trailer line>"]
//
// Each step runs only its own rules, so its commit holds one kind of change.
// A step whose rules have all been removed from eslint.config.mjs is
// skipped: to drop a kind of change, delete its rules from the config and
// rerun this on a fresh branch from master.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import config from '../eslint.config.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const IGNORE_FILE = '.git-blame-ignore-revs';
const TAB_WIDTH = 4;

const STEPS = [
    {
        subject: 'Whitespace: convert CRLF line endings to LF',
        body: 'Renormalizes files committed with CRLF before .gitattributes set\neol=lf.',
        rules: ['@stylistic/linebreak-style'],
        renormalize: true,
    },
    {
        subject: 'Whitespace: indent with spaces instead of tabs',
        body: 'Leading tabs become spaces at 4-column tab stops, which keeps each line\n'
            + 'where it appeared with a tab width of 4. Tabs inside multi-line strings\n'
            + 'and template literals are left alone.',
        rules: ['whitespace/no-leading-tabs'],
        otherFiles: 'tabs',
    },
    {
        subject: 'Whitespace: remove trailing whitespace, end files with one newline',
        body: 'Covers JS, CSS, HTML, PHP, shell and YAML files. Book text (.txt) is\nleft alone.',
        rules: ['@stylistic/no-trailing-spaces', '@stylistic/eol-last'],
        otherFiles: 'trailing',
    },
    {
        subject: 'Whitespace: at most one blank line in a row; two after header return',
        body: 'A file\'s top-level header ends with a bare `return;` followed by its\n'
            + 'function definitions; exactly two blank lines separate them. Elsewhere\n'
            + 'runs of blank lines collapse to one, and files have no blank lines at\n'
            + 'the start or end.',
        rules: ['whitespace/blank-lines'],
    },
    {
        subject: 'Whitespace: space after keywords, before blocks, after anonymous function',
        body: '`if(x){` becomes `if (x) {` and `function()` becomes `function ()`;\n'
            + 'named functions keep no space before their parameter list.',
        rules: ['@stylistic/keyword-spacing', '@stylistic/space-before-blocks', '@stylistic/space-before-function-paren'],
    },
    {
        subject: 'Whitespace: no spaces inside parentheses or before argument lists',
        body: '`foo( a,b )` becomes `foo(a, b)`, including the file-header\n'
            + '`( function () {` which becomes `(function () {`. A `()` that starts its\n'
            + 'own line, as at the end of DOM-builder chains, stays there.',
        rules: ['@stylistic/space-in-parens', '@stylistic/comma-spacing', 'whitespace/call-spacing'],
    },
    {
        subject: 'Whitespace: put block and value brackets at the end of the previous line',
        body: '`)` / `=>` / `else` followed by `{` on its own line becomes `) {`, and\n'
            + 'an object or array value after `=` or `:` starts on the same line as\n'
            + 'the `=` or `:`. Brackets that start a list item, the file-header `(`,\n'
            + 'bare blocks and the `()` ending DOM-builder chains stay where they are.',
        rules: ['whitespace/bracket-on-previous-line'],
    },
    {
        subject: 'Whitespace: no spaces inside square brackets',
        body: '`rg[ gname ]` becomes `rg[gname]` and `[ 1, 2 ]` becomes `[1, 2]`.',
        rules: ['@stylistic/array-bracket-spacing', '@stylistic/computed-property-spacing'],
    },
    {
        subject: 'Whitespace: no space before object-key colons, one after',
        body: '`key : value` becomes `key: value`. Keys padded to line up their colons\nlose the padding.',
        rules: ['@stylistic/key-spacing'],
    },
    {
        subject: 'Whitespace: spaces around assignment, comparison, logical and ternary operators',
        body: '`x=1` becomes `x = 1`, `a<b` becomes `a < b`, `a||b` becomes `a || b`.\n'
            + 'Arithmetic and bitwise operators keep their existing spacing, so\n'
            + 'formula-style `vx*vx + vy*vy` still shows precedence.',
        rules: ['whitespace/space-non-arithmetic-ops'],
    },
    {
        subject: 'Whitespace: spaces inside braces',
        body: '`{a}` becomes `{ a }` in object literals and destructuring; empty `{}`\nis unchanged.',
        rules: ['@stylistic/object-curly-spacing'],
    },
    {
        subject: 'Whitespace: no blank lines at the start or end of blocks',
        body: 'Removes blank lines just after `{` and just before `}` in block,\nswitch and class bodies.',
        rules: ['@stylistic/padded-blocks'],
    },
    {
        subject: 'Whitespace: switch-colon, template, unary, semicolon and property spacing',
        body: '`case x :` becomes `case x:`, `${ a }` becomes `${a}`, `- x` becomes\n'
            + '`-x`, `a ;` becomes `a;`, and `obj .prop` becomes `obj.prop` within a\nline.',
        rules: [
            '@stylistic/switch-colon-spacing', '@stylistic/template-curly-spacing',
            '@stylistic/space-unary-ops', '@stylistic/semi-spacing',
            '@stylistic/no-whitespace-before-property',
        ],
    },
];

function git(...args) {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
}

function trackedFiles(...patterns) {
    return git('ls-files', '-z', '--', ...patterns).split('\0').filter(Boolean);
}

// Runs ESLint --fix with every configured rule off except `rules`, until
// nothing more changes
async function fixWith(rules, configured) {
    const off = Object.fromEntries([...configured].filter(r => !rules.includes(r)).map(r => [r, 'off']));
    const eslint = new ESLint({ cwd: root, fix: true, overrideConfig: [{ files: ['**/*.js'], rules: off }] });
    for (let pass = 0; pass < 10; pass++) {
        const results = await eslint.lintFiles(['.']);
        if (!results.some(r => r.output !== undefined)) {
            return;
        }
        await ESLint.outputFixes(results);
    }
}

function expandTabs(lead) {
    let col = 0;
    for (const ch of lead) {
        col = ch === '\t' ? (Math.floor(col / TAB_WIDTH) + 1) * TAB_WIDTH : col + 1;
    }
    return ' '.repeat(col);
}

// The same tab and trailing-whitespace cleanup for CSS, HTML, PHP, shell
// and YAML, which ESLint doesn't read
function fixOtherFiles(kind) {
    for (const file of trackedFiles('*.css', '*.html', '*.php', '*.sh', '*.yml')) {
        const full = path.join(root, file);
        const before = fs.readFileSync(full, 'utf8');
        const after = kind === 'tabs'
            ? before.replace(/^[ \t]*\t[ \t]*/gm, expandTabs)
            : before.replace(/[ \t]+$/gm, '').replace(/\n*$/, '\n');
        if (after !== before) {
            fs.writeFileSync(full, after);
        }
    }
}

// Converts CRLF in the index, then rewrites those working files to match
function renormalize() {
    git('add', '--renormalize', '.');
    for (const file of git('diff', '--cached', '--name-only', '-z').split('\0').filter(Boolean)) {
        fs.rmSync(path.join(root, file));
        git('checkout', '--', file);
    }
}

function commit(subject, body, trailer) {
    git('add', '-u');
    if (!git('diff', '--cached', '--name-only')) {
        return null;
    }
    const message = [subject, '', body, '', 'Generated by `npm run whitespace:rebuild`.'];
    if (trailer) {
        message.push('', trailer);
    }
    execFileSync('git', ['commit', '-q', '-F', '-'], { cwd: root, input: message.join('\n') + '\n' });
    return git('rev-parse', 'HEAD').trim();
}

async function main() {
    const trailerIx = process.argv.indexOf('--trailer');
    const trailer = trailerIx === -1 ? null : process.argv[trailerIx + 1];
    if (git('status', '--porcelain', '--untracked-files=no')) {
        throw new Error('Commit or stash your changes first.');
    }
    const configured = new Set(config.flatMap(c => Object.keys(c.rules ?? {})));

    const made = [];
    for (const step of STEPS) {
        const rules = step.rules.filter(r => configured.has(r));
        if (!rules.length) {
            console.log(`skipped (rules not in config): ${step.subject}`);
            continue;
        }
        if (step.renormalize) {
            renormalize();
        }
        await fixWith(rules, configured);
        if (step.otherFiles) {
            fixOtherFiles(step.otherFiles);
        }
        const hash = commit(step.subject, step.body, trailer);
        console.log(`${hash ? hash.slice(0, 8) : 'no change'}  ${step.subject}`);
        if (hash) {
            made.push({ hash, subject: step.subject });
        }
    }
    if (!made.length) {
        return;
    }

    const ignorePath = path.join(root, IGNORE_FILE);
    const header = '# Whitespace-only commits that `git blame` skips.\n'
        + '# GitHub reads this file automatically; locally run once per clone:\n'
        + '#   git config blame.ignoreRevsFile .git-blame-ignore-revs\n';
    const existing = fs.existsSync(ignorePath) ? fs.readFileSync(ignorePath, 'utf8') : header;
    const entries = made.map(m => `\n# ${m.subject}\n${m.hash}\n`).join('');
    fs.writeFileSync(ignorePath, existing + entries);
    git('add', IGNORE_FILE);
    const hash = commit('List the whitespace commits in .git-blame-ignore-revs',
        'Lets `git blame` skip the whitespace-only commits.', trailer);
    console.log(`${hash.slice(0, 8)}  List the whitespace commits in .git-blame-ignore-revs`);
}

await main();
