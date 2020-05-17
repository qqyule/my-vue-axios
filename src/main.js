import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./utils/api"
import "../node_modules/element-ui/lib/theme-chalk/message.css"
import "../node_modules/element-ui/lib/theme-chalk/loading.css"

Vue.prototype.$api = api
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
