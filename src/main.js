import $ from './assets/bootstrap/js/jquery.js';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from './store/index.js';
import('./assets/bootstrap/js/bootstrap.js');
import ('./assets/bootstrap/css/bootstrap.css');

Vue.config.productionTip = false;
window.Event = new class {
    constructor() {
        this.vue = new Vue();
    }

    shout(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        this.vue.$on(event, callback)
    }
};


let app=new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
