// Definir el componente Vue para el tab
Vue.component('mi-tab', {
  props: ['title'],
  template: `
    <article class="mi-tab" role="tabpanel" v-show="active">
      <slot></slot>
    </article>
  `,
  data: function() {
    return {
      active: false
    };
  },
  mounted() {
    this.$parent.registerTab(this);
  }
});

// Definir el componente Vue para los tabs
Vue.component('mi-tabs', {
  props: {},
  data: function() {
    return {
      activeTabIndex: 0,
      tabs: []
    };
  },
  methods: {
    registerTab(tab) {
      this.tabs.push(tab);
      if (this.tabs.length === 1) {
        tab.active = true;
      }
    },
    activateTab(index) {
      this.tabs.forEach((tab, i) => {
        tab.active = i === index;
      });
    }
  },
  template: `
    <div class="mi-tabs">
      <menu role="tablist">
        <button class="" role="tab" v-for="(tab, index) in tabs" :key="index" @click="activateTab(index)" :aria-selected="tab.active">
          {{ tab.title }}
        </button>
      </menu>
      <slot></slot>
    </div>
  `
});
