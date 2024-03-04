// Definir el componente Vue
Vue.component('mi-button', {
  props: {
    border: {
      type: String,
      default: "1px solid blue"
    },
    onClick: {
      type: Function,
      default: function() {}
    }
  },
  template: '<button class="mi-button" :style="{ border }" @click="onClick"><slot /></button>',
});