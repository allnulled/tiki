return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_tabla_de_base_de_datos/pagina_de_tabla_de_base_de_datos.js",
  "lib/vue2/componentes/no_reusables/pagina_de_tabla_de_base_de_datos", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "pagina-de-tabla-de-base-de-datos",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_tabla_de_base_de_datos/pagina_de_tabla_de_base_de_datos.xml",
    props: {
      root: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
      this.cargar_registros();
    },
    data() {
      return {
        registros: false
      };
    },
    methods: {
      async cargar_registros() {
        try {
          // this.registros = [];
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      volver() {
        this.$router.history.push("/base_de_datos");
      }
    }
  };
});