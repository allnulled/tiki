// Definir el componente Vue
Vue.component('mi-view-according-to-screen', {
  props: {
    screens: {
      type: Array,
      required: true
    }
  },
  template: `<div class="mi-view-according-to-screen" :class="screens.map(s => 'screen-' + s).join(' ')"><slot></slot></div>`,
  data: function() {
    return {
      
    };
  }
});
