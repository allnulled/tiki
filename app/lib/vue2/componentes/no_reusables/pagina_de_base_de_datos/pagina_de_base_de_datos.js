return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_base_de_datos/pagina_de_base_de_datos.js",
  "lib/vue2/componentes/no_reusables/pagina_de_base_de_datos", [
  "lib/sistema_de_gestion_de_errores",
  "lib/utilidades_de_texto"
], async function (sistema_de_gestion_de_errores, utilidades_de_texto) {
  return {
    name: "pagina-de-base-de-datos",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_base_de_datos/pagina_de_base_de_datos.xml",
    props: {
      root: {
        type: Object,
        required: true
      }
    },
    mounted: async function () {
      try {
        await this.cargar_esquema();
      } catch (error) {
        sistema_de_gestion_de_errores.gestionar_error(error);
      }
    },
    data() {
      return {
        esquema: false,
        utilidades_de_texto: utilidades_de_texto,
        texto_de_filtro: ""
      };
    },
    methods: {
      async cargar_esquema() {
        try {
          const response = await this.$ajax("POST", "http://127.0.0.1/tiki/index.php", {
            operacion: "esquema",
            token: this.root.token_de_sesion
          }, {});
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          console.log(data);
          this.esquema = data;
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      volver() {
        this.$router.history.push("/");
      },
      ir_a_tabla(tabla) {
        this.$router.history.push("/base_de_datos/tabla/" + tabla);
      },
      filtrar_tabla(contador, tabla, tabla_humanizada) {
        if(this.texto_de_filtro === "") {
          return true;
        }
        return `${contador}. ${tabla_humanizada} ${tabla}`.toLowerCase().indexOf(this.texto_de_filtro.toLowerCase()) !== -1;
      }
    }
  };
});