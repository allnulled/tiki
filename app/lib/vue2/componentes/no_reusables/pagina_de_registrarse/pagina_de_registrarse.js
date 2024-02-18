return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_registrarse/pagina_de_registrarse.js",
  "lib/vue2/componentes/no_reusables/pagina_de_registrarse", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "pagina-de-registrarse",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_registrarse/pagina_de_registrarse.xml",
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
        email: "",
        contrasenya: ""
      };
    },
    methods: {
      volver() {
        this.$router.history.push("/");
      },
      registrarse() {
        
      }
    }
  };
});