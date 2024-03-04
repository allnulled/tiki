return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_crear_registro_de_base_de_datos/pagina_de_crear_registro_de_base_de_datos.js",
  "lib/vue2/componentes/no_reusables/pagina_de_crear_registro_de_base_de_datos", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "pagina-de-crear-registro-de-base-de-datos",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_crear_registro_de_base_de_datos/pagina_de_crear_registro_de_base_de_datos.xml",
    props: {
      root: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
      
    },
    data() {
      const columnas = this.root.esquema[this.$route.params.tabla].columns;
      return {
        dato: columnas.reduce(function(salida, columna) {
          Object.assign(salida, { [columna.name] : "" });
          return salida;
        }, {}),
        esta_mostrando_descriptores: columnas.reduce((salida, columna) => {
          return Object.assign(salida, { [columna.name]: false });
        }, {}),
        columnas_de_tabla: columnas,
      };
    },
    computed: {},
    methods: {
      volver() {
        return this.$router.history.push("/base_de_datos/tabla/" + this.$route.params.tabla);
      },
      async crear_instancia() {
        try {
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "insertar",
            tabla: this.$route.params.tabla,
            valores: JSON.stringify(this.$refs.formulario_de_tabla.obtener_valor(true))
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.$router.history.push("/base_de_datos/tabla/" + this.$route.params.tabla + "/actualizar/registro/" + data.nuevo_id);
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      }
    }
  };
});