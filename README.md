# eslint-plugin-vue-unused-autofix

[![NPM version](https://img.shields.io/npm/v/eslint-plugin-vue-unused-autofix.svg?style=flat)](https://npmjs.org/package/eslint-plugin-vue-unused-autofix)
[![NPM downloads](https://img.shields.io/npm/dm/eslint-plugin-vue-unused-autofix.svg?style=flat)](https://npmjs.org/package/eslint-plugin-vue-unused-autofix)
[![License](https://img.shields.io/github/license/KID-joker/eslint-plugin-vue-unused-autofix.svg?style=flat)](https://github.com/KID-joker/eslint-plugin-vue-unused-autofix/blob/main/LICENSE)

> Provide an autofixer for the [`no-unused-components`](https://eslint.vuejs.org/rules/no-unused-components) and [`no-unused-properties`](https://eslint.vuejs.org/rules/no-unused-properties).

## Installation

You'll first need to install [ESLint](http://eslint.org) :

```bash
npm i eslint --save-dev
```

Next, install `eslint-plugin-vue-unused-autofix`:

```bash
npm install eslint-plugin-vue-unused-autofix --save-dev
```

## Usage

Add `vue-unused-autofix` to your `.eslintrc` configuration file:

```jsonc
{
	"extends": ["plugin:vue-unused-autofix/base"]
}
```

## Supported Rules

-   `no-unused-components`
-   `no-unused-properties`

**Note:** The `no-unused-properties` only autofix `props` and `mapState|mapGetters|mapMutations|mapActions`, because `data`, `computed`, and `methods` may be used by other components (e.g. mixins, property access via $refs). If the options has `mixins` or `extends`, it will skip.
