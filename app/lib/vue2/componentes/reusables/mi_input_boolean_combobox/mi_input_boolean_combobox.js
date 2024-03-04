// Definir el componente Vue
Vue.component('mi-input-boolean-combobox', {
  props: {
    placeholder: {
      type: String,
      default: function() { return "" }
    },
    initialValue: {
      type: Boolean,
      default: function() {return true;}
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
      default: function() { return ["Sí", "No"] }
    },
    customId: {
      type: String,
      default: function() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        return [1,2,3,4,5,6,7,8,9,10].map(function() {
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("");
      }
    }
  },
  template: `
  <div class="mi-input-boolean-combobox">
    <div class="display_none">
      <input class="mi-input width_100" type="text" :placeholder="placeholder" v-model="inputValue">
    </div>
    <div class="field-row" v-on:click="() => inputValue = true">
      <input type="radio" :checked="inputValue" />
      <label>{{ $t(options[0]) }}</label>
    </div>
    <div class="field-row" v-on:click="() => inputValue = false">
      <input type="radio" :checked="!inputValue" />
      <label>{{ $t(options[1]) }}</label>
    </div>
  </div>
  `,
  data: function() {
    return {
      inputValue: this.initialValue
    };
  },
  watch: {
    inputValue: function(value) {
      this.onChange(value);
    }
  },
  methods: {
    seleccionar_opcion(option_index) {
      this.inputValue = option_index === 0 ? true : false;
    }
  }
});
