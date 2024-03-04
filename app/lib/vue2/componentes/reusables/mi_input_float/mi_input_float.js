// Definir el componente Vue
Vue.component('mi-input-float', {
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
  template: '<input class="mi-input" type="text" :placeholder="placeholder" v-model="inputValue">',
  data: function() {
    return {
      inputValue: this.initialValue
    };
  },
  watch: {
    inputValue: function(value) {
      this.onChange(value);
    }
  }
});
