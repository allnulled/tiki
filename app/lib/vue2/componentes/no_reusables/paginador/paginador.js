return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/paginador/paginador.js",
  "lib/vue2/componentes/no_reusables/paginador", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "paginador",
    templateUrl: "lib/vue2/componentes/no_reusables/paginador/paginador.xml",
    props: {
      parentElement: {
        type: Object,
        required: true
      }
    },
    mounted: function () {},
    data() {
      return {
        pagina_actual: 1
      };
    },
    computed: {},
    methods: {
      ir_a_pagina_primera() {
        return this.parentElement.ir_a_pagina_primera();
      },
      ir_a_pagina_anterior() {
        return this.parentElement.ir_a_pagina_anterior();
      },
      ir_a_pagina_siguiente() {
        return this.parentElement.ir_a_pagina_siguiente();
      },
      ir_a_pagina_ultima() {
        return this.parentElement.ir_a_pagina_ultima();
      }
    }
  };
});