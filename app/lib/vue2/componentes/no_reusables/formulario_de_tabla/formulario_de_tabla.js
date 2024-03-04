return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/formulario_de_tabla/formulario_de_tabla.js",
  "lib/vue2/componentes/no_reusables/formulario_de_tabla", [
  "lib/sistema_de_gestion_de_errores",
  "lib/utilidades_de_texto"
], async function (sistema_de_gestion_de_errores, utilidades_de_texto) {
  return {
    name: "formulario-de-tabla",
    templateUrl: "lib/vue2/componentes/no_reusables/formulario_de_tabla/formulario_de_tabla.xml",
    props: {
      root: {
        type: Object,
        required: true
      },
      schema: {
        type: Object,
        required: true
      },
      table: {
        type: String,
        required: true
      },
      initialValue: {
        type: Object,
        default: function() { return {} }
      }
    },
    mounted: function () {},
    data() {
      return {
        utilidades_de_texto,
        dato: this.schema[this.table].columns.reduce((salida, columna) => {
          Object.assign(salida, { [columna.name] : this.initialValue[columna.name] ?? "" });
          return salida;
        }, {}),
        esta_mostrando_descriptores: this.schema[this.table].columns.reduce((salida, columna) => {
          return Object.assign(salida, { [columna.name]: false });
        }, {}),
        columnas_de_tabla: this.schema[this.table].columns
      };
    },
    computed: {},
    methods: {
      obtener_valor(todo_stringificado = false) {
        if(!todo_stringificado) {
          return this.dato;
        } else {
          const dato2 = {};
          for(let prop in this.dato) {
            dato2[prop] = this.dato[prop];
            if(Array.isArray(dato2[prop])) {
              dato2[prop] = JSON.stringify(dato2[prop]);
            }
          }
          return dato2;
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