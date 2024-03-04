// Definir el componente Vue
Vue.component('mi-input-long-text', {
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
  template: '<textarea class="mi-input mi-input-long-text" :placeholder="placeholder" v-model="inputValue"></textarea>',
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
