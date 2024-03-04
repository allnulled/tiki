return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/pagina_de_actualizar_registro_de_base_de_datos/pagina_de_actualizar_registro_de_base_de_datos.js",
  "lib/vue2/componentes/no_reusables/pagina_de_actualizar_registro_de_base_de_datos", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "pagina-de-actualizar-registro-de-base-de-datos",
    templateUrl: "lib/vue2/componentes/no_reusables/pagina_de_actualizar_registro_de_base_de_datos/pagina_de_actualizar_registro_de_base_de_datos.xml",
    props: {
      root: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
      this.cargar_instancia();
    },
    data() {
      const columnas = this.root.esquema[this.$route.params.tabla].columns;
      return {
        dato: false,
        esta_mostrando_descriptores: columnas.reduce((salida, columna) => {
          return Object.assign(salida, { [columna.name]: false });
        }, {}),
        columnas_de_tabla: columnas,
        esta_cargando_instancia: false
      };
    },
    computed: {},
    methods: {
      volver() {
        return this.$router.history.push("/base_de_datos/tabla/" + this.$route.params.tabla);
      },
      async cargar_instancia() {
        try {
          this.esta_cargando_instancia = true;
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "seleccionar",
            tabla: this.$route.params.tabla,
            donde: [
              ["id","=",this.$route.params.registro]
            ]
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.dato = data[0];
          this.esta_cargando_instancia = false;
        } catch (error) {
          this.esta_cargando_instancia = false;
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      async actualizar_instancia() {
        try {
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "actualizar",
            tabla: this.$route.params.tabla,
            id: this.$route.params.registro,
            valores: JSON.stringify(this.$refs.formulario_de_tabla.obtener_valor(true))
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          await this.cargar_instancia();
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      async eliminar_instancia() {
        try {
          this.esta_eliminando_instancia = true;
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "eliminar",
            tabla: this.$route.params.tabla,
            id: this.$route.params.registro
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.esta_eliminando_instancia = false;
          this.cerrar_dialogo_de_eliminar_instancia();
          this.$router.history.push("/base_de_datos/tabla/" + this.$route.params.tabla);
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      abrir_dialogo_de_eliminar_instancia() {
        try {
          this.$el.querySelector("#dialogo_confirmar_eliminar_registro").showModal();
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      cerrar_dialogo_de_eliminar_instancia() {
        try {
          this.$el.querySelector("#dialogo_confirmar_eliminar_registro").close();
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      alternar_descriptor(columna_id, evento) {
        if(evento) {
          evento.preventDefault();
        }
        this.esta_mostrando_descriptores[columna_id] = !this.esta_mostrando_descriptores[columna_id];
        this.$forceUpdate(true);
      }
    }
  };
});