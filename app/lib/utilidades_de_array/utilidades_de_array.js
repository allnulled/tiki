Sistema_de_modulos.definir("lib/utilidades_de_array", [], function () {
  class UtilidadesDeArray {
    static encontrar_coincidencia(array1, array2) {
      for (let i = 0; i < array1.length; i++) {
        let item = array1[i];
        if (array2.includes(item)) {
          return item;
        }
      }
      return false;
    }
  }
  return UtilidadesDeArray;
});