function agruparPorIdioma(data) {
  const idiomas = {}; // Objeto para almacenar los strings agrupados por idioma
  
  // Iterar sobre cada objeto en el arreglo
  data.forEach(objeto => {
    // Iterar sobre cada par clave-valor en el objeto
    Object.entries(objeto).forEach(([iso, valor]) => {
      // Utilizar el valor en español como clave para agrupar los strings
      if (!idiomas[iso]) {
        idiomas[iso] = {};
      }
      idiomas[iso][objeto.es] = valor;
    });
  });

  return idiomas;
}

const traducciones_brutas = require(__dirname + "/traducciones_brutas.json");
const traducciones_netas = agruparPorIdioma(traducciones_brutas);

require("fs").writeFileSync(__dirname + "/traducciones_netas.json", JSON.stringify(traducciones_netas, null, 2), "utf8");