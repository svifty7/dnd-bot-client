module.exports = {
    plugins: 'stylelint-order',
    ignoreFiles: ['/**/*.vue'],
    rules: {
        'max-line-length': 255,
        'function-url-quotes': 'always',
        'function-name-case': null,
        'at-rule-no-unknown': null,
        'string-quotes': null,
        'no-descending-specificity': null,
        'declaration-block-no-duplicate-properties': [
            true,
            {
                ignore: ['consecutive-duplicates-with-different-values']
            }
        ],
        'order/order': [
            'at-variables',
            'dollar-variables',
            'custom-properties',
            'declarations'
        ]
    }
};
