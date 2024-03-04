return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/configurador_de_consulta/configurador_de_consulta.js",
  "lib/vue2/componentes/no_reusables/configurador_de_consulta", [
  "lib/sistema_de_gestion_de_errores"
], async function (sistema_de_gestion_de_errores) {
  return {
    name: "configurador-de-consulta",
    templateUrl: "lib/vue2/componentes/no_reusables/configurador_de_consulta/configurador_de_consulta.xml",
    props: {
      root: {
        type: Object,
        required: true
      },
      schema: {
        type: Object,
        required: true
      },
      parentComponent: {
        type: Object,
        required: true
      }
    },
    mounted: function () {},
    data() {
      return {
        esta_mostrando_panel_de_busqueda: false,
        operaciones_disponibles: "=,!=,<,<=,>,>=,IS NULL,IS NOT NULL,LIKE,NOT LIKE,IN,NOT IN".split(","),
        filtros: [],
        reglas_de_ordenacion: [],
        pagina: 1,
        items_por_pagina: 20,
        busqueda: ""
      };
    },
    computed: {},
    methods: {
      alternar_panel_de_busqueda() {
        this.esta_mostrando_panel_de_busqueda = !this.esta_mostrando_panel_de_busqueda;
      },
      agregar_filtro() {
        this.filtros.push({});
      },
      quitar_filtro(filtro_index) {
        this.filtros.splice(filtro_index, 1);
      },
      agregar_orden() {
        this.reglas_de_ordenacion.push({});
      },
      quitar_orden(orden_index) {
        this.reglas_de_ordenacion.splice(orden_index, 1);
      },
      realizar_busqueda() {
        return this.parentComponent.realizar_busqueda();
      },
      sincronizar_busqueda(v) {
        this.busqueda = v;
        if(this.$refs.busqueda_campo_1) {
          this.$refs.busqueda_campo_1.inputValue = v;
        }
        if(this.$refs.busqueda_campo_2) {
          this.$refs.busqueda_campo_2.inputValue = v;
        }
        if(this.$refs.busqueda_campo_3) {
          this.$refs.busqueda_campo_3.inputValue = v;
        }
      }
    }
  };
});