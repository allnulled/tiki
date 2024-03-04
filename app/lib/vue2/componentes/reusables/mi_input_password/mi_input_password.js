// Definir el componente Vue
Vue.component('mi-input-password', {
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
  template: `<div>
    <div class="display_table width_100">
      <div class="display_table_cell width_100">
        <input class="mi-input width_100" :type="inputType" :placeholder="placeholder" v-model="inputValue" />
      </div>
      <div class="display_table_cell width_100">
        <mi-button :on-click="alternar_formato">{{ $t("Formatear") }}</mi-button>
      </div>
    </div>
  </div>`,
  data: function() {
    return {
      inputType: "password",
      inputValue: this.initialValue
    };
  },
  watch: {
    inputValue: function(value) {
      this.onChange(value);
    }
  },
  methods: {
    alternar_formato() {
      if(this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    }
  }
});
