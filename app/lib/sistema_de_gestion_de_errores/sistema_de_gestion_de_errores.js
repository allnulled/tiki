Sistema_de_modulos.definir("lib/sistema_de_gestion_de_errores", [], function () {
  class SistemaDeGestionDeErrores {
    puerto = undefined;
    constructor() {
      
    }
    gestionar_error(error) {
      console.log(error);
      this.puerto.gestionar_error(error);
    }
    cerrar_error() {
      this.puerto.cerrar_error();
    }
    establecer_puerto(componente) {
      this.puerto = componente;
    }
    normalizar_respuesta_ajax(response) {
      let response_json;
      try {
        response_json = JSON.parse(response.data);
      } catch (error) {
        throw new Error(response);
      }
      try {
        return response_json;
      } catch (error) {
        throw error;
      }
    }
  }
  const Sistema_de_gestion_de_errores = new SistemaDeGestionDeErrores();
  window.Sistema_de_gestion_de_errores = Sistema_de_gestion_de_errores;
  return Sistema_de_gestion_de_errores;
});