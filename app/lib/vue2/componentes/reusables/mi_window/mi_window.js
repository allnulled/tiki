// Definir el componente Vue
Vue.component('mi-window', {
  props: {
    title: {
      type: String,
      default: function() { return "" }
    },
    footer: {
      type: [String, Boolean],
      default: function() { return false }
    }
  },
  template: `
    <div class="mi-window window">
      <div class="title-bar">
        <div class="title-bar-text">
          {{ title }}
        </div>
      </div>
      <div class="window-body">
        <slot></slot>
      </div>
      <div class="status-bar" v-if="footer">
        <div class="status-bar-field">
          {{ footer }}
        </div>
      </div>
    </div>`,
  data: function() {
    return {
      
    };
  }
});
