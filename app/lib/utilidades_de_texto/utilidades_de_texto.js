Sistema_de_modulos.definir("lib/utilidades_de_texto", [], function () {
    class UtilidadesDeTexto {
        static encontrar_texto_entre_marcadores(textoBase, listaMarcadores) {
            for (const marcador of listaMarcadores) {
                const inicioIndex = textoBase.indexOf(marcador.inicio);
                if (inicioIndex !== -1) {
                    const finIndex = textoBase.indexOf(marcador.final, inicioIndex + marcador.inicio.length);
                    if (finIndex !== -1) {
                        return textoBase.substring(inicioIndex + marcador.inicio.length, finIndex);
                    }
                }
            }
            return null; // Si no se encuentra ningún texto entre marcadores
        }
        static reemplazar_marcadores(textoBase, listaMarcadores, reemplazo) {
            let textoReemplazado = textoBase;
            for (const marcador of listaMarcadores) {
                const regex = new RegExp(marcador.inicio + "(.*?)" + marcador.final, "g");
                textoReemplazado = textoReemplazado.replace(regex, reemplazo);
            }
            return textoReemplazado;
        }
        static iterar_marcadores(textoBase, listaMarcadores, funcion) {
            for (const marcador of listaMarcadores) {
                const inicioIndex = textoBase.indexOf(marcador.inicio);
                if (inicioIndex !== -1) {
                    const finIndex = textoBase.indexOf(marcador.final, inicioIndex + marcador.inicio.length);
                    if (finIndex !== -1) {
                        const textoMarcado = textoBase.substring(inicioIndex + marcador.inicio.length, finIndex);
                        funcion(textoMarcado);
                    }
                }
            }
        }
        static humanizar_texto(texto, capitalizar = true) {
            let texto2 = texto.replace(/_|-/g, " ");
            if (capitalizar) {
                texto2 = texto2.substr(0, 1).toUpperCase() + texto2.substr(1);
            }
            return texto2;
        }
        static espaciar_por_delante(texto, longitud, relleno = "0") {
            let nuevo_texto = "" + texto;
            while (nuevo_texto.length < longitud) {
                nuevo_texto = relleno + nuevo_texto;
            }
            return nuevo_texto;
        }
    }
    return UtilidadesDeTexto;
});