// Definir el componente Vue
Vue.component('mi-input-option-combobox', {
  props: {
    placeholder: {
      type: String,
      default: function() { return "" }
    },
    initialValue: {
      type: String,
      default: function() {return "";}
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
  <div class="mi-input-option-combobox">
    <div class="display_table width_100">
      <div class="display_table_cell width_100">
        <input class="mi-input width_100" type="text" v-model="inputValue" disabled="true" />
      </div>
      <div class="display_table_cell">
        <mi-button class="blanco" :on-click="alternar_opciones">{{ $t(esta_mostrando_opciones ? 'Ocultar' : 'Opciones') }}</mi-button>
      </div>
    </div>
    <div class="panel_de_opciones_de_combobox" v-if="esta_mostrando_opciones">
      <div class="field-row" v-on:click="() => seleccionar_opcion(option)" v-for="option, option_index in options" v-bind:key="'option-' + option_index">
        <input type="radio" :checked="inputValue === option" />
        <label>{{ $t(option) }}</label>
      </div>
    </div>
  </div>
  `,
  data: function() {
    return {
      esta_mostrando_opciones: this.initialShowing,
      inputValue: this.initialValue
    };
  },
  methods: {
    seleccionar_opcion(option) {
      this.inputValue = option;
    },
    alternar_opciones() {
      this.esta_mostrando_opciones = !this.esta_mostrando_opciones;
    }
  },
  watch: {
    inputValue: function(value) {
      this.onChange(value);
    }
  }
});
