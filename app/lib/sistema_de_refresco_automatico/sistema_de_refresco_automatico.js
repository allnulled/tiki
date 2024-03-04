Sistema_de_modulos.definir("lib/sistema_de_refresco_automatico", [
  "lib/variables_de_entorno",
  "socket.io",
], function (envvars, socket_io, app) {
  if(envvars.NODE_ENV === "test") {
    const serverUrl = 'http://127.0.0.1';
    const serverPort = 3000;
    const socket = socket_io(`${serverUrl}:${serverPort}`);
    socket.on('refrescar', () => {
      console.log('Recibida la señal de refrescar desde el servidor');
      location.reload();
    });
    const payload = async function() {
      try {
        // @TODO: sirve para emplazarte en el punto de desarrollo concreto automáticamente al empezar.
        window.location.href = "#/";
        await new Promise((resolve, reject) => {
          setTimeout(function() {
            document.body.querySelector("#boton_de_entrar").click();
            resolve();
            console.log("Tiempo uno");
          }, 1000 * 0.5);
        });
        await new Promise((resolve, reject) => {
          setTimeout(function() {
            document.body.querySelector("#boton_de_ir_a_base_de_datos").click();
            resolve();
            console.log("Tiempo dos");
          }, 1000 * 0.5);
        });
        await new Promise((resolve, reject) => {
          setTimeout(function() {
            //document.body.querySelector("#boton_de_tabla_de_usuario").click();
            //document.body.querySelector("#boton_de_tabla_de_permiso").click();
            document.body.querySelector("#boton_de_tabla_de_usuario_y_grupo").click();
            resolve();
            console.log("Tiempo tres");
          }, 1000 * 0.5);
        });
        await new Promise((resolve, reject) => {
          setTimeout(function() {
            document.body.querySelector("#boton_de_configurar_busqueda").click();
            resolve();
            console.log("Tiempo cuatro");
          }, 1000 * 0.5);
        });
        await new Promise((resolve, reject) => {
          setTimeout(function() {
            document.body.querySelector("#boton_de_ir_a_crear_instancia").click();
            resolve();
            console.log("Tiempo cinco");
          }, 1000 * 0.5);
        });
      } catch (error) {
        console.log(error);
      }
    };
    payload();
    return socket;
  }
  return false;
});