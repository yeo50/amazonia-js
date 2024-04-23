module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 11,
    },
    rules: {
        // Other rules...
        'linebreak-style': ['error', 'windows'],
        'no-nested-ternary': 0,
        // quotes: 0,
        'no-console': 0,
        'import/prefer-default-export': 0,
    },
}
