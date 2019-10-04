# 🌈 Vuex Dispatcher

An easy to use payload builder for your Vuex dispatch actions.

[![Current Release](https://img.shields.io/github/v/release/undervane/vuex-dispatcher.svg?style=flat-square)](https://vuex-dispatcher.now.sh/)
[![License](https://img.shields.io/github/license/undervane/vuex-dispatcher.svg?style=flat-square)](https://github.com/undervane/vuex-dispatcher/blob/master/LICENSE)
[![Dependency status](https://img.shields.io/david/undervane/vuex-dispatcher.svg?style=flat-square)](https://david-dm.org/undervane/vuex-dispatcher)
![Code coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

## Getting Started

This library helps you **maintain a consistent action dispatch payload object** while helping you **speed up the process** at the same time. Throught the following sections we'll **explore all of the capabilities** and give you **guidance** to **make the best** from this library.


> Your project **must be already setup to use Vuex** and it should be already working beforehand, this library **is a wrapper around the dispatch action** to give it some sort **extra capabilities**. To know more about setting up Vuex for your project refer to the **official docs** here: [https://vuex.vuejs.org/guide/](https://vuex.vuejs.org/guide/)

Start integrating the library in your project by installing it

```bash
npm install vuex-dispatcher
# OR: yarn add vuex-dispatcher 
```

Then import it to your `main.js` and install the plugin. Remember to pass the store instance.

```js
// Dispatcher
import Dispatcher from 'vuex-dispatcher'
Vue.use(Dispatcher, store);
```

> If using Nuxt, make sure to create a new file `vuex-dispatcher-plugin.js`, add the two lines above and import the newly created file to your plugins array in `nuxt.config.js`

🌈 **You are ready to go!** Now you can use Vuex Dispatcher from across your app!

Find more information and example usage in the official docs here: https://vuex-dispatcher.now.sh

## Tests

Run tests for this project with command below:

```bash
npm run test:unit
```

Coverage information will be generated, to live preview while you are testing just run command below:

```bash
npm run coverage-server
```