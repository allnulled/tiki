// test.js
const assert = require('assert');
const http = require('http');
const { URL } = require('url');

const peticion = function(urlCompleta, datosEnviados) {
  return new Promise((resolve, reject) => {
    const urlParseada = new URL(urlCompleta);

    // Configuración de la solicitud
    const opciones = {
      hostname: urlParseada.hostname,
      port: urlParseada.port || 80,
      path: urlParseada.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Crear el objeto de solicitud
    const solicitud = http.request(opciones, (respuesta) => {
      let datos = '';

      // Recibir datos de la respuesta
      respuesta.on('data', (chunk) => {
        datos += chunk;
      });

      // Manejar el evento 'end' cuando la respuesta está completa
      respuesta.on('end', () => {
        try {
          resolve(JSON.parse(datos));
        } catch (error) {
          resolve(datos);
        }
      });
    });

    // Manejar errores de la solicitud
    solicitud.on('error', (error) => {
      reject(error);
    });

    // Enviar datos en el cuerpo de la solicitud (en este caso, un objeto JSON)
    solicitud.write(JSON.stringify(datosEnviados));

    // Finalizar la solicitud
    solicitud.end();
  });
};

const comprobar_que = function(condicion) {
  assert(condicion);
};

const comprobar_error_de_peticion = function(response) {
  console.log(response);
  if(typeof response === "string") {
    throw response;
  }
  const es_error = Object.keys(response).indexOf("error")  !== -1;
  if(es_error) {
    console.log(response);
    throw response.error;
  }
};

describe('Tiki tests', function () {

  const options = {};
  describe('Sistema de autentificación', async function () {
    it('controlador «registrar_usuario»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "registrar_usuario",
        email: "noadmin@noadmin.com",
        nombre: "noadmin",
        contrasenya: "noadmin"
      });
      comprobar_error_de_peticion(response);
      options.token_confirmacion = response.token_confirmacion;
    });
    it('controlador «confirmar_cuenta»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "confirmar_cuenta",
        email: "noadmin@noadmin.com",
        token_confirmacion: options.token_confirmacion
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «iniciar_sesion»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "iniciar_sesion",
        email: "noadmin@noadmin.com",
        contrasenya: "noadmin"
      });
      comprobar_error_de_peticion(response);
      options.token_sesion = response.token_sesion;
    });
    it('controlador «cerrar_sesion»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "cerrar_sesion",
        token: options.token_sesion
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «olvido_credenciales»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "olvido_credenciales",
        email: "noadmin@noadmin.com"
      });
      comprobar_error_de_peticion(response);
      options.token_recuperacion = response.token_recuperacion;
    });
    it('controlador «recuperar_credenciales»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "recuperar_credenciales",
        email: "noadmin@noadmin.com",
        token: options.token_recuperacion,
        contrasenya: "noadmin1"
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «baja_del_sistema»', async function () {
      const response_login = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "iniciar_sesion",
        email: "noadmin@noadmin.com",
        contrasenya: "noadmin1"
      });
      comprobar_error_de_peticion(response_login);
      options.token_sesion = response_login.token_sesion;
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "baja_del_sistema",
        token: options.token_sesion
      });
      comprobar_error_de_peticion(response);
    });
  });
  describe('Sistema de datos', async function () {
    it('controlador «esquema»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "esquema"
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «insertar»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "insertar",
        tabla: "nota",
        valores: {
          contenido: "Nota de ejemplo para el test"
        }
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «seleccionar» / test 1', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "seleccionar",
        tabla: "nota"
      });
      comprobar_error_de_peticion(response);
      options.id_nota =  response.filter(nota => nota.contenido === "Nota de ejemplo para el test")[0].id;
    });
    it('controlador «actualizar»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "actualizar",
        tabla: "nota",
        id: options.id_nota,
        valores: {
          contenido: "Otro contenido de ejemplo para el test"
        }
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «seleccionar» / test 2', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "seleccionar",
        tabla: "nota"
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «eliminar»', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "eliminar",
        tabla: "nota",
        id: options.id_nota
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «seleccionar» / test 3', async function () {
      const response = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "seleccionar",
        tabla: "nota"
      });
      comprobar_error_de_peticion(response);
    });
    it('controlador «seleccionar» / test 4', async function () {
      const datos = [{ contenido: "1"},{ contenido: "2" }, {contenido: "3" }];
      for(let index=0; index<datos.length; index++) {
        const dato = datos[index];
        const response = await peticion("http://127.0.0.1/tiki/index.php", {
          operacion: "insertar",
          tabla: "nota",
          valores: dato
        });
        comprobar_error_de_peticion(response);
      }
      const response_1 = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "seleccionar",
        tabla: "nota",
        donde: [["contenido", "=", "2"]]
      });
      comprobar_error_de_peticion(response_1);
      assert.ok(Array.isArray(response_1));
      // assert.ok(response_1.length === 1);
      const response_2 = await peticion("http://127.0.0.1/tiki/index.php", {
        operacion: "seleccionar",
        tabla: "nota",
        pagina: "0"
      });
      assert.ok(Array.isArray(response_2));
      const ids = response_2.map(it => it.id);
      for(let index=0; index<ids.length; index++) {
        const id = ids[index];
        const response = await peticion("http://127.0.0.1/tiki/index.php", {
          operacion: "eliminar",
          tabla: "nota",
          id
        });
        comprobar_error_de_peticion(response);
      }
    });
  });
});
