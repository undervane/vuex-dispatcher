import { Dispatcher } from "./dispatcher";
import { Store } from "vuex";
import Vue, { VueConstructor } from "vue";

export default {

  install(Vue: VueConstructor, store: Store<any>) {
    Vue.prototype.$dispatcher = function (action: string) {

      if (!store) {
        throw Error('You need to provide store instance to Vuex Dispatch, eg: Vue.use(Dispatcher, store <-- PASS HERE);');
      }

      return new Dispatcher(action, store);
    }
  }

}

declare module "vue/types/vue" {
  interface Vue {
    $dispatcher: Dispatcher<any>;
  }
}