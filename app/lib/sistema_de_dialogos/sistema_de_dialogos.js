Sistema_de_modulos.definir("lib/sistema_de_dialogos", [], function() {
  const sistema_de_dialogos = {
    abrir(id) {
      document.getElementById(id).showModal();
    },
    cerrar(id) {
      document.getElementById(id).close();
    }
  };
  window.Sistema_de_dialogos = sistema_de_dialogos;
  Vue.prototype.$dialogos = sistema_de_dialogos;
  return sistema_de_dialogos;
});