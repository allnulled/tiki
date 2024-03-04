// Definir el componente Vue
Vue.component('mi-input-hour', {
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
    }
  },
  template: `<div class="mi-input-hour">
    <div class="display_table width_100">
      <div class="display_table_cell width_100">
        <input type="text" class="mi-input width_100" v-model="inputRepresentation" disabled="true" />
      </div>
      <div class="display_table_cell">
        <mi-button class="blanco" :on-click="alternar_selector">{{ $t("Seleccionar hora") }}</mi-button>
      </div>
    </div>
    <div v-show="esta_mostrando_selector" class="pad_1">
      <vuejs-calendario mode="time" :on-change="v => inputValue = v" :initial-value="inputValue" />
    </div>
  </div>`,
  data: function() {
    return {
      esta_mostrando_selector: false,
      inputValue: this.initialValue,
      inputRepresentation: this.initialValue
    };
  },
  watch: {
    inputValue: function(value) {
      this.inputRepresentation = value;
      this.onChange(value);
    }
  },
  methods: {
    alternar_selector() {
      this.esta_mostrando_selector = !this.esta_mostrando_selector;
    }
  }
});
