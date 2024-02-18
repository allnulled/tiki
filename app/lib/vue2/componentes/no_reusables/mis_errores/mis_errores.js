return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/mis_errores/mis_errores.js",
  "lib/vue2/componentes/no_reusables/mis_errores", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "mis-errores",
    templateUrl: "lib/vue2/componentes/no_reusables/mis_errores/mis_errores.xml",
    mounted: function () {
      sistema_de_gestion_de_errores.establecer_puerto(this);
    },
    methods: {
      gestionar_error(error) {
        this.$el.querySelector("#mensaje_de_error_unico").textContent = error.name + ": " + error.message;
        this.$el.querySelector("#error_unico").showModal();
      },
      cerrar_error() {
        this.$el.querySelector("#error_unico").close();
      }
    }
  };
});