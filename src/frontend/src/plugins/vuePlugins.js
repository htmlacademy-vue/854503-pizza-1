import Vue from "vue";
import store from "@/store";
import Notifier from "@/plugins/notifier";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $notifier: () => new Notifier(store),
      },
    });
  },
};

Vue.use(plugins);
