# VueErr

> Exposes a Vuex module to handle your Vue error states

## Requirements

- Vue >= 2.0
- Vuex

## Installation

To install this plugin, run:

```bash
npm install vue-err

# or yarn add vue-err
```

Then include it in your Vue project:

```js
import Vue from 'vue'
import VueErr from 'vue-err'

Vue.use(VueErr)
```

Be careful since this plugin is only based on `Vuex` and requires it to work properly.

## Getting started

This plugin injects a `$err` object in your Vue instance.

## License

Project under the MIT license. Heavly inspired by `VueWait` plugin by `Fatih Kadir Akın`.

## Credits

Open-source time proudly sponsored by [Chronotruck](https://www.chronotruck.com).
