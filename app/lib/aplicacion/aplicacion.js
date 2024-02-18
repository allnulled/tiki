Sistema_de_modulos.definir("lib/aplicacion", [
  "vue",
  "vue-router",
  "vue-i18n",
  "lib/sistema_de_rutas",
  "lib/traducciones",
  "lib/sistema_de_comunicaciones",
  "lib/sistema_de_gestion_de_errores",
], async function (Vue, VueRouter, VueI18n, sistema_de_rutas, traducciones, sistema_de_comunicaciones, sistema_de_gestion_de_errores) {

  Vue.config.productionTip = false;

  /* INTERNATIONALIZATION */
  const i18n = new VueI18n({
    locale: "es",
    fallbackLocale: "en",
    messages: traducciones
  });

  /* FRAMEWORK */
  window.Vue = Vue;

  /* ROUTER */
  Vue.use(VueRouter);
  const router = new VueRouter({
    routes: sistema_de_rutas
  });

/* GLOBAL INJECTION */
Vue.prototype.$window = window;
Vue.prototype.$vue = Vue;
Vue.prototype.$modulos = Sistema_de_modulos;
Vue.prototype.$ajax = sistema_de_comunicaciones.ajax;
Vue.prototype.$errores = sistema_de_gestion_de_errores;

  /* VUE */
  return new Vue({
    router,
    i18n,
    render: h => h(Vue.options.components.app),
  }).$mount("#app");

});