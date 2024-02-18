// Definir el componente Vue
Vue.component('mi-button', {
  props: {
    border: {
      type: String,
      default: "1px solid blue"
    },
    color: {
      type: String,
      default: "blue"
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
    onClick: {
      type: Function,
      default: function() {}
    }
  },
  template: '<button class="mi-button" :style="{ border, color, backgroundColor }" @click="onClick"><slot /></button>',
});