module.exports = {
  plugins: ['prettier', 'import'],
  extends: ['airbnb-typescript/base', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [
      "error",
      { "ignoreTypeValueShadow": true }
    ],
    "@typescript-eslint/naming-convention": "off",
    "default-param-last": "off",
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "off",
    "func-names": "off",
    "no-plusplus": "off",
    "no-process-exit": "off",
    "class-methods-use-this": "off",
    "import/extensions": [
    "error",
    "ignorePackages",
    {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
    }
    ],
    "import/prefer-default-export": "off",
    "no-explicit-any": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "max-classes-per-file": "off",
    "no-underscore-dangle": "off",
    "lines-between-class-members": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": "off"
  }
}
