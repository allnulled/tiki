// Definir el componente Vue
Vue.component('mi-input-options-checkbox', {
  props: {
    placeholder: {
      type: String,
      default: function() { return "" }
    },
    initialValue: {
      type: [Array, String],
      default: function() {return [];}
    },
    initialShowing: {
      type: Boolean,
      default: function() { return true; }
    },
    onChange: {
      type: Function,
      default: function() {}
    },
    onFocus: {
      type: Function,
      default: function() {}
    },
    onBlur: {
      type: Function,
      default: function() {}
    },
    options: {
      type: Array,
      default: function() { return ["No sabe, no contesta", "Sí", "No"] }
    }
  },
  template: `
  <div class="mi-input-options-checkbox">
    <div class="display_table width_100">
      <div class="display_table_cell width_100 vertical_align_top">
        <textarea class="mi-input-long-text width_100" v-model="inputRepresentation" disabled="true"></textarea>
      </div>
      <div class="display_table_cell vertical_align_top">
        <mi-button class="blanco" :on-click="alternar_opciones">{{ $t(esta_mostrando_opciones ? 'Ocultar' : 'Opciones') }}</mi-button>
      </div>
    </div>
    <div class="panel_de_opciones_de_combobox" v-if="esta_mostrando_opciones">
      <div class="field-row" v-on:click="() => seleccionar_opcion(option)" v-for="option, option_index in options" v-bind:key="'option-' + option_index">
        <input type="checkbox" :checked="inputValue.indexOf(option) !== -1" />
        <label>{{ $t(option) }}</label>
      </div>
    </div>
  </div>
  `,
  data: function() {
    let initial = [];
    try {
      initial = typeof this.initialValue === "string" ? JSON.parse(this.initialValue) : this.initialValue;
    } catch (error) {
      initial = [];
    }
    return {
      esta_mostrando_opciones: this.initialShowing,
      inputValue: initial,
      inputRepresentation: this.formatear_opciones_para_representar(initial)
    };
  },
  methods: {
    formatear_opciones_para_representar(opciones) {
      let representacion = "";
      representacion += "";
      return opciones.join("\n");
    },
    seleccionar_opcion(option) {
      const posicion = this.inputValue.indexOf(option);
      if(posicion === -1) {
        this.inputValue.push(option);
      } else {
        this.inputValue.splice(posicion, 1);
      }
    },
    alternar_opciones() {
      this.esta_mostrando_opciones = !this.esta_mostrando_opciones;
    }
  },
  watch: {
    inputValue: function(value) {
      this.inputRepresentation = this.formatear_opciones_para_representar(value);
      this.onChange(value);
    }
  }
});
