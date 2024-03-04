// Definir el componente Vue
Vue.component('mi-input-option-selector', {
  props: {
    placeholder: {
      type: String,
      default: function() { return "" }
    },
    initialValue: {
      type: String,
      default: function() {return "";}
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
  <div class="mi-input-option-selector">
    <div class="display_table width_100">
      <div class="display_table_cell width_100">
        <input class="mi-input width_100" type="text" v-model="inputValue" disabled="true" />
      </div>
      <div class="display_table_cell">
        <mi-button class="blanco" :on-click="alternar_opciones">{{ $t(esta_mostrando_opciones ? 'Ocultar' : 'Ver') }}</mi-button>
      </div>
    </div>
    <div class="panel_de_opciones_de_selector" v-if="esta_mostrando_opciones">
      <div class="panel_de_opcion_de_selector" :class="{activo: inputValue === option}" v-for="option, option_index in options" v-bind:key="'opcion-de-selector-' + option_index" v-on:click="() => seleccionar_opcion(option)">
        {{ $t(option) }}
      </div>
    </div>
  </div>
  `,
  data: function() {
    return {
      esta_mostrando_opciones: false,
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
