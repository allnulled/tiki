return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_inicio/pagina_de_inicio.js",
  "lib/vue2/componentes/no_reusables/pagina_de_inicio", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "pagina-de-inicio",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_inicio/pagina_de_inicio.xml",
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
        email: "admin@admin.org",
        contrasenya: "pordefecto"
      };
    },
    methods: {
      async identificarse() {
        try {
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "iniciar_sesion",
            email: this.email,
            contrasenya: this.contrasenya
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.root.token_de_sesion = data.token_sesion;
          const schema_response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "esquema"
          });
          const schema_data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(schema_response);
          this.root.esquema = schema_data;
          this.root.$forceUpdate(true);
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      async olvido_contrasenya() {
        this.$router.history.push("/olvido_contrasenya");
      },
      registrarse() {
        this.$router.history.push("/registrarse");
      }
    }
  };
});