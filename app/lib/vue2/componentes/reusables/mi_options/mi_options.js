// Definir el componente Vue para el option
Vue.component('mi-option', {
  props: ['value'],
  template: `
    <option v-bind:value="value"><slot></slot></option>
  `
});

// Definir el componente Vue para los options
Vue.component('mi-options', {
  props: {
    initialValue: {
      type: String,
      default: function() {return ""}
    },
    onChange: {
      type: Function,
      default: function() {}
    }
  },
  data: function() {
    return {
      selectedOption: this.initialValue
    };
  },
  methods: {
    handleSelect(event) {
      this.selectedOption = event.target.value;
      this.onChange(event.target.value, this, event);
    }
  },
  template: `
    <select v-model="selectedOption" @change="handleSelect">
      <slot></slot>
    </select>
  `
});
