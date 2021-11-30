module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'import', 'prettier'],
    rules: {
        'consistent-return': 'off',
        camelcase: 'off',
        indent: 'off',
        'no-use-before-define': 'off',
        'import/extensions': 'off',
        'react/prop-types': 'off',
        'react/jsx-indent': 'off',
        'import/no-cycle': 'off',
        'react/no-array-index-key': 'off',
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'import/prefer-default-export': 'off',
        'comma-dangle': 'off',
        'no-undef': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'react/jsx-indent-props': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/button-has-type': 'off',
        'operator-linebreak': 'off',
        'linebreak-style': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-debugger': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/display-name': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};