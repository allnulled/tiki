// Definir el componente Vue
Vue.component('mi-breadcrumb2', {
  template: `
<div>
  <mi-view-according-to-screen :screens="['mobile']">
    <div class="mi-breadcrumb text_align_left">
      <slot />
    </div>
    <mi-button class="blanco" :on-click="onClickReturn">{{ $t("Volver") }}</mi-button>
  </mi-view-according-to-screen>
  <mi-view-according-to-screen :screens="['tablet','desktop','television']">
    <mi-layout-horizontal>
      <div class="width_100">
        <div class="mi-breadcrumb text_align_left width_100">
          <slot />
        </div>
      </div>
      <div class="vertical_align_top pad_left_1">
        <mi-button border="none" class="blanco" :on-click="onClickReturn">{{ $t("Volver") }}</mi-button>
      </div>
    </mi-layout-horizontal>
  </mi-view-according-to-screen>
</div>`,
props: {
    onClickReturn: {
      type: Function,
      required: true
    }
  }
});