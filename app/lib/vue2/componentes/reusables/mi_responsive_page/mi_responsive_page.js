// Definir el componente Vue
Vue.component('mi-responsive-page', {
  props: [],
  template: `
    <div class="mi-responsive-page">
        <div class="mi-responsive-page-container">
            <slot></slot>
        </div>
    </div>`,
  data: function() {
    return {
      
    };
  }
});
