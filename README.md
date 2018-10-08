# Autogit Plugin - Github Sync Keywords

A plugin for synching the keywords with GitHub.

## Install

```sh
npm install --save autogit-plugin-github-sync-keywords
```

## Usage

#### Options

This plugin uses the following options object:

```js
{
  token: ''
}
```

#### Configuration

Add this plugin to a command:

```js
const syncKeywords = require ( 'autogit-plugin-github-sync-keywords' );

module.exports = {
  commands: {
    'my-command': [
      syncKeywords ({ token: 'MY_GITHUB_TOKEN' })
    ]
  }
}
```

## License

MIT © Fabio Spampinato
