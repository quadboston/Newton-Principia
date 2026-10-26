// Local ESLint rules for the whitespace conventions @stylistic doesn't cover.

const TAB_WIDTH = 4;

// Width of leading whitespace with tabs expanded to TAB_WIDTH stops
function expandedWidth(lead) {
    let col = 0;
    for (const ch of lead) {
        col = ch === '\t' ? (Math.floor(col / TAB_WIDTH) + 1) * TAB_WIDTH : col + 1;
    }
    return col;
}

function leadingWhitespace(line) {
    return /^[ \t]*/.exec(line)[0];
}

// Strings and template chunks that span lines; whitespace at the start of
// a line inside them is part of the value and must not change.
function multilineLiteralRanges(sourceCode) {
    return sourceCode.ast.tokens
        .filter(t => (t.type === 'Template' || t.type === 'String') && t.loc.start.line !== t.loc.end.line)
        .map(t => t.range);
}

function isInside(offset, ranges) {
    return ranges.some(([start, end]) => offset > start && offset < end);
}

function lineStartIndex(sourceCode, line) {
    return sourceCode.getIndexFromLoc({ line, column: 0 });
}

const noLeadingTabs = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: { tab: 'Indent with spaces, not tabs.' },
    },
    create(context) {
        const sourceCode = context.sourceCode;
        return {
            Program() {
                const literals = multilineLiteralRanges(sourceCode);
                sourceCode.lines.forEach((line, i) => {
                    const lead = leadingWhitespace(line);
                    const start = lineStartIndex(sourceCode, i + 1);
                    if (!lead.includes('\t') || isInside(start, literals)) {
                        return;
                    }
                    context.report({
                        loc: { start: { line: i + 1, column: 0 }, end: { line: i + 1, column: lead.length } },
                        messageId: 'tab',
                        fix: fixer => fixer.replaceTextRange(
                            [start, start + lead.length], ' '.repeat(expandedWidth(lead))),
                    });
                });
            },
        };
    },
};

// The bare `return;` that ends the header block of a file's top-level IIFE,
// when function definitions follow it
function headerReturns(program) {
    const found = [];
    for (const statement of program.body) {
        if (statement.type !== 'ExpressionStatement') {
            continue;
        }
        let call = statement.expression;
        if (call.type === 'UnaryExpression') {
            call = call.argument;
        }
        if (call.type !== 'CallExpression') {
            continue;
        }
        const fn = call.callee;
        if (!/^(FunctionExpression|ArrowFunctionExpression)$/.test(fn.type) || fn.body.type !== 'BlockStatement') {
            continue;
        }
        const body = fn.body.body;
        body.forEach((s, i) => {
            if (s.type === 'ReturnStatement' && !s.argument && i < body.length - 1) {
                found.push(s);
            }
        });
    }
    return found;
}

// Replaces the line breaks between two tokens with `blankLines` blank lines,
// keeping the second token's indentation
function setBlankLines(fixer, text, from, to, blankLines) {
    const gap = text.slice(from, to);
    const linebreak = gap.includes('\r\n') ? '\r\n' : '\n';
    const head = gap.slice(0, gap.indexOf('\n')).replace(/\r$/, '');
    const tail = gap.slice(gap.lastIndexOf('\n') + 1);
    return fixer.replaceTextRange([from, to], head + linebreak.repeat(blankLines + 1) + tail);
}

const blankLines = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: {
            tooMany: 'Use at most one blank line in a row.',
            header: 'Use exactly two blank lines after the header return.',
            start: 'Remove blank lines at the start of the file.',
            end: 'Remove blank lines at the end of the file.',
        },
    },
    create(context) {
        const sourceCode = context.sourceCode;
        return {
            'Program:exit'(program) {
                const text = sourceCode.text;
                const items = sourceCode.tokensAndComments;
                if (!items.length) {
                    return;
                }
                const headerEnds = new Set(
                    headerReturns(program).map(r => sourceCode.getLastToken(r).range[1]));

                const first = items[0];
                if (first.loc.start.line > 1) {
                    context.report({
                        loc: { start: { line: 1, column: 0 }, end: first.loc.start },
                        messageId: 'start',
                        fix: fixer => fixer.removeRange([0, lineStartIndex(sourceCode, first.loc.start.line)]),
                    });
                }

                for (let i = 1; i < items.length; i++) {
                    const a = items[i - 1];
                    const b = items[i];
                    const blank = b.loc.start.line - a.loc.end.line - 1;
                    if (blank < 0) {
                        continue;
                    }
                    const isHeader = headerEnds.has(a.range[1]);
                    const wanted = isHeader ? 2 : Math.min(blank, 1);
                    if (blank === wanted) {
                        continue;
                    }
                    context.report({
                        loc: { start: a.loc.end, end: b.loc.start },
                        messageId: isHeader ? 'header' : 'tooMany',
                        fix: fixer => setBlankLines(fixer, text, a.range[1], b.range[0], wanted),
                    });
                }

                const last = items[items.length - 1];
                const after = text.slice(last.range[1]);
                if ((after.match(/\n/g) || []).length > 1) {
                    context.report({
                        loc: last.loc.end,
                        messageId: 'end',
                        fix: fixer => fixer.replaceTextRange(
                            [last.range[1], text.length], after.includes('\r\n') ? '\r\n' : '\n'),
                    });
                }
            },
        };
    },
};

const BLOCK_OWNERS = new Set([
    'FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression',
    'IfStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement',
    'WhileStatement', 'DoWhileStatement', 'TryStatement', 'CatchClause',
    'WithStatement', 'SwitchCase',
]);
const BLOCK_KEYWORDS = new Set(['else', 'try', 'do', 'finally', 'catch']);

// Moves a `{` or `[` that starts a line up to the end of the previous line,
// for block bodies and for object/array values after `=`, `:` and `=>`.
// When the bracket was indented deeper than the line that owns it, the
// bracketed lines move left by the same amount so the closing bracket ends
// up under the start of that line. The fix applies only when the bracket
// ends its line and the closing bracket starts a line under it; other
// layouts are reported for hand editing.
const bracketOnPreviousLine = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: { join: 'Put "{{bracket}}" at the end of the previous line.' },
    },
    create(context) {
        const sourceCode = context.sourceCode;
        let literals = null;

        function indentOfLine(line) {
            return expandedWidth(leadingWhitespace(sourceCode.lines[line - 1]));
        }

        function fixFor(before, bracket, closing, ownerLine) {
            const next = sourceCode.getTokenAfter(bracket, { includeComments: true });
            const endsLine = next.loc.start.line > bracket.loc.end.line || next.type === 'Line';
            const closingStartsLine = sourceCode.getTokenBefore(closing, { includeComments: true }).loc.end.line
                < closing.loc.start.line;
            const shift = indentOfLine(bracket.loc.start.line) - indentOfLine(ownerLine);
            if (!endsLine || !closingStartsLine || shift < 0
                || indentOfLine(closing.loc.start.line) !== indentOfLine(bracket.loc.start.line)) {
                return null;
            }
            const lineFixes = [];
            for (let line = bracket.loc.start.line + 1; line <= closing.loc.start.line; line++) {
                const text = sourceCode.lines[line - 1];
                const lead = leadingWhitespace(text);
                const start = lineStartIndex(sourceCode, line);
                if (shift === 0 || lead.length === text.length) {
                    continue;
                }
                if (isInside(start, literals) || lead.includes('\t') || lead.length < shift) {
                    return null;
                }
                lineFixes.push([start, start + shift]);
            }
            return fixer => [
                fixer.replaceTextRange([before.range[1], bracket.range[0]], ' '),
                ...lineFixes.map(range => fixer.removeRange(range)),
            ];
        }

        function check(bracket, closing, ownerLine, allowedBefore) {
            const prev = sourceCode.getTokenBefore(bracket, { includeComments: true });
            if (!prev || prev.loc.end.line === bracket.loc.start.line) {
                return;
            }
            const before = sourceCode.getTokenBefore(bracket);
            if (!allowedBefore(before)) {
                return;
            }
            literals ??= multilineLiteralRanges(sourceCode);
            context.report({
                loc: bracket.loc,
                messageId: 'join',
                data: { bracket: bracket.value },
                fix: prev === before ? fixFor(before, bracket, closing, ownerLine) : null,
            });
        }

        function checkBlock(node) {
            const parent = node.parent;
            if (!BLOCK_OWNERS.has(parent.type)) {
                return;
            }
            if (parent.type === 'SwitchCase' && parent.consequent[0] !== node) {
                return;
            }
            const brace = sourceCode.getFirstToken(node);
            const before = sourceCode.getTokenBefore(brace);
            const ownerLine = BLOCK_KEYWORDS.has(before.value) ? before.loc.start.line : parent.loc.start.line;
            check(brace, sourceCode.getLastToken(node), ownerLine,
                t => t.value === ')' || t.value === '=>' || t.value === ':' || BLOCK_KEYWORDS.has(t.value));
        }

        function isValueOf(node) {
            const p = node.parent;
            switch (p.type) {
            case 'VariableDeclarator': return p.init === node;
            case 'AssignmentExpression':
            case 'AssignmentPattern': return p.right === node;
            case 'PropertyDefinition': return p.value === node;
            case 'Property': return p.value === node && !p.shorthand && !p.method && p.parent.type === 'ObjectExpression';
            case 'ArrowFunctionExpression': return p.body === node;
            default: return false;
            }
        }

        function checkValue(node) {
            if (!isValueOf(node)) {
                return;
            }
            check(sourceCode.getFirstToken(node), sourceCode.getLastToken(node), node.parent.loc.start.line,
                t => t.value === ':' || t.value === '=>' || (t.type === 'Punctuator' && /^[^=!<>]*=$/.test(t.value)));
        }

        return {
            BlockStatement: checkBlock,
            ObjectExpression: checkValue,
            ArrayExpression: checkValue,
            SwitchStatement(node) {
                const brace = sourceCode.getTokenAfter(node.discriminant, t => t.value === '{');
                check(brace, sourceCode.getLastToken(node), node.loc.start.line, t => t.value === ')');
            },
            ClassBody(node) {
                check(sourceCode.getFirstToken(node), sourceCode.getLastToken(node), node.parent.loc.start.line, () => true);
            },
        };
    },
};

// `foo (x)` becomes `foo(x)`. A call whose `(` starts a new line, like the
// `()` that ends a DOM-builder chain, stays as it is.
const callSpacing = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: { space: 'Remove the space before the argument list.' },
    },
    create(context) {
        const sourceCode = context.sourceCode;

        function check(node) {
            const open = sourceCode.getTokenAfter(node.callee, t => t.value === '(' || t.value === '?.');
            if (!open || open.value !== '(' || open.range[0] >= node.range[1]) {
                return;
            }
            const left = sourceCode.getTokenBefore(open, { includeComments: true });
            if (left.range[1] === open.range[0] || left.loc.end.line !== open.loc.start.line || left.type === 'Block') {
                return;
            }
            context.report({
                loc: { start: left.loc.end, end: open.loc.start },
                messageId: 'space',
                fix: fixer => fixer.removeRange([left.range[1], open.range[0]]),
            });
        }

        return {
            CallExpression: check,
            NewExpression: check,
        };
    },
};

// Spaces around assignment, comparison, logical and ternary operators.
// Arithmetic and bitwise operators keep their spacing, so formula-style
// `vx*vx + vy*vy` can show precedence.
const SPACED_BINARY = new Set(['==', '===', '!=', '!==', '<', '<=', '>', '>=']);

const spaceNonArithmeticOps = {
    meta: {
        type: 'layout',
        fixable: 'whitespace',
        schema: [],
        messages: { space: 'Put spaces around "{{op}}".' },
    },
    create(context) {
        const sourceCode = context.sourceCode;

        function check(left, right, op) {
            const token = sourceCode.getFirstTokenBetween(left, right, t => t.value === op && t.type === 'Punctuator');
            if (!token) {
                return;
            }
            const prev = sourceCode.getTokenBefore(token, { includeComments: true });
            const next = sourceCode.getTokenAfter(token, { includeComments: true });
            const tightBefore = prev.range[1] === token.range[0];
            const tightAfter = token.range[1] === next.range[0];
            if (!tightBefore && !tightAfter) {
                return;
            }
            context.report({
                loc: token.loc,
                messageId: 'space',
                data: { op },
                fix: fixer => [
                    ...(tightBefore ? [fixer.insertTextBefore(token, ' ')] : []),
                    ...(tightAfter ? [fixer.insertTextAfter(token, ' ')] : []),
                ],
            });
        }

        return {
            BinaryExpression(node) {
                if (SPACED_BINARY.has(node.operator)) {
                    check(node.left, node.right, node.operator);
                }
            },
            LogicalExpression: node => check(node.left, node.right, node.operator),
            AssignmentExpression: node => check(node.left, node.right, node.operator),
            AssignmentPattern: node => check(node.left, node.right, '='),
            VariableDeclarator(node) {
                if (node.init) {
                    check(node.id, node.init, '=');
                }
            },
            PropertyDefinition(node) {
                if (node.value) {
                    check(node.key, node.value, '=');
                }
            },
            ConditionalExpression(node) {
                check(node.test, node.consequent, '?');
                check(node.consequent, node.alternate, ':');
            },
        };
    },
};

export default {
    meta: { name: 'whitespace' },
    rules: {
        'no-leading-tabs': noLeadingTabs,
        'blank-lines': blankLines,
        'call-spacing': callSpacing,
        'bracket-on-previous-line': bracketOnPreviousLine,
        'space-non-arithmetic-ops': spaceNonArithmeticOps,
    },
};
