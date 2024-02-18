return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_bienvenida/pagina_de_bienvenida.js",
  "lib/vue2/componentes/no_reusables/pagina_de_bienvenida", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "pagina-de-bienvenida",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_bienvenida/pagina_de_bienvenida.xml",
    props: {
      root: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
      
    },
    data() {
      return {};
    },
    methods: {
      ir_a_base_de_datos() {
        this.$router.history.push("/base_de_datos");
      },
      ir_a_configuraciones() {
        this.$router.history.push("/configuraciones");
      },
      async salir_de_aplicacion() {
        try {
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "cerrar_sesion",
            token: this.root.token_de_sesion
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.root.token_de_sesion = false;
          this.root.$forceUpdate(true);
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      }
    }
  };
});