Sistema_de_modulos.definir("lib/sistema_de_rutas", [], function () {
  return [{
    path: "/base_de_datos/tabla/:tabla/crear/registro",
    component: Vue.options.components["pagina-de-crear-registro-de-base-de-datos"]
  }, {
    path: "/base_de_datos/tabla/:tabla/actualizar/registro/:registro",
    component: Vue.options.components["pagina-de-actualizar-registro-de-base-de-datos"]
  }, {
    path: "/base_de_datos/tabla/:tabla",
    component: Vue.options.components["pagina-de-tabla-de-base-de-datos"]
  }, {
    path: "/base_de_datos",
    component: Vue.options.components["pagina-de-base-de-datos"]
  }, {
    path: "/configuraciones",
    component: Vue.options.components["pagina-de-configuraciones"]
  }, {
    path: "/",
    component: Vue.options.components["pagina-de-bienvenida"]
  }];
});