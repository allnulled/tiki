return await Sistema_de_modulos.definir_componente_vue2(
  "lib/vue2/componentes/no_reusables/explorador_de_tabla/explorador_de_tabla.js",
  "lib/vue2/componentes/no_reusables/explorador_de_tabla", [
  "lib/sistema_de_gestion_de_errores",
  "lib/utilidades_de_texto"
], async function (sistema_de_gestion_de_errores, utilidades_de_texto) {
  return {
    name: "explorador-de-tabla",
    templateUrl: "lib/vue2/componentes/no_reusables/explorador_de_tabla/explorador_de_tabla.xml",
    props: {
      table: {
        type: String,
        required: true
      },
      root: {
        type: Object,
        required: true
      },
      mode: {
        type: String,
        default: function() { return "solo-ver"; } // también: seleccionar-uno y seleccionar-muchos
      },
      initialValue: {
        type: [String, Array, undefined],
        default: function() { return undefined; }
      },
      onChange: {
        type: Function,
        default: function() {}
      }
    },
    data() {
      return {
        esta_cargando_registros: false,
        esta_explorando_registros: [],
        registros: false,
        inputValue: undefined,
        inputReference: undefined,
        registro_seleccionado: undefined,
        utilidades_de_texto
      };
    },
    async mounted() {
      try {
        await this.realizar_busqueda();
        await this.cargar_seleccionado();
      } catch (error) {
        sistema_de_gestion_de_errores.gestionar_error(error);
      }
    },
    computed: {
      propiedades_de_registro() {
        return this.registros && this.registros.length ? Object.keys(this.registros[0]) : [];
      }
    },
    watch: {
      inputValue(value) {
        let reference_value = value;
        const all_columns = this.root.esquema[this.table].columns;
        console.log(all_columns);
        for(let index_column=0; index_column<all_columns.length; index_column++) {
          const columna = all_columns[index_column];
          console.log(columna);
          if(columna.is_identity === true) {
            console.log("IDENTIDAD!");
            console.log(columna.name);
            console.log(this.registro_seleccionado);
            reference_value = this.registro_seleccionado[columna.name];
          }
        }
        this.inputReference = reference_value;
        this.onChange(value, this);
        this.$forceUpdate(true);
      }
    },
    methods: {
      volver() {
        this.$router.history.push("/base_de_datos");
      },
      async cargar_seleccionado() {
        try {
          if(typeof this.inputValue === "undefined") {
            this.inputValue = this.initialValue ?? this.mode === "seleccionar-muchos" ? [] : undefined
          }
          if(this.mode === "seleccionar-uno") {
            if(typeof this.inputValue === "undefined") {
              return;
            }
            const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
              operacion: "seleccionar",
              tabla: this.table,
              donde: [["id","=", this.inputValue]],
              orden: this.obtener_ordenacion_usable(),
              pagina: this.obtener_pagina_usable(),
              items: this.obtener_items_por_pagina_usables(),
              busqueda: this.obtener_busqueda_usable(),
              token: this.root.token_de_sesion,
              identificador_de_ajax: "seleccionar-uno"
            });
            const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
            this.registro_seleccionado = data[0];
          } else if(this.mode === "seleccionar-muchos") {
            if(typeof this.inputValue === "undefined") {
              return;
            } else if(!Array.isArray(this.inputValue)) {
              throw new Error("El parametro inputValue no puede valer otra cosa que sea un array o undefined");
            }
            const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
              operacion: "seleccionar",
              tabla: this.table,
              donde: [["id","IN", this.inputValue]],
              orden: this.obtener_ordenacion_usable(),
              pagina: this.obtener_pagina_usable(),
              items: this.obtener_items_por_pagina_usables(),
              busqueda: this.obtener_busqueda_usable(),
              token: this.root.token_de_sesion,
              identificador_de_ajax: "seleccionar-muchos"
            });
            const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
            this.registro_seleccionado = data;
          }
        } catch (error) {
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      async realizar_busqueda() {
        try {
          this.esta_cargando_registros = true;
          console.log("Tabla:", this.table);
          const response = await this.$ajax("POST", "http://127.0.0.1:80/tiki/index.php", {
            operacion: "seleccionar",
            tabla: this.table,
            donde: this.obtener_filtros_usables(),
            orden: this.obtener_ordenacion_usable(),
            pagina: this.obtener_pagina_usable(),
            items: this.obtener_items_por_pagina_usables(),
            busqueda: this.obtener_busqueda_usable(),
            token: this.root.token_de_sesion,
            identificador_de_ajax: "realizar-búsqueda"
          });
          const data = sistema_de_gestion_de_errores.normalizar_respuesta_ajax(response);
          this.registros = data;
          this.esta_cargando_registros = false;
        } catch (error) {
          this.esta_cargando_registros = false;
          sistema_de_gestion_de_errores.gestionar_error(error);
        }
      },
      obtener_filtros_usables() {
        return this.$refs.configurador_de_consulta.filtros.map(filtro => {
          const filtro_final = [filtro.columna, filtro.operador];
          if(["IS NULL", "IS NOT NULL"].indexOf(filtro.operador) !== -1) {

          } else if(["IN", "NOT IN"].indexOf(filtro.operador) !== -1) {
            filtro_final.push(filtro.complemento.split(filtro.separador));
          } else {
            filtro_final.push(filtro.complemento);
          }
          return filtro_final;
        });
      },
      obtener_ordenacion_usable() {
        return this.$refs.configurador_de_consulta.reglas_de_ordenacion.map(regla_de_ordenacion => {
          const regla_final = [regla_de_ordenacion.columna, regla_de_ordenacion.direccion];
          return regla_final;
        });
      },
      obtener_pagina_usable() {
        return this.$refs.configurador_de_consulta.pagina;
      },
      obtener_items_por_pagina_usables() {
        return this.$refs.configurador_de_consulta.items_por_pagina;
      },
      obtener_busqueda_usable() {
        return this.$refs.configurador_de_consulta.busqueda;
      },
      establecer_pagina(pagina) {
        return this.$refs.configurador_de_consulta.pagina = pagina;
      },
      ir_a_pagina_primera() {
        this.establecer_pagina(1);
        return this.realizar_busqueda();
      },
      ir_a_pagina_anterior() {
        const pagina = this.obtener_pagina_usable();
        if(pagina === 1) {
          return;
        }
        this.establecer_pagina(pagina - 1);
        return this.realizar_busqueda();
      },
      ir_a_pagina_siguiente() {
        const pagina = this.obtener_pagina_usable();
        if(this.registros.length === 0) {
          return;
        } else if(this.registros.length < this.obtener_items_por_pagina_usables()) {
          return;
        }
        this.establecer_pagina(pagina + 1);
        return this.realizar_busqueda().then(data => {
          if(this.registros.length === 0) {
            return this.ir_a_pagina_anterior();
          }
          return data;
        });
      },
      ir_a_pagina_ultima() {
        
      },
      ir_a_crear_registro() {
        return this.$router.history.push("/base_de_datos/tabla/" + this.table + "/crear/registro")
      },
      ir_a_actualizar_registro(id_registro) {
        return this.$router.history.push("/base_de_datos/tabla/" + this.table + "/actualizar/registro/" + id_registro);
      },
      alternar_exploracion_de_registro(id_registro) {
        const posicion = this.esta_explorando_registros.indexOf(id_registro);
        if(posicion === -1) {
          this.esta_explorando_registros.push(id_registro);
        } else {
          this.esta_explorando_registros.splice(posicion, 1);
        }
        this.$forceUpdate(true);
      },
      seleccionar_registro(registro) {
        console.log("Seleccionado!", registro);
        this.registro_seleccionado = registro;
        this.inputValue = registro.id;
      }
    }
  };
});