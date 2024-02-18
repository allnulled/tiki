Sistema_de_modulos.definir("lib/sistema_de_rutas", [], function () {
  return [{
    path: "/",
    component: Vue.options.components["pagina-de-bienvenida"]
  }, {
    path: "/base_de_datos/tabla/:tabla",
    component: Vue.options.components["pagina-de-tabla-de-base-de-datos"]
  }, {
    path: "/base_de_datos",
    component: Vue.options.components["pagina-de-base-de-datos"]
  }, {
    path: "/configuraciones",
    component: Vue.options.components["pagina-de-configuraciones"]
  }];
});