return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_olvido/pagina_de_olvido.js",
  "lib/vue2/componentes/no_reusables/pagina_de_olvido", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "pagina-de-olvido",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_olvido/pagina_de_olvido.xml",
    props: {
      root: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
      
    },
    data() {
      return {
        email: ""
      };
    },
    methods: {
      volver() {
        this.$router.history.push("/");
      },
      enviar_correo_de_recuperacion() {
        
      }
    }
  };
});