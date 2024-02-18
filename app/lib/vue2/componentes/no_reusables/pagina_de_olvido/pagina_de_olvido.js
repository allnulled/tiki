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
      async enviar_correo_de_recuperacion() {
        try {
          if(this.email.length === 0) {
            throw new Error("Debes proporcionar un correo electrónico");
          }
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "olvido_credenciales",
            email: this.email,
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.$refs.dialogo_de_recuperacion_de_cuenta_exitoso.showModal();
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      }
    }
  };
});