module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
  },
  rules: {
    // Other rules...
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    "no-console": 0,
  },
};
