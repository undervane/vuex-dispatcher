# Getting Started

This library helps you **maintain a consistent action dispatch payload object** while helping you **speed up the process** at the same time. Throught the following sections we'll **explore all of the capabilities** and give you **guidance** to **make the best** from this library.

::: warning 
Your project **must be already setup to use Vuex** and it should be already working beforehand, this library **is a wrapper around the dispatch action** to give it some sort **extra capabilities**. To know more about setting up Vuex for your project refer to the **official docs** here: [https://vuex.vuejs.org/guide/](https://vuex.vuejs.org/guide/)
:::

Start integrating the library in your project by installing it

```bash
npm install vuex-dispatcher
# OR: yarn add vuex-dispatcher 
```

Then import it to your `main.js` and install the plugin

```js
// Dispatcher
import Dispatcher from 'vuex-dispatcher'
Vue.use(Dispatcher);
```

::: tip
If using Nuxt, make sure to create a new file `vuex-dispatcher-plugin.js`, add the two lines above and import the newly created file to your plugins array in `nuxt.config.js`
:::

🌈 **You are ready to go!** Now you can use Vuex Dispatcher from across your app!

Next up we'll explain a sample use case making use of the library features.