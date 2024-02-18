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
      async registrarse() {
        try {
          if(this.email.length === 0) {
            throw new Error("Debes proporcionar un correo electrónico");
          }
          if(this.contrasenya.length < 6) {
            throw new Error("Debes proporcionar una contraseña de al menos 6 caracteres");
          }
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "registrar_usuario",
            email: this.email,
            contrasenya: this.contrasenya
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.$refs.dialogo_de_registro_exitoso.showModal();
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      }
    }
  };
});