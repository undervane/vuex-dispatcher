import { Dispatch } from "./types";

export default {

  install(Vue) {
    Vue.prototype.$dispatcher = function (action) {
      return new Dispatch(action, this.$store);
    }
  }

}