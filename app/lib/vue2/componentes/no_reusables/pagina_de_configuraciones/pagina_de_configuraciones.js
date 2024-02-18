return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_configuraciones/pagina_de_configuraciones.js",
  "lib/vue2/componentes/no_reusables/pagina_de_configuraciones", [
  "lib/sistema_de_gestion_de_errores",
  "lib/utilidades_de_array"
], async function (sistema_de_gestion_de_errores, utilidades_de_array) {
  return {
    name: "pagina-de-configuraciones",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_configuraciones/pagina_de_configuraciones.xml",
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
        seccion_seleccionada: "Idioma",
        idiomas_disponibles: ["en", "es", "ca", "fr", "it", "de"]
      };
    },
    methods: {
      volver() {
        this.$router.history.push("/");
      },
      seleccionar_seccion(seccion) {
        this.seccion_seleccionada = seccion;
        this.$forceUpdate(true);
      },
      expandir_iso_idioma(iso) {
        switch (iso) {
          case "en":
            return "Inglés";
          case "es":
            return "Español";
          case "ca":
            return "Catalán";
          case "fr":
            return "Francés";
          case "it":
            return "Italiano";
          case "de":
            return "Alemán";
          default:
            return "";
        }
      },
      cambiar_idioma(iso) {
        this.root.$i18n.locale = iso;
      }
    }
  };
});