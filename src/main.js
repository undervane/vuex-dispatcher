import { Dispatch } from "./types";

export default {

  install(Vue, store) {
    Vue.prototype.$dispatcher = function (action) {

      if (!store) {
        throw Error('You need to provide store instance to Vuex Dispatch, eg: Vue.use(Dispatcher, store <-- PASS HERE);');
      }

      return new Dispatch(action, store);
    }
  }

}