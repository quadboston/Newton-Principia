// Whitespace-only rules. `npm run whitespace` applies them,
// `npm run whitespace:check` lists what's left.
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import stylistic from '@stylistic/eslint-plugin';
import whitespace from './tools/eslint-whitespace-rules.mjs';

export default [
    includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
        },
        plugins: {
            '@stylistic': stylistic,
            whitespace,
        },
        rules: {
            '@stylistic/linebreak-style': ['error', 'unix'],
            'whitespace/no-leading-tabs': 'error',
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/eol-last': ['error', 'always'],
            'whitespace/blank-lines': 'error',
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/space-before-function-paren': ['error', {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always',
            }],
            '@stylistic/space-in-parens': ['error', 'never'],
            '@stylistic/comma-spacing': 'error',
            'whitespace/call-spacing': 'error',
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/computed-property-spacing': ['error', 'never'],
            '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/padded-blocks': ['error', 'never'],
            '@stylistic/switch-colon-spacing': 'error',
            '@stylistic/template-curly-spacing': ['error', 'never'],
            '@stylistic/space-unary-ops': 'error',
            '@stylistic/semi-spacing': 'error',
            '@stylistic/no-whitespace-before-property': 'error',
            'whitespace/space-non-arithmetic-ops': 'error',
            'whitespace/bracket-on-previous-line': 'error',
        },
    },
];
