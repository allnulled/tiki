return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/mi_input_reference/mi_input_reference.js",
  "lib/vue2/componentes/no_reusables/mi_input_reference", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "mi-input-reference",
    templateUrl: "lib/vue2/componentes/no_reusables/mi_input_reference/mi_input_reference.xml",
    props: {
      table: {
        type: String,
        required: true
      },
      root: {
        type: Object,
        required: true
      },
      schema: {
        type: Object,
        required: true
      },
      initialValue: {
        type: [String,Number],
        default: function() { return 0 }
      },
      onChange: {
        type: Function,
        default: function() {}
      }
    },
    mounted: function () {},
    data() {
      return {
        esta_mostrando_selector: false,
        inputValue: this.initialValue,
        inputReference: undefined,
      };
    },
    computed: {},
    watch: {
      inputValue(value) {
        this.inputReference = value;
      }
    },
    methods: {
      alternar_selector() {
        this.esta_mostrando_selector = !this.esta_mostrando_selector;
      },
      async realizar_busqueda() {
        try {
          
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      sincronizar_valor() {
        this.inputReference = this.$refs.explorador_de_tabla.inputReference;
      }
    },
    async mounted() {
      try {
        this.inputValue = this.initialValue;
      } catch (error) {
        sistema_de_gestion_de_errores.gestionar_error(error);
      }
    }
  };
});